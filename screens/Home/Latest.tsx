// import Thumbnail, { ThumbnailSkeleton } from "@components/Chapter/Thumbnail";
import latestChapters from '@api/chapters'
import Duplicate from '@components/Core/Duplicate'
import Thumbnail, {
  ThumbnailSkeleton
} from '@components/Home/ThumbnailRowStyle'
import { CHAPTER } from '@constants/api/routes'
import { useInfiniteQuery } from '@tanstack/react-query'
import getFlattenedList from '@utils/getFlattenedList'
import { getNextPageParam } from 'api'
import { FlatList } from 'react-native'
import { Text } from 'react-native-paper'

export default function RecentChapters() {
  const { data, isLoading, fetchNextPage } = useInfiniteQuery(
    [CHAPTER, { limit: 50, order: { readableAt: 'desc' } }],
    latestChapters,
    {
      getNextPageParam
    }
  )

  const mangas = getFlattenedList(data)
  const noOfMangas = mangas?.length
  const total = data?.pages?.[0]?.total

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
        (noOfMangas && total && noOfMangas < total) || isLoading ? (
          <Duplicate Component={ThumbnailSkeleton} />
        ) : null
      }
      onEndReached={() => fetchNextPage()}
    />
  )
}
