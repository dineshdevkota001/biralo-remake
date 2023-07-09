import { generalNextPageParam } from '@api/common'
import { CHAPTER_STATISTICS, MANGA_FEED } from '@constants/api/routes'
import useConfiguration from '@contexts/ConfigurationContext'
import { OrderEnum, TypeEnum } from '@interfaces/enum'
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query'
import axios from '@utils/axios'
import getFlattenedList from '@utils/getFlattenedList'
import { clone } from 'lodash'

type IChapterListFlags = { includeStats?: boolean }
export async function mangaFeed({
  queryKey,
  pageParam
}: QueryFunctionContext<
  [string, IChapterRequest, IChapterListFlags | undefined]
>) {
  try {
    const [location, params, flags] = queryKey
    const res = await axios.get<
      IResponseCollection<IChapter & { statistics?: IChapterStats }>
    >(location as string, {
      params: {
        offset: pageParam ?? 0,
        ...(params ?? {})
      }
    })

    if (!flags?.includeStats) return res.data

    const chapters = res.data

    const chapterIds = chapters.data?.map(chapter => chapter.id)

    const stats = await axios.get<IChapterStatsResponse>(CHAPTER_STATISTICS, {
      params: {
        chapter: chapterIds
      }
    })

    const chapterStatsMap = stats.data.statistics

    const returnArray = clone(chapters)

    returnArray?.data?.forEach((chapter, index) => {
      returnArray.data[index] = {
        ...returnArray.data?.[index],
        statistics: chapterStatsMap?.[chapter.id]
      }
    })

    return returnArray
  } catch (e) {
    console.log('Manga Chapter list', (e as Error)?.message)
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
      },
      flags
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
