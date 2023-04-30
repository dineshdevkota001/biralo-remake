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

export function generalQueryFn({ queryKey, pageParam }: QueryFunctionContext) {
  return wrapError(async () => {
    const [location, params] = queryKey as [string, any]
    const res = await axios.get(location as string, {
      params: {
        offset: pageParam ?? 0,
        ...(params ?? {})
      }
    })

    return res.data
  })
}

export const generalNextPageParam: GetNextPageParamFunction = lastPage => {
  return (
    (lastPage as { offset: number })?.offset ??
    0 + ((lastPage as { limit?: number })?.limit ?? 10)
  )
}
