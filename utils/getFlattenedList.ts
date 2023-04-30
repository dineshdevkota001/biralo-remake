import { InfiniteData } from '@tanstack/react-query'
import { flatten } from 'lodash'

export default <T>(data?: InfiniteData<{ data?: T[] } | null | undefined>) => {
  if (data) return flatten(data?.pages?.map(page => page?.data))
  return []
}
