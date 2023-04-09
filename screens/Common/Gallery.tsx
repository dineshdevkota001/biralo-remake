import { queryFn } from '@api/manga'
import { CDN } from '@constants/api'
import { Feather } from '@expo/vector-icons'
import { QualityEnum } from '@interfaces/enum'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { flatten } from 'lodash'
import { AspectRatio, FlatList, Heading, Icon, Pressable, Row, View } from 'native-base'
import { Dispatch, useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import useBottomSheetModal, { useDynamicModal } from '@hooks/useBottomSheet'

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
  const [props, { handleOpen }] = useBottomSheetModal()
  const [dynamicProps, childrenProps] = useDynamicModal({ snapPoints: [bottom + 5, "CONTENT_HEIGHT"] })
  const [isExtraMenuOpen, setIsExtraMenuOpen] = useState(false)

  return <>
    <Pressable
      top="37.5%"
      left="35%"
      height="25%"
      width="30%"
      position="absolute"
      opacity={0}
      onPress={handleOpen}
    />
    <BottomSheetModal
      {...props}
      {...dynamicProps}
      index={1}
    >
      <Row
        justifyContent="space-around"
        flexWrap="wrap"
        {...childrenProps}
      >
        <Icon as={Feather} margin={3} name="more-vertical" size={6} onPress={() => { setIsExtraMenuOpen(p => !p) }} />
        <Icon as={Feather} margin={3} name="maximize" size={6} />
        <Icon as={Feather} margin={3} name="minimize-2" size={6} />
        <Icon as={Feather} margin={3} name="minimize" size={6} />
        <Icon
          as={Feather}
          margin={3}
          name="x"
          onPress={() => navigation.goBack()}
          size={6}
        />
        {isExtraMenuOpen ? <Row minWidth="90%" flex={1}>
          <Icon as={Feather} margin={3} name="minimize" size={6} />
          <Icon as={Feather} margin={3} name="minimize-2" size={6} />
          <Icon as={Feather} margin={3} name="maximize" size={6} />
        </Row> : null}
      </Row>
    </BottomSheetModal>
  </>
}


type IChapter = {
  chapter: string
  id: string
  others: string[]
  count: number
}
type IVolume = {
  volume: string
  count: number
  chapters: IChapter[]
}

export default function Gallery({
  route,
  navigation
}: IRootStackScreenProps<'Gallery'>) {
  const { quality = QualityEnum.DATA_SAVER, chapterId, mangaId } = route.params
  const [isHorizontal, setIsHorizontal] = useState(true)

  const { data } = useQuery<unknown, unknown, string[]>(
    [chapterId, quality],
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
        IVolume
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

  const loadChapter = (chapter?: IChapter | null, nullCallback = navigation.goBack) => () => {
    if (chapter)
      navigation.replace('Gallery', {
        chapterId: chapter.id ?? chapter.others?.[0],
        mangaId
      })
    else nullCallback()
  }

  return (
    <SafeAreaView style={{ position: 'relative' }}>
      <FlatList
        data={
          data ?? ['https://picsum.photos/200', 'https://picsum.photos/200']
        }
        pagingEnabled={isHorizontal}
        initialScrollIndex={1}
        getItemLayout={
          (_, index) => ({ length: window.height, offset: window.width * index, index })
        }
        ListHeaderComponent={
          <View height={window.height / 2} width={window.width} backgroundColor="black" display="flex" alignItems="center" justifyContent="center">
            <Pressable onPress={loadChapter(previousChapter)} display="flex" alignItems="center" justifyContent="center">
              <Icon as={Feather} color="white" name="arrow-left-circle" size="2xl" mb={2} />
              <Heading size="lg" color="white">Previous Chapter</Heading>
            </Pressable>
          </View>
        }
        ListFooterComponent={
          <View height={window.height / 2} width={window.width} backgroundColor="black" display="flex" alignItems="center" justifyContent="center">
            <Pressable onPress={loadChapter(nextChapter)} display="flex" alignItems="center" justifyContent="center">
              <Icon as={Feather} color="white" name="arrow-right-circle" size="2xl" mb={2} />
              <Heading size="lg" color="white">Next Chapter</Heading>
            </Pressable>
          </View>
        }
        renderItem={({ item: url, index }) => (
          <Page
            url={url}
            index={index}
            setIsHorizontal={setIsHorizontal}
            horizontal={isHorizontal}
          />
        )}

        horizontal={isHorizontal}
        showsHorizontalScrollIndicator
      />
      <Menu />
    </SafeAreaView>
  )
}
