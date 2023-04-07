type IManga = IObjectIdentifier<'manga'> & {
  attributes: {
    title: ITranslationString
    altTitle: ITranslationString[]
    description: ITranslationString
    links: ITranslationString
    latestUploadedChapter: string
    updatedAt: string
  }
  relationships: IObject<unkmown>[]
}

type IMangaRequest = {
  limit?: number
  offset?: number
  title?: string
  authorOrArtist?: string
  includes: 'cover_art'[]
}
