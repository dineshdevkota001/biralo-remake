import { generalNextPageParam } from '@api/common'
import { MANGA } from '@constants/api/routes'
import useConfiguration from '@contexts/ConfigurationContext'
import { TypeEnum } from '@interfaces/enum'
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query'
import axios from '@utils/axios'
import getFlattenedList from '@utils/getFlattenedList'

async function manga({
  queryKey,
  pageParam
}: QueryFunctionContext<[string, IMangaRequest]>) {
  try {
    const [, params] = queryKey
    const res = await axios.get<IMangaCollection>(MANGA, {
      params: {
        offset: pageParam ?? 0,
        ...(params ?? {})
      }
    })

    return res.data
  } catch (e) {
    console.warn('Manga List', (e as Error)?.message)
  }
  return undefined
}

export default function useManga(props?: { variables: IMangaRequest }) {
  const { variables } = props ?? {}
  const { config } = useConfiguration()
  const queryRes = useInfiniteQuery(
    [
      MANGA,
      {
        limit: config.pageSize,
        ...variables,
        includes: [TypeEnum.COVER_ART, ...(variables?.includes ?? [])]
      }
    ],
    manga,
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
