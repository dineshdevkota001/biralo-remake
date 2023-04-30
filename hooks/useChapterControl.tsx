import { generalQueryFn } from '@api/common'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { flatten } from 'lodash'

import { useMemo } from 'react'

type IChapter = {
  chapter: string
  id: string
  others: string[]
  count: number
}

type IVolume = {
  volume: string
  count: number
  chapters: IChapter[]
}

export default function useChapterControls() {
  const { params } = useRoute<IRootStackScreenProps<'Gallery'>['route']>()
  const navigation =
    useNavigation<IRootStackScreenProps<'Gallery'>['navigation']>()
  const { mangaId, chapterId } = params

  const { data: chapters } = useQuery<
    [string, { groups: string[] }],
    unknown,
    {
      result: Response.Result
      volumes: Record<string, IVolume>
    }
  >([`/manga/${mangaId}/aggregate`, { groups: [] }], generalQueryFn)

  const { nextChapter, previousChapter, currentChapter } = useMemo(() => {
    if (!chapters) return {}

    const flattenedVolumes = Object.values(chapters.volumes)
    const chapterListVolumeList = flattenedVolumes
      .map(({ chapters: chapterInVolume }) => chapterInVolume)
      .map(e => Object.values(e))
    const flattenedChapters = flatten(chapterListVolumeList)

    const currentIndex =
      flattenedChapters?.findIndex(({ id }) => id === chapterId) ?? -1
    const prev = currentIndex > 0 ? flattenedChapters?.[currentIndex - 1] : null
    const next =
      currentIndex < (flattenedChapters?.length ?? 0) - 1
        ? flattenedChapters?.[currentIndex + 1]
        : null
    return {
      nextChapter: next,
      previousChapter: prev,
      currentChapter: flattenedChapters?.[currentIndex]
    }
  }, [chapters, chapterId])

  const loadChapter =
    (chapter?: IChapter | null, nullCallback = navigation.goBack) =>
    () => {
      if (chapter)
        navigation.replace('Gallery', {
          chapterId: chapter.id ?? chapter.others?.[0],
          mangaId
        })
      else nullCallback()
    }

  const goPrev = loadChapter(previousChapter)
  const goNext = loadChapter(nextChapter)
  return {
    goNext,
    goPrev,
    hasPrev: Boolean(previousChapter),
    hasNext: Boolean(nextChapter),
    currentChapter
  }
}
