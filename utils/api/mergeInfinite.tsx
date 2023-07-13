import { UseInfiniteQueryResult } from '@tanstack/react-query'
import { isNumber } from 'lodash'

type IInfiniteDataList<T> = {
  items: T
  pageInfo: {
    limit: number | null
    offset: number | null
    total: number | null
    hasNextPage: boolean | null
  }
}

export default function mergeInfinite<
  T extends IResponseCollection<unknown> | null | undefined
>(
  data: UseInfiniteQueryResult<T>['data']
): IInfiniteDataList<NonNullable<T>['data']> {
  if (!data || data?.pages?.length)
    return {
      items: [],
      pageInfo: {
        limit: null,
        offset: null,
        total: null,
        hasNextPage: null
      }
    }

  const items = data?.pages?.flatMap<NonNullable<T>['data'][0]>(
    page => page?.data
  )

  const {
    limit = null,
    offset = null,
    total = null
  } = data?.pages?.findLast(Boolean) ?? {}

  return {
    items,
    pageInfo: {
      limit,
      offset,
      total,
      hasNextPage:
        isNumber(limit) && isNumber(offset) && isNumber(total)
          ? limit + offset < total
          : null
    }
  }
}
