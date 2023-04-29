import MangaHeader from '@components/Chapter/MangaHeader'
import Thumbnail, { ThumbnailSkeleton } from '@components/Chapter/Thumbnail'
import Duplicate from '@components/Core/Duplicate'
import { MANGA_FEED } from '@constants/api/routes'
import { useInfiniteQuery } from '@tanstack/react-query'
import getFlattenedList from '@utils/getFlattenedList'
import { getNextPageParam, queryFn } from 'api'
import { groupBy } from 'lodash'
import { SectionList, View } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { Surface, Text } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function ChapterList({
  route
}: IRootStackScreenProps<'Chapter List'>) {
  const { id: mangaId } = route.params
  const { bottom } = useSafeAreaInsets()
  const { data, isRefetching, isLoading, refetch, fetchNextPage } =
    useInfiniteQuery<
      QueryKey<Chapter.Request>,
      Response.ErrorResponse,
      Chapter.ListResponse
    >(
      [
        MANGA_FEED(mangaId),
        {
          limit: 10,
          translatedLanguage: ['en'],
          order: {
            volume: 'desc',
            chapter: 'desc'
          },
          includes: ['scanlation_group', 'user']
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
        title: key === 'null' ? null : key,
        data: groupedByVolume?.[key]
      }
    })
    .sort((a, b) => {
      const numA = Number(a.title ?? 9999)
      const numB = Number(b.title ?? 9999)
      if (numA < numB) return 1
      if (numA > numB) return -1
      return 0
    })

  return (
    <SectionList
      sections={sections ?? []}
      style={{
        marginBottom: bottom
      }}
      ListHeaderComponent={<MangaHeader />}
      renderSectionHeader={({ section: { title } }) => (
        <Surface
          style={{
            padding: 4,
            marginBottom: 8
          }}
        >
          <Text variant="headlineSmall" style={{ textAlign: 'center' }}>
            Volume {title ?? 'None'}
          </Text>
        </Surface>
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
