import { generalNextPageParam } from '@hooks/api/common'
import { CHAPTER_STATISTICS, MANGA_FEED } from '@constants/api/routes'
import { useMangadexConfig } from '@contexts/ConfigurationContext'
import { OrderEnum, TypeEnum } from '@interfaces/mangadex/enum'
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query'
import axios from '@utils/axios'
import { merge } from 'lodash'
import mergeInfinite from '@utils/api/mergeInfinite'

type IChapterListFlags = { includeStats?: boolean }
export async function mangaFeed({
  queryKey,
  pageParam
}: QueryFunctionContext<
  [string, IChapterRequest, IChapterListFlags | undefined]
>) {
  try {
    const [location, params, flags] = queryKey
    const { data: res } = await axios.get<IResponseCollection<IChapter>>(
      location as string,
      {
        params: {
          offset: pageParam ?? 0,
          ...(params ?? {})
        }
      }
    )
    if (!flags?.includeStats) return res

    const chapters = res?.data
    const chapterIds = chapters?.map(chapter => chapter.id)

    const { data: stats } = await axios.get<IChapterStatsResponse>(
      CHAPTER_STATISTICS,
      {
        params: {
          chapter: chapterIds
        }
      }
    )

    const chaptersWithStats = chapters?.map(manga => ({
      ...manga,
      statistics: stats.statistics?.[manga.id]
    }))

    return {
      ...res,
      data: chaptersWithStats
    }
  } catch (e) {
    //
  }
  return null
}

export default function useMangaFeed({
  id,
  variables,
  flags
}: {
  id: string
  variables?: IChapterRequest
  flags?: IChapterListFlags
}) {
  const { pageSize, translatedLanguage } = useMangadexConfig()

  const queryRes = useInfiniteQuery(
    [
      MANGA_FEED(id),
      merge(
        {
          limit: 3 * pageSize,
          translatedLanguage,
          order: {
            volume: OrderEnum.DESC,
            chapter: OrderEnum.DESC
          },
          includes: [TypeEnum.SCANLATION_GROUP, TypeEnum.USER]
        },
        variables
      ),
      flags
    ],
    mangaFeed,
    {
      getNextPageParam: generalNextPageParam
    }
  )

  return { ...queryRes, data: mergeInfinite(queryRes.data) }
}
