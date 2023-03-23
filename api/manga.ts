import {
  GetNextPageParamFunction,
  QueryFunctionContext
} from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import axios from 'utils/axios'

export async function queryFn({ queryKey, pageParam }: QueryFunctionContext) {
  try {
    const [location, params] = queryKey as [string, any]
    const res = await axios.get(location as string, {
      params: {
        ...(params ?? {}),
        offset: pageParam
      }
    })

    if (location.charAt(1) === 'c') console.log(res)

    return res.data
  } catch (e) {
    console.log(e)
  }
}

export const getNextPageParam: GetNextPageParamFunction = lastPage => {
  return (
    (lastPage as { offset: number }).offset +
    ((lastPage as { limit?: number }).limit ?? 10)
  )
}
