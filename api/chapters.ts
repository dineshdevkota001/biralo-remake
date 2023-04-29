import { MANGA } from '@constants/api/routes'
import { ObjectType } from '@interfaces/dex/enum'
import { QueryFunctionContext } from '@tanstack/react-query'
import axios from '@utils/axios'
import getRelationOfType from '@utils/getRelationshipOfType'
import { AxiosResponse } from 'axios'

export default async function latestChapters({
  queryKey,
  pageParam
}: QueryFunctionContext) {
  try {
    const [location, params] = queryKey as [string, any]
    const res = await axios.get<unknown, AxiosResponse<Chapter.ListResponse>>(
      location as string,
      {
        params: {
          offset: pageParam ?? 0,
          ...(params ?? {})
        }
      }
    )

    const chapterList = res.data?.data

    const mangaIdToChapters: Record<string, Chapter.Type[]> =
      chapterList.reduce((acc, curr) => {
        const mangaId = getRelationOfType(
          curr.relationships,
          ObjectType.MANGA
        )?.id

        if (mangaId && acc?.[mangaId]) acc[mangaId].push(curr)
        else if (mangaId) acc[mangaId] = [curr]
        return acc
      }, Object.create(null))

    // const mangaIdToChapters = groupBy(chapterList, '')

    const mangas = await axios.get<
      Manga.Request,
      AxiosResponse<Manga.ListResponse>
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
