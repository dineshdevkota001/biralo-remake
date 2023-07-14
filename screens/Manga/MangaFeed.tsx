import MangaHeader from '@components/Chapter/MangaHeader'
import ChapterType1Thumbnail, {
  ChapterType1Skeleton
} from '@components/Chapter/Thumbnail/Type-1'
import Duplicate from '@components/Core/Duplicate'
import { groupBy } from 'lodash'
import { SectionList, StyleSheet } from 'react-native'
import { Surface, Text } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useMangaFeed from '@hooks/api/manga/<id>/feed'
import { useMangadexConfig } from '@contexts/ConfigurationContext'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import cleanObject from '@utils/cleanObject'
import spacing from '@utils/theme/spacing'

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  root: {
    padding: spacing(1),
    marginBottom: spacing(2)
  }
})

export default function ChapterList({
  route
}: IRootStackScreenProps<'Chapter List'>) {
  const config = useMangadexConfig()
  const form = useForm<IChapterRequest>({
    defaultValues: { translatedLanguage: config?.translatedLanguage }
  })
  // NOTICE: I hate this. get something better
  const variables = cleanObject(useWatch({ control: form.control }))

  const { id } = route.params
  const { bottom } = useSafeAreaInsets()
  const {
    data: { items, pageInfo },
    isRefetching,
    isLoading,
    refetch,
    fetchNextPage
  } = useMangaFeed({
    id,
    variables,
    flags: { includeStats: true }
  })
  const { hasNextPage } = pageInfo

  const groupedByVolume = groupBy(items, 'attributes.volume')
  const sections = Object.keys(groupedByVolume)?.map(key => ({
    volume: key,
    data: groupedByVolume?.[key]
  }))

  return (
    <FormProvider {...form}>
      <SectionList
        sections={sections ?? []}
        style={{
          marginBottom: bottom
        }}
        ListHeaderComponent={<MangaHeader />}
        renderSectionHeader={({ section: { volume } }) => (
          <Surface style={styles.root}>
            <Text variant="headlineSmall" style={{ textAlign: 'center' }}>
              Volume {volume}
            </Text>
          </Surface>
        )}
        renderItem={({ item: chapter }) =>
          chapter ? <ChapterType1Thumbnail {...chapter} /> : null
        }
        refreshing={isRefetching}
        onRefresh={refetch}
        keyExtractor={chapter => chapter?.id ?? ''}
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
    </FormProvider>
  )
}
