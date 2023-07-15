import { CHAPTER, MANGA } from '@constants/api/routes'
import { OrderEnum, TypeEnum } from '@interfaces/mangadex/enum'
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query'
import axios from '@utils/axios'
import getRelationOfType from '@utils/getRelationshipOfType'
import { useMangadexConfig } from '@contexts/ConfigurationContext'
import { generalNextPageParam } from '@hooks/api/common'
import mergeInfinite from '@utils/api/mergeInfinite'
import { merge } from 'lodash'

async function getChapters({
  queryKey,
  pageParam
}: QueryFunctionContext<[string, IChapterRequest]>) {
  try {
    const [, params] = queryKey

    const { data: res } = await axios.get<IChapterCollection>(CHAPTER, {
      params: {
        offset: pageParam ?? 0,
        ...(params ?? {})
      }
    })

    const chapters = res?.data

    const idChaptersMap: Record<string, IChapter[]> = chapters.reduce(
      (idMapAcc, chapter) => {
        const mangaId = getRelationOfType<IMangaRelated>(
          chapter.relationships,
          TypeEnum.MANGA
        )?.id

        if (!mangaId) return idMapAcc

        if (!idMapAcc?.[mangaId]) return { ...idMapAcc, [mangaId]: [chapter] }

        idMapAcc[mangaId].push(chapter)
        return idMapAcc
      },
      Object.create(null)
    )

    const mangaIds = Object.keys(idChaptersMap)

    const { data: mangas } = await axios.get<IMangaCollection>(MANGA, {
      params: {
        ids: mangaIds,
        includes: [TypeEnum.COVER_ART]
      }
    })

    const mangaWithChapters = mangas?.data?.map(props => ({
      ...props,
      chapters: idChaptersMap?.[props.id] ?? []
    }))

    return {
      ...res,
      data: mangaWithChapters
    }
  } catch (e) {
    //
  }
  return null
}

export default function useChapters(props: { variables: IChapterRequest }) {
  const { variables } = props ?? {}
  const queryRes = useInfiniteQuery(
    [
      CHAPTER,
      merge(variables, {
        includes: [TypeEnum.SCANLATION_GROUP, TypeEnum.USER]
      })
    ],
    getChapters,
    {
      getNextPageParam: generalNextPageParam
    }
  )

  return {
    ...queryRes,
    data: mergeInfinite(queryRes.data)
  }
}

export function useLatestChapters(props?: { variables: IChapterRequest }) {
  const { pageSize, translatedLanguage } = useMangadexConfig()

  return useChapters({
    ...props,
    variables: merge(props?.variables, {
      limit: 3 * pageSize,
      order: {
        readableAt: OrderEnum.DESC
      },
      translatedLanguage: translatedLanguage?.length
        ? translatedLanguage
        : undefined
    } as IChapterRequest)
  })
}
