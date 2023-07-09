import { CHAPTER_ID_STATISTICS } from '@constants/api/routes'
import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import axios from '@utils/axios'

export async function generalQueryFn({
  queryKey
}: QueryFunctionContext<[string]>) {
  try {
    const [location] = queryKey
    const res = await axios.get<IChapterStatsResponse>(location as string)

    return res.data
  } catch (e) {
    console.warn((e as Error)?.message)
  }
  return null
}

export default function useChapterStats({ id }: { id: string }) {
  const { data, ...queryRes } = useQuery(
    [CHAPTER_ID_STATISTICS(id)],
    generalQueryFn
  )
  return {
    ...queryRes,
    data: {
      ...data,
      statistics: data?.statistics?.[id]
    }
  }
}
