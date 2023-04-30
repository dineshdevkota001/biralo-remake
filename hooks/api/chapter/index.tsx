import { generalNextPageParam } from '@api/common'
import getFlattenedList from '@utils/getFlattenedList'
import { CHAPTER, MANGA } from '@constants/api/routes'
import { OrderEnum, TypeEnum } from '@interfaces/enum'
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query'
import axios from '@utils/axios'
import getRelationOfType from '@utils/getRelationshipOfType'
import { AxiosResponse } from 'axios'

async function chapters({
  queryKey,
  pageParam
}: QueryFunctionContext<[string, IChapterRequest]>) {
  try {
    const [, params] = queryKey
    const res = await axios.get<unknown, AxiosResponse<IChapterCollection>>(
      CHAPTER,
      {
        params: {
          offset: pageParam ?? 0,
          ...(params ?? {})
        }
      }
    )

    const chapterList = res.data?.data

    const mangaIdToChapters: Record<string, IChapter[]> = chapterList.reduce(
      (acc, curr) => {
        const mangaId = (
          getRelationOfType(
            curr.relationships,
            TypeEnum.MANGA
          ) as IGeneralRelation<IManga>
        )?.id

        if (mangaId && acc?.[mangaId]) acc[mangaId].push(curr)
        else if (mangaId) acc[mangaId] = [curr]
        return acc
      },
      Object.create(null)
    )

    const mangas = await axios.get<
      IMangaRequest,
      AxiosResponse<IMangaCollection>
    >(MANGA, {
      params: {
        ids: Object.keys(mangaIdToChapters),
        includes: [TypeEnum.COVER_ART]
      }
    })

    const mangaWithChapters = mangas?.data?.data?.map(props => ({
      ...props,
      chapters: mangaIdToChapters?.[props.id] ?? []
    }))
    return {
      ...res.data,
      data: mangaWithChapters
    }
  } catch (e) {
    console.log('latest', e)
  }
  return null
}

export default function useChapters(
  props:
    | {
        variables: IChapterRequest
      }
    | undefined
) {
  const { variables } = props ?? {}
  const queryRes = useInfiniteQuery([CHAPTER, variables ?? {}], chapters, {
    getNextPageParam(lastPage) {
      return (
        (lastPage as { offset: number })?.offset ??
        0 + ((lastPage as { limit?: number })?.limit ?? 30)
      )
    }
  })

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

export function useLatestChapters(props?: { variables: IChapterRequest }) {
  return useChapters({
    ...props,
    variables: {
      limit: 30,
      order: {
        readableAt: OrderEnum.DESC
      },
      ...props?.variables
    }
  })
}
