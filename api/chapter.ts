import { CHAPTER, MANGA } from '@constants/api/routes'
import { TypeEnum } from '@interfaces/enum'
import { QueryFunctionContext } from '@tanstack/react-query'
import axios from '@utils/axios'
import getRelationOfType from '@utils/getRelationshipOfType'
import { AxiosResponse } from 'axios'

export default async function chapters({
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
        includes: ['cover_art']
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
    console.log(e)
  }
  return null
}
