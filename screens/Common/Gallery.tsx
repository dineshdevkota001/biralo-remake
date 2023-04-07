import { queryFn } from '@api/manga'
import { CDN } from '@constants/api'
import { QualityEnum } from '@interfaces/enum'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { flatten } from 'lodash'
import { AspectRatio, FlatList, View, Icon, Row, Pressable } from 'native-base'
import { Dispatch, useEffect, useState, useMemo } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const window = Dimensions.get('window')
const windowRatio = window.width / window.height

function Page({
  url,
  index,
  setIsHorizontal,
  horizontal
}: {
  url: string
  index: number
  setIsHorizontal: Dispatch<boolean>
  horizontal?: boolean
}) {
  const [ratio, setRatio] = useState<number>(windowRatio)

  useEffect(() => {
    const fetchImageDimensions = async () => {
      await Image.prefetch(url)
      await Image.getSize(url, (width, height) => {
        const r = width / height
        setRatio(r)
        if (r < windowRatio) setIsHorizontal(false)
      })
    }
    fetchImageDimensions()
  }, [setIsHorizontal, url])

  if (!ratio)
    return (
      <View display="flex" alignItems="center" justifyContent="center">
        <ActivityIndicator />
      </View>
    )

  // need a pan gesture handler
  // next next and previous page handler. though we can try and use a different kind of image for that.

  if (horizontal)
    return (
      <View
        height="100%"
        width={window.width}
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <Image
          source={{ uri: url, ...window }}
          resizeMode="contain"
          alt={`Image ${index}`}
        />
      </View>
    )

  return (
    <AspectRatio ratio={ratio}>
      <Image
        source={{ uri: url }}
        resizeMode="contain"
        alt={`Image ${index}`}
      />
    </AspectRatio>
  )
}

function Menu() {
  const { bottom } = useSafeAreaInsets()
  const navigation = useNavigation()
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => setShowMenu(prev => !prev)

  if (!showMenu)
    return (
      <Pressable
        top="37.5%"
        left="35%"
        height="25%"
        width="30%"
        position="absolute"
        opacity={0}
        onPress={toggleMenu}
      />
    )

  return (
    <>
      <Pressable
        position="absolute"
        height="100%"
        width="100%"
        backgroundColor="black"
        opacity={70}
        onPress={toggleMenu}
      />
      <Row
        paddingBottom={bottom + 16}
        position="absolute"
        bottom={0}
        backgroundColor="black"
        width="100%"
        justifyContent="space-around"
      >
        <Icon as={Feather} margin={3} name="menu" size={6} />
        <Icon
          as={Feather}
          margin={3}
          name="x"
          onPress={() => navigation.goBack()}
          size={6}
        />
      </Row>
    </>
  )
}

export default function Gallery({
  route,
  navigation
}: IRootStackScreenProps<'Gallery'>) {
  const { quality, chapterId, mangaId } = route.params
  const [isHorizontal, setIsHorizontal] = useState(true)

  const { data } = useQuery<unknown, unknown, string[]>(
    [chapterId, quality ?? QualityEnum.DATA_SAVER],
    async () => {
      const res = await axios.get(`${CDN}/${chapterId}`)

      const { baseUrl, chapter } = res.data
      const { hash } = chapter

      return chapter?.[quality === 'data' ? 'data' : 'dataSaver'].map(
        (filename: string) => `${baseUrl}/${quality}/${hash}/${filename}`
      )
    }
  )

  const { data: chapters } = useQuery<
    [string, { groups: string[] }],
    unknown,
    {
      result: Response.Result
      volumes: Record<
        string,
        {
          volume: string
          count: number
          chapters: {
            chapter: string
            id: string
            others: string[]
            count: number
          }[]
        }
      >
    }
  >([`/manga/${mangaId}/aggregate`, { groups: [] }], queryFn)

  const { nextChapter, previousChapter } = useMemo(() => {
    if (!chapters) return {}

    const flattenedVolumes = Object.values(chapters.volumes)
    const chapterListVolumeList = flattenedVolumes
      .map(({ chapters: chapterInVolume }) => chapterInVolume)
      .map(e => Object.values(e))
    const flattenedChapters = flatten(chapterListVolumeList)

    const currentIndex =
      flattenedChapters?.findIndex(({ id }) => id === chapterId) ?? -1
    const prev = currentIndex > 0 ? flattenedChapters?.[currentIndex - 1] : null
    const next =
      currentIndex < (flattenedChapters?.length ?? 0) - 1
        ? flattenedChapters?.[currentIndex + 1]
        : null
    return { nextChapter: next, previousChapter: prev }
  }, [chapters, chapterId])

  return (
    <SafeAreaView style={{ position: 'relative' }}>
      <FlatList
        data={
          data ?? ['https://picsum.photos/200', 'https://picsum.photos/200']
        }
        pagingEnabled={isHorizontal}
        renderItem={({ item: url, index }) => (
          <Page
            url={url}
            index={index}
            setIsHorizontal={setIsHorizontal}
            horizontal={isHorizontal}
          />
        )}
        refreshing={false}
        onRefresh={() => {
          if (previousChapter)
            navigation.replace('Gallery', {
              chapterId: previousChapter.id ?? previousChapter.others?.[0],
              mangaId
            })
          else navigation.goBack()
        }}
        onEndReached={() => {
          if (nextChapter)
            navigation.replace('Gallery', {
              chapterId: nextChapter.id ?? nextChapter.others?.[0],
              mangaId
            })
          else navigation.goBack()
        }}
        horizontal={isHorizontal}
        showsHorizontalScrollIndicator
      />
      <Menu />
    </SafeAreaView>
  )
}
