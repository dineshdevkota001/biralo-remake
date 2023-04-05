import { InfiniteData } from '@tanstack/react-query'
import { flatten } from 'lodash'

export default <T>(data?: InfiniteData<{ data: T[] }>) =>
  data ? flatten(data?.pages?.map(({ data }) => data)) : []
