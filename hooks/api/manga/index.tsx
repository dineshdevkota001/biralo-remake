import { generalNextPageParam } from '@hooks/api/common'
import { MANGA, MANGA_STATISTICS } from '@constants/api/routes'
import useConfiguration from '@contexts/ConfigurationContext'
import { TypeEnum } from '@interfaces/mangadex/enum'
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query'
import axios from '@utils/axios'
import getFlattenedList from '@utils/getFlattenedList'

type IMangaFlags = {
  includeStats?: boolean
}

type IMangaCollectionWithStats = IResponseCollection<
  IManga & { statistics: IMangaStats }
>

async function manga({
  queryKey,
  pageParam
}: QueryFunctionContext<[string, IMangaRequest, IMangaFlags | undefined]>) {
  try {
    const [, params, flags] = queryKey
    const res = await axios.get<IMangaCollectionWithStats>(MANGA, {
      params: {
        offset: pageParam ?? 0,
        ...(params ?? {})
      }
    })

    if (flags?.includeStats) {
      const mangaIds = res.data?.data?.map(m => m?.id)
      const statistics = await axios.get<IMangaStatsResponse>(
        MANGA_STATISTICS,
        {
          params: {
            manga: mangaIds
          }
        }
      )

      res.data?.data?.forEach((m, index) => {
        res.data.data[index].statistics = statistics?.data?.statistics?.[m.id]
      })
    }

    return res.data
  } catch (e) {
    console.warn('Manga List', (e as Error)?.message)
  }
  return undefined
}

export default function useManga(props?: {
  variables: IMangaRequest
  flags?: IMangaFlags
}) {
  const { variables, flags } = props ?? {}
  const { config } = useConfiguration()
  const queryRes = useInfiniteQuery(
    [
      MANGA,
      {
        limit: config.pageSize,
        ...variables,
        includes: [TypeEnum.COVER_ART, ...(variables?.includes ?? [])]
      },
      flags
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
