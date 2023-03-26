interface IChapterRequest {
  title?: string
  createdAtSince?: string
  updatedAtSince?: string
  publishAtSince?: string
  order?: {
    createdAt?: 'asc' | 'desc'
    updatedAt?: 'asc' | 'desc'
    publishAt?: 'asc' | 'desc'
    volume?: 'asc' | 'desc'
    chapter?: 'asc' | 'desc'
  }
  translatedLanguage?: string[]
  originalLanguage?: string[]
  excludedOriginalLanguage?: string[]
  contentRating?: Array<'safe' | 'suggestive' | 'erotica' | 'pornographic'>
  ids?: string[]
  limit?: number
  offset?: number
  //   groups?: string[] | Group[]
  //   uploader?: string | User | Relationship<User>
  //   manga?: string | Manga | Relationship<Manga>
  volume?: string[]
  chapter?: string
}

interface IChapter extends IObjectIdentifier<'chapter'> {
  attributes: {
    id: string
    volume: string
    chapter: string
    title: string
    translatedLanguage: string
    createdAt: Date
    updatedAt: Date
    publishAt: Date
    readableAt: Date
    pages: number
    isExternal: boolean
    externalUrl: string
    // groups: Array<Relationship<Group>>
    // manga: Relationship<Manga>
    // uploader: Relationship<User>
  }
}
