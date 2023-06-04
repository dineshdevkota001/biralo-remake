import Duplicate from '@components/Core/Duplicate'
import MangaFilter from '@components/Manga/Filters'
import MangaRow1Thumbnail, {
  MangaRow1Skeleton
} from '@components/Manga/Thumbnails/Row-1'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { FlatList } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import useManga from '@hooks/api/manga'
import ThumbnailTags from '@components/Manga/Thumbnails/Tags'
import useConfiguration from '@contexts/ConfigurationContext'
import cleanObject from '@utils/cleanObject'

export default function MangaList() {
  const { config } = useConfiguration()
  const form = useForm<IMangaRequest>({
    defaultValues: {
      excludedTags: config.excludedTags,
      includedTags: config.includedTags,
      availableTranslatedLanguage: config.translatedLanguage,
      // contentRating: config.contentRating
      originalLanguage: config.originalLanguage
    }
  })
  const variables = cleanObject<IMangaRequest>(
    useWatch({ control: form.control })
  )

  const {
    data: mangas,
    pageInfo,
    isLoading,
    isRefetching,
    refetch,
    fetchNextPage
  } = useManga({
    variables,
    flags: { includeStats: true }
  })
  const { hasNextPage } = pageInfo

  return (
    <FormProvider {...form}>
      <SafeAreaView edges={['top']}>
        <MangaFilter />
        <FlatList
          data={mangas}
          renderItem={({ item }) =>
            item ? (
              <MangaRow1Thumbnail {...item}>
                <ThumbnailTags {...item} />
              </MangaRow1Thumbnail>
            ) : null
          }
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          keyExtractor={item => item?.id ?? ''}
          onEndReachedThreshold={0.8}
          ListFooterComponent={
            hasNextPage || isLoading ? (
              <Duplicate
                Component={MangaRow1Skeleton}
                times={isLoading ? 6 : undefined}
              />
            ) : null
          }
          onEndReached={() => (hasNextPage ? fetchNextPage() : null)}
        />
      </SafeAreaView>
    </FormProvider>
  )
}
