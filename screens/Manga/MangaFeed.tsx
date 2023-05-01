import MangaHeader from '@components/Chapter/MangaHeader'
import ChapterType1Thumbnail, {
  ChapterType1Skeleton
} from '@components/Chapter/Thumbnail/Type-1'
import Duplicate from '@components/Core/Duplicate'
import { groupBy } from 'lodash'
import { SectionList } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { Surface, Text } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useMangaFeed from '@hooks/api/manga/<id>/feed'

export default function ChapterList({
  route
}: IRootStackScreenProps<'Chapter List'>) {
  const { id } = route.params
  const { bottom } = useSafeAreaInsets()
  const { data, isRefetching, isLoading, refetch, fetchNextPage, pageInfo } =
    useMangaFeed({ id })
  const { hasNextPage } = pageInfo

  const groupedByVolume = groupBy(data, 'attributes.volume')
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
      renderItem={({ item }) =>
        item ? <ChapterType1Thumbnail {...item} /> : null
      }
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
      keyExtractor={item => item?.id ?? ''}
      onEndReachedThreshold={0.8}
      ListFooterComponent={
        hasNextPage || isLoading ? (
          <Duplicate Component={ChapterType1Skeleton} />
        ) : null
      }
      onEndReached={() => {
        if (hasNextPage) fetchNextPage()
      }}
    />
  )
}