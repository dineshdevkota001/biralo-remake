import { queryFn } from '@api/manga'
import {
  UseQueryOptions,
  useQuery as useReactQuery
} from '@tanstack/react-query'

export default function useQuery<
  RequestType,
  ResponseType,
  ErrorType = Response.ErrorResponse
>({
  route,
  variables,
  ...options
}: Omit<
  UseQueryOptions<ResponseType, ErrorType, unknown, [string, RequestType]>,
  'queryFn' | 'queryKey' | 'initialData'
> & {
  route: string
  variables: RequestType
}) {
  return useReactQuery<ResponseType, ErrorType, unknown, [string, RequestType]>(
    [route, variables],
    queryFn,
    options
  )
}
