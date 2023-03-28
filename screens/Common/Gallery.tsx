import { CDN } from '@constants/api'
import { QualityEnum } from '@interfaces/enum'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { AspectRatio, Container, FlatList, Image } from 'native-base'
import { Dimensions } from 'react-native'

export default function Gallery({ route }: IRootStackScreenProps<'Gallery'>) {
  const { quality, chapterId } = route.params
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

  return (
    <FlatList
      data={data}
      renderItem={({ item: url, index }) => (
        <AspectRatio
          ratio={
            Dimensions.get('window').width / Dimensions.get('window').height
          }
          width={Dimensions.get('window').width}
          height="100%"
        >
          <Image
            source={{ uri: url }}
            resizeMode="cover"
            alt={`Page ${index + 1}`}
          />
        </AspectRatio>
      )}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  )
}
