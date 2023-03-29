import { queryFn } from '@api/manga'
import { CDN } from '@constants/api'
import { QualityEnum } from '@interfaces/enum'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { AspectRatio, Container, FlatList } from 'native-base'
import { Dispatch, useEffect, useState } from 'react'
import { Dimensions, Image } from 'react-native'

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
      <Container height="100%" width={window.width}>
        <AspectRatio ratio={windowRatio} height="100%" width="100%">
          <Image
            source={{ uri: url }}
            resizeMode="contain"
            alt={`Image ${index}`}
          />
        </AspectRatio>
      </Container>
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
  const { quality, chapterId } = route.params
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

  const { data: chapter } = useQuery<{}, {}, IChapter>(
    [`/chapter/${chapterId}`],
    queryFn
  )

  return (
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
      // onRefresh={() => {
      //   console.log('unfiring')
      //   if (prev) navigation.replace('Gallery', { chapterId: prev })
      // }}
      // onEndReached={() => {
      //   console.log('firing')
      //   if (next) navigation.replace('Gallery', { chapterId: prev })
      // }}
      ItemSeparatorComponent={null}
      horizontal={isHorizontal}
      showsHorizontalScrollIndicator={false}
    />
  )
}
