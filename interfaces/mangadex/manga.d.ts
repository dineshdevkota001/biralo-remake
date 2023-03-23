type IManga = IObject<
  'manga',
  {
    title: ITranslationString
    altTitle: ITranslationString[]
    description: ITranslationString
    links: ITranslationString
    latestUploadedChapter: string
    updatedAt: string
  }
> & {
  relationships: IObject<{}>[]
}

type IMangaRequest = {
  limit?: number
  offset?: number
  title?: string
  authorOrArtist?: string
}
