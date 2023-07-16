interface IMangaOrderInput {
  title?: IOrderEnum
  year?: IOrderEnum
  createdAt?: IOrderEnum
  updatedAt?: IOrderEnum
  latestUploadedChapter?: IOrderEnum
  followedCount?: IOrderEnum
  relevance?: IOrderEnum
  rating?: IOrderEnum
}

interface IMangaRequest extends IPaginationInput {
  title?: string
  authors?: Array<string>
  artists?: Array<string>

  includedTags?: Array<string>
  includedTagsMode?: TagMode
  excludedTags?: Array<strings>
  excludedTagsMode?: TagMode

  originalLanguage?: Array<string>
  excludedOriginalLanguage?: Array<string>
  availableTranslatedLanguage?: Array<string>
  translatedLanguage?: Array<string>

  status?: Status
  contentRating?: ContentRating[]
  publicationDemographic?: PublicationDemographic[]
  // date
  year?: string
  createdAtSince?: string
  updatedAtSince?: string
  // includes
  includes?: Array<'manga' | 'cover_art' | 'author' | 'artist' | 'tag'>
  order?: IMangaOrderInput
}
