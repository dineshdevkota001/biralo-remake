import { generalNextPageParam } from '@hooks/api/common'
import { MANGA, MANGA_STATISTICS } from '@constants/api/routes'
import useConfiguration from '@contexts/ConfigurationContext'
import { TypeEnum } from '@interfaces/mangadex/enum'
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query'
import axios from '@utils/axios'
import mergeInfinite from '@utils/api/mergeInfinite'
import { merge } from 'lodash'

type IMangaFlags = {
  includeStats?: boolean
}

async function getManga({
  queryKey,
  pageParam
}: QueryFunctionContext<[string, IMangaRequest, IMangaFlags | undefined]>) {
  try {
    const [, params, flags] = queryKey
    const { data: res } = await axios.get<IMangaCollection>(MANGA, {
      params: {
        offset: pageParam ?? 0,
        ...(params ?? {})
      }
    })

    if (!flags?.includeStats) return res

    const mangas = res?.data
    const mangaIds = mangas?.map(m => m?.id)

    const { data: stats } = await axios.get<IMangaStatsResponse>(
      MANGA_STATISTICS,
      {
        params: {
          manga: mangaIds
        }
      }
    )

    const mangasWithStats = mangas.map(manga => ({
      ...manga,
      statistics: stats.statistics?.[manga.id]
    }))

    return {
      ...res,
      data: mangasWithStats
    }
  } catch (e) {
    console.warn('Manga List', (e as Error)?.message)
  }
  return undefined
}

export default function useMangas(props?: {
  variables: IMangaRequest
  flags?: IMangaFlags
}) {
  const { variables, flags } = props ?? {}
  const { config } = useConfiguration()
  const queryRes = useInfiniteQuery(
    [
      MANGA,
      merge(variables, {
        limit: config.pageSize,
        includes: [TypeEnum.COVER_ART]
      }),
      flags
    ],
    getManga,
    {
      getNextPageParam: generalNextPageParam
    }
  )

  return {
    ...queryRes,
    data: mergeInfinite(queryRes?.data)
  }
}
