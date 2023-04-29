namespace Manga {
  type ObjectType = 'manga'

  interface Request {
    limit?: number
    offset?: number
    title?: string
    authors?: Array<string>
    artists?: Array<string>
    year?: string
    includedTags: Array<string>
    includedTagsMode: Dex.TagMode
    excludedTags: Array<strings>
    excludedTagsMode: Dex.TagMode
    status?: Dex.Status
    originalLanguage?: Array<string>
    excludedOriginalLanguage?: Array<string>
    availableTranslatedLanguage?: Array<string>
    contentRating?: Dex.ContentRating[]
    publicationDemographic?: Dex.PublicationDemographic[]
    // date
    createdAtSince?: string
    updatedAtSince?: string
    // includes
    includes: Array<'manga' | 'cover_art' | 'author' | 'artist' | 'tag'>
  }
  type Create = Request
  type Edit = Request

  interface Attributes {
    title?: LocalizedString
    altTitles?: Array<LocalizedString>
    description?: LocalizedString
    isLocked?: boolean
    links?: { [key: string]: string }
    originalLanguage?: string
    lastVolume?: string
    lastChapter?: string
    publicationDemographic?: Dex.PublicationDemographic
    status?: Dex.Status
    year?: number
    contentRating?: Dex.ContentRating
    chapterNumbersResetOnNewVolume?: boolean
    availableTranslatedLanguages?: Array
    latestUploadedChapter?: string
    tags?: Array<Tag.Type>
    // state?: State;
    version?: number
    createdAt?: string
    updatedAt?: string
  }

  type Type = Object<
    ObjectType,
    Attributes,
    Array<Object<Cover.ObjectType, Cover.Attributes>>
  >
  type ListResponse = Response.Collection<Type>
}
