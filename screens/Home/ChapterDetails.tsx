import { useInfiniteQuery } from '@tanstack/react-query'
import { Heading, View } from 'native-base'
import { SectionList } from 'react-native'
import { queryFn, getNextPageParam } from 'api'
import { MANGA_FEED } from '@constants/api/routes'
import { RefreshControl } from 'react-native-gesture-handler'
import getFlattenedList from '@utils/getFlattenedList'
import Thumbnail, { ThumbnailSkeleton } from '@components/Chapter/Thumbnail'
import MangaHeader from '@components/Chapter/MangaHeader'
import Duplicate from '@components/Core/Duplicate'
import { groupBy } from 'lodash'

export default function ChapterList({
  route
}: IRootStackScreenProps<'Chapter List'>) {
  const { id: mangaId } = route.params
  const { data, isRefetching, isLoading, refetch, fetchNextPage } =
    useInfiniteQuery<QueryKey<Chapter.Request>, IError, Chapter.ListResponse>(
      [
        MANGA_FEED(mangaId),
        {
          limit: 10,
          translatedLanguage: ['en'],
          order: {
            volume: 'desc',
            chapter: 'desc'
          }
        } as Chapter.Request
      ],
      queryFn,
      {
        getNextPageParam
      }
    )

  const chapters = getFlattenedList(data)
  const noOfChapters = chapters?.length
  const totalChapters = data?.pages?.[0]?.total

  const groupedByVolume = groupBy(chapters, 'attributes.volume')
  const sections = Object.keys(groupedByVolume)
    ?.map(key => {
      return {
        title: key,
        data: groupedByVolume?.[key]
      }
    })
    .sort((a, b) => {
      if ((Number(a.title) ?? 0) < (Number(b.title) ?? 0)) return 1
      if ((Number(a.title) ?? 0) > (Number(b.title) ?? 0)) return -1
      return 0
    })

  return (
    <SectionList
      sections={sections ?? []}
      ListHeaderComponent={<MangaHeader />}
      renderSectionHeader={({ section: { title } }) => (
        <View padding={1} backgroundColor="white" marginBottom={2}>
          <Heading width="100%" textAlign="center">
            Volume {title ?? 'None'}
          </Heading>
        </View>
      )}
      renderItem={({ item }) => <Thumbnail {...item} />}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
      keyExtractor={item => item.id}
      onEndReachedThreshold={0.8}
      ListFooterComponent={
        (totalChapters && noOfChapters && noOfChapters < totalChapters) ||
        isLoading ? (
          <Duplicate Component={ThumbnailSkeleton} times={4} />
        ) : null
      }
      onEndReached={() => {
        if (totalChapters && chapters.length < totalChapters) fetchNextPage()
      }}
    />
  )
}
