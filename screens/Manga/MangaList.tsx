import Duplicate from '@components/Core/Duplicate'
import { MangaRow1Skeleton } from '@components/Manga/Thumbnails/Row-1'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { FlatList } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import useMangas from '@hooks/api/manga'
import { useMangadexConfig } from '@contexts/ConfigurationContext'
import cleanObject from '@utils/cleanObject'
import MangaColumn1Thumbnail from '@components/Manga/Thumbnails/Column-1'
import MangaListAppbar from '@components/Common/Header/MangaListAppbar'
import MangaFilter from '@components/Manga/Filters'
import { useRef } from 'react'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'

export default function MangaList() {
  const config = useMangadexConfig()
  const form = useForm<IMangaRequest>({
    defaultValues: {
      excludedTags: config.excludedTags,
      includedTags: config.includedTags,
      availableTranslatedLanguage: config.translatedLanguage
      // contentRating: config.contentRating
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
    fetchNextPage
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
      <MangaFilter modalRef={ref} />
    </FormProvider>
  )
}
