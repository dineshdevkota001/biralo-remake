import Duplicate from '@components/Core/Duplicate'
import Thumbnail, {
  ThumbnailSkeleton
} from '@components/Home/ThumbnailRowStyle'
import { FlatList } from 'react-native'
import { Text } from 'react-native-paper'
import { useLatestChapters } from '@hooks/api/chapter'

export default function RecentChapters() {
  const {
    data: mangas,
    isLoading,
    fetchNextPage,
    pageInfo
  } = useLatestChapters()

  return (
    <FlatList
      data={mangas}
      renderItem={props =>
        props.item ? (
          <Thumbnail {...props} item={props.item}>
            <Text
              style={{
                padding: 4
              }}
            >
              {props.item.chapters.length}
            </Text>
          </Thumbnail>
        ) : null
      }
      keyExtractor={item => `${item?.id}${item?.chapters?.[0]?.id}` ?? ''}
      onEndReachedThreshold={0.8}
      ListFooterComponent={
        pageInfo?.hasNextPage || isLoading ? (
          <Duplicate Component={ThumbnailSkeleton} />
        ) : null
      }
      onEndReached={() => fetchNextPage()}
    />
  )
}
