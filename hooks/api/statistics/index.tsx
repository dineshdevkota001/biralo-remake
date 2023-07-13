import {
  CHAPTER_ID_STATISTICS,
  MANGA_ID_STATISTICS
} from '@constants/api/routes'
import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import axios from '@utils/axios'

export async function generalQueryFn<
  T extends IChapterStatsResponse | IMangaStatsResponse
>({ queryKey }: QueryFunctionContext<[string]>) {
  try {
    const [location] = queryKey
    const res = await axios.get<T | IResponseError>(location as string)
    if (res.data.result !== 'ok') throw Error(res.data.errors?.[0]?.message)

    return res.data
  } catch (e) {
    console.warn((e as Error)?.message)
  }
  return null
}

export function useChapterStats({ id }: { id: string }) {
  const { data, ...queryRes } = useQuery(
    [CHAPTER_ID_STATISTICS(id)],
    generalQueryFn<IChapterStatsResponse>
  )
  return {
    ...queryRes,
    data: {
      ...data,
      statistics: data?.statistics?.[id]
    }
  }
}

export function useMangaStats({ id }: { id: string }) {
  const { data, ...queryRes } = useQuery(
    [MANGA_ID_STATISTICS(id)],
    generalQueryFn<IMangaStatsResponse>
  )
  return {
    ...queryRes,
    data: {
      ...data,
      statistics: data?.statistics?.[id]
    }
  }
}
