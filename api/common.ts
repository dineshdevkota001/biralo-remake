import {
  GetNextPageParamFunction,
  QueryFunctionContext
} from '@tanstack/react-query'
import axios from '@utils/axios'

export function wrapError<T>(callback: () => T) {
  try {
    return callback()
  } catch (e) {
    console.warn((e as Error)?.message)
  }
  return null
}

export async function generalQueryFn({
  queryKey,
  pageParam
}: QueryFunctionContext) {
  try {
    const [location, params] = queryKey as [string, any]
    const res = await axios.get(location as string, {
      params: {
        offset: pageParam ?? 0,
        ...(params ?? {})
      }
    })

    return res.data
  } catch (e) {
    console.warn(queryKey[0], (e as Error)?.message)
  }
  return null
}

export function generalNextPageParam<
  T extends {
    limit?: number
    offset?: number
  }
>(lastPage: Parameters<GetNextPageParamFunction<T>>[0] | null | undefined) {
  return (lastPage?.offset ?? 0) + (lastPage?.limit ?? 10)
}
