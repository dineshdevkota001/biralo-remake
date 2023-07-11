interface IMangaAttributes {
  title?: ILocalizedString
  altTitles?: Array<ILocalizedString>
  description?: ILocalizedString
  originalLanguage?: ILocalizationLanguageEnum
  publicationDemographic?: IPublicationDemographicEnum
  status?: IStatusEnum
  contentRating?: IContentRatingEnum
  state?: IStateEnum
  availableTranslatedLanguages?: Array<ILocalizationLanguageEnum>
  lastVolume?: string
  lastChapter?: string
  latestUploadedChapter?: string
  chapterNumbersResetOnNewVolume?: boolean
  tags?: Array<ITag>
  year?: number
  links?: Record<string, string>
  createdAt?: string
  updatedAt?: string
  version?: number
  isLocked?: boolean
}

interface IManga {
  id: IId
  type: 'manga'
  attributes: IMangaAttributes
  relationships: IMangaRelationships
}

type IMangaCollection = IResponseCollection<IManga>
