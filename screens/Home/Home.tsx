import Duplicate from '@components/Core/Duplicate'
import MangaFilter from '@components/Home/Filters'
import Thumbnail, {
  ThumbnailSkeleton
} from '@components/Home/ThumbnailRowStyle'
import { MANGA } from '@constants/api/routes'
import useVariables, { useVariable } from '@contexts/VariableContext'
import { useInfiniteQuery } from '@tanstack/react-query'
import getFlattenedList from '@utils/getFlattenedList'
import { getNextPageParam, queryFn } from 'api'
import { identity, pickBy } from 'lodash'
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch
} from 'react-hook-form'
import { FlatList } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const form = useForm<Manga.Request>({
    defaultValues: {}
  })
  const variables = pickBy<Manga.Request>(
    useWatch({ control: form.control }),
    identity
  )

  const { data, isLoading, isRefetching, refetch, fetchNextPage } =
    useInfiniteQuery<
      [string, Manga.Request],
      Response.ErrorResponse,
      Manga.ListResponse
    >([MANGA, { limit: 10, includes: ['cover_art'], ...variables }], queryFn, {
      getNextPageParam
    })

  const mangas = getFlattenedList(data)
  const noOfMangas = mangas?.length
  const total = data?.pages?.[0]?.total
  const hasMore = noOfMangas < (total ?? 0)

  return (
    <FormProvider {...form}>
      <SafeAreaView edges={['top']}>
        <FlatList
          data={mangas}
          renderItem={props => (props.item ? <Thumbnail {...props} /> : null)}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          keyExtractor={item => item?.id}
          onEndReachedThreshold={0.8}
          ListFooterComponent={
            hasMore || isLoading ? (
              <Duplicate Component={ThumbnailSkeleton} />
            ) : null
          }
          stickyHeaderIndices={[0]}
          ListHeaderComponent={<MangaFilter />}
          onEndReached={() => (hasMore ? fetchNextPage : null)}
        />
      </SafeAreaView>
    </FormProvider>
  )
}
