import { generalNextPageParam } from '@api/common'
import { MANGA_FEED } from '@constants/api/routes'
import useConfiguration from '@contexts/ConfigurationContext'
import { OrderEnum, TypeEnum } from '@interfaces/enum'
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query'
import axios from '@utils/axios'
import getFlattenedList from '@utils/getFlattenedList'

export async function mangaFeed({
  queryKey,
  pageParam
}: QueryFunctionContext<[string, IChapterRequest]>) {
  try {
    const [location, params] = queryKey as [string, any]
    const res = await axios.get<IChapterCollection>(location as string, {
      params: {
        offset: pageParam ?? 0,
        ...(params ?? {})
      }
    })

    return res.data
  } catch (e) {
    console.log('Manga Chapter list', (e as Error)?.message)
  }
  return null
}

export default function useMangaFeed({
  id,
  variables
}: {
  id: string
  variables?: IChapterRequest
}) {
  const { config } = useConfiguration()
  const queryRes = useInfiniteQuery(
    [
      MANGA_FEED(id),
      {
        ...variables,
        limit: 3 * config.pageSize,
        translatedLanguage: ['en'],
        order: {
          volume: OrderEnum.DESC,
          chapter: OrderEnum.DESC
        },
        includes: [TypeEnum.SCANLATION_GROUP, TypeEnum.USER]
      }
    ],
    mangaFeed,
    {
      getNextPageParam: generalNextPageParam
    }
  )

  const data = getFlattenedList(queryRes?.data)
  const noOfPages = queryRes?.data?.pages?.length
  const lastPage = queryRes?.data?.pages?.[(noOfPages ?? 1) - 1]
  const pageInfo = {
    limit: lastPage?.limit,
    offset: lastPage?.offset,
    total: lastPage?.total,
    hasNextPage:
      data?.length && lastPage?.total && data?.length < lastPage?.total
  }

  return { ...queryRes, data, pageInfo }
}
