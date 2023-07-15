import Duplicate from '@components/Core/Duplicate'
import MangaFilter from '@components/Manga/Filters'
import { MangaRow1Skeleton } from '@components/Manga/Thumbnails/Row-1'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { FlatList } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import useMangas from '@hooks/api/manga'
import { useMangadexConfig } from '@contexts/ConfigurationContext'
import cleanObject from '@utils/cleanObject'
import MangaColumn1Thumbnail from '@components/Manga/Thumbnails/Column-1'

export default function MangaList() {
  const config = useMangadexConfig()
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
    data: { items: mangas, pageInfo },
    isLoading,
    isRefetching,
    refetch,
    fetchNextPage
  } = useMangas({
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
            item ? <MangaColumn1Thumbnail {...item} /> : null
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
