import { queryFn } from '@api/manga'
import { CDN } from '@constants/api'
import { QualityEnum } from '@interfaces/enum'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { flatten, } from 'lodash'
import { AspectRatio, FlatList, View } from 'native-base'
import { Dispatch, useEffect, useState, useMemo } from 'react'
import { Dimensions, Image, SafeAreaView } from 'react-native'

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
        const ratio = width / height
        setRatio(ratio)
        if (ratio < windowRatio) setIsHorizontal(false)
      })
    }
    fetchImageDimensions()
  }, [setIsHorizontal])

  if (!ratio) return null

  if (horizontal)
    return (
      <View
        height="100%"
        width={window.width}
        display="flex"
        alignItems="center"
        justifyContent="center"
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

export default function Gallery({
  route,
  navigation
}: IRootStackScreenProps<'Gallery'>) {
  const { quality, chapterId, mangaId } = route.params
  const [isHorizontal, setIsHorizontal] = useState(true)
  const { data } = useQuery<{}, {}, string[]>(
    [chapterId, quality ?? QualityEnum.DATA_SAVER],
    async ({ queryKey }) => {
      const [chapterId, quality] = queryKey
      const res = await axios.get(`${CDN}/${chapterId}`)

      const { baseUrl, chapter } = res.data
      const { hash } = chapter

      return chapter?.[quality === 'data' ? 'data' : 'dataSaver'].map(
        (filename: string) => `${baseUrl}/${quality}/${hash}/${filename}`
      )
    }
  )

  const { data: chapters } = useQuery<[string, { groups: string[] }], {}, { result: Response.Result, volumes: Record<string, { volume: string, count: number, chapters: { chapter: string, id: string, others: string[], count: number }[] }> }>(
    [`/manga/${mangaId}/aggregate`, { groups: [] }],
    queryFn
  )
  const { nextChapter, previousChapter } = useMemo(() => {
    if (!chapters) return {}

    const flattenedVolumes = Object.values(chapters.volumes)
    const chapterListVolumeList = flattenedVolumes.map(({ chapters }) => chapters).map(e => Object.values(e))
    const flattenedChapters = flatten(chapterListVolumeList)

    const currentIndex = flattenedChapters?.findIndex(({ id }) => id === chapterId) ?? -1;
    const previousChapter = currentIndex > 0 ? flattenedChapters?.[currentIndex - 1] : null
    const nextChapter = currentIndex < (flattenedChapters?.length ?? 0) - 1 ? flattenedChapters?.[currentIndex + 1] : null
    return { nextChapter, previousChapter }
  }, [chapters])



  return (
    <SafeAreaView>
      <FlatList
        data={data}
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
        onRefresh={() => { if (previousChapter) navigation.replace('Gallery', { chapterId: previousChapter.id ?? previousChapter.others?.[0], mangaId: mangaId }); else navigation.goBack() }
        }
        onEndReached={() => {
          if (nextChapter) navigation.replace('Gallery', { chapterId: nextChapter.id ?? nextChapter.others?.[0], mangaId: mangaId })
          else navigation.goBack()
        }}
        horizontal={isHorizontal}
        showsHorizontalScrollIndicator
      />
    </SafeAreaView>
  )
}
