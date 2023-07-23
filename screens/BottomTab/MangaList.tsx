import MangaListAppbar from '@components/Common/Header/MangaListAppbar'
import Duplicate from '@components/Core/Duplicate'
import MangaFilter from '@components/Manga/Filters'
import MangaColumn1Thumbnail from '@components/Manga/Thumbnails/Column-1'
import { MangaRow1Skeleton } from '@components/Manga/Thumbnails/Row-1'
import { useMangadexConfig } from '@contexts/ConfigurationContext'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import useMangas from '@hooks/api/manga'
import cleanObject from '@utils/cleanObject'
import { useRef } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { FlatList } from 'react-native'
import { Text } from 'react-native-paper'

export default function MangaList() {
  const config = useMangadexConfig()
  const form = useForm<IMangaRequest>({
    defaultValues: {
      excludedTags: config.excludedTags,
      includedTags: config.includedTags,
      availableTranslatedLanguage: config.translatedLanguage,
      contentRating: config.contentRating
      // This throws a 400 error. but it should work
      // originalLanguage: config.originalLanguage
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
    fetchNextPage,
    error
  } = useMangas({
    variables,
    flags: { includeStats: true }
  })
  const { hasNextPage } = pageInfo

  const ref = useRef<BottomSheetModalMethods>(null)
  const handleOpen = () => {
    ref.current?.present()
  }

  return (
    <FormProvider {...form}>
      <MangaListAppbar
        title="Manga"
        setText={text => form.setValue('title', text)}
        onFilter={handleOpen}
      />
      <FlatList
        data={mangas}
        renderItem={({ item }) =>
          item ? <MangaColumn1Thumbnail {...item} /> : null
        }
        refreshing={isRefetching}
        onRefresh={refetch}
        keyExtractor={item => item?.id ?? ''}
        onEndReachedThreshold={0.8}
        ListEmptyComponent={
          error ? (
            <Text>{(error as Error)?.message || 'unknown error'}</Text>
          ) : null
        }
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
      <MangaFilter modalRef={ref} />
    </FormProvider>
  )
}
