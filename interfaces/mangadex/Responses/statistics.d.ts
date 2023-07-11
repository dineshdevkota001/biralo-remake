type IComment = {
  threadId: string
  repliesCount: number
}

type IDistributionIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

type IRating = {
  average: number | null
  bayesian: number | null
  distribution: Record<IDistributionIndex, number>
}

type IMangaStats = {
  comments: IComment
  rating: IRating
  follows: number
}

type IChapterStats = {
  comments: IComment
}

type IResponseStatistics<T> =
  | {
      result: 'ok'
      statistics: Record<string, T>
    }
  | IResponseError

type IMangaStatsResponse = IResponseStatistics<IMangaStats>

type IChapterStatsResponse = IResponseStatistics<IChapterStats>
