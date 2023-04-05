import { useInfiniteQuery } from '@tanstack/react-query'
import {
  FlatList
} from 'native-base'
import { queryFn, getNextPageParam } from 'api'
import { MANGA_FEED } from '@constants/api/routes'
import { RefreshControl } from 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native'
import getFlattenedList from '@utils/getFlattenedList'
import Thumbnail from '@components/Chapter/Thumbnail'
import MangaHeader from '@components/Chapter/MangaHeader'

export default function ChapterList({
  route
}: IRootStackScreenProps<'Chapter List'>) {
  const { id: mangaId, } = route.params
  const { data, isRefetching, isFetchingNextPage, refetch, fetchNextPage } =
    useInfiniteQuery<QueryKey<Chapter.Request>, IError, Chapter.ListResponse>(
      [MANGA_FEED(mangaId), { limit: 10 }],
      queryFn,
      {
        getNextPageParam
      }
    )

  const chapters = getFlattenedList(data)
  const totalChapters = data?.pages?.[0]?.total

  return (
    <FlatList
      data={chapters}
      ListHeaderComponent={
        <MangaHeader />
      }
      renderItem={({ item }) => (
        <Thumbnail {...item} />
      )}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
      keyExtractor={item => item.id}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      onEndReached={() => {
        if (totalChapters && chapters.length < totalChapters) fetchNextPage()
      }}
    />
  )
}
