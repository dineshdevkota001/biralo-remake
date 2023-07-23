import { ResponseResultEnum } from '@interfaces/mangadex/enum'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { flatten, orderBy } from 'lodash'

import { useMemo } from 'react'
import { generalQueryFn } from '@hooks/api/common'

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
    [string],
    unknown,
    {
      result: ResponseResultEnum
      volumes: Record<string, IVolume>
    }
  >([`/manga/${mangaId}/aggregate`], generalQueryFn)

  const { nextChapter, previousChapter, currentChapter } = useMemo(() => {
    if (!chapters) return {}

    const volumes = orderBy(Object.values(chapters.volumes), 'volume')
    const chaps = flatten(
      volumes
        .map(({ chapters: chs }) => chs)
        ?.map(a => orderBy(Object.values(a), 'chapter'))
    )

    const currentIndex = chaps?.findIndex(({ id }) => id === chapterId) ?? -1
    const prev = currentIndex > 0 ? chaps?.[currentIndex - 1] : null
    const next =
      currentIndex < (chaps?.length ?? 0) - 1 ? chaps?.[currentIndex + 1] : null
    return {
      nextChapter: next,
      previousChapter: prev,
      currentChapter: chaps?.[currentIndex]
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
