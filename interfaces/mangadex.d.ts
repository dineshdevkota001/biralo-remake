/* eslint-disable no-use-before-define */
import {
  TypeEnum,
  ResponseResultEnum,
  ResponseTypeEnum,
  TypeEnum,
  PublicationDemographicEnum,
  StatusEnum,
  ContentRatingEnum,
  StateEnum,
  OrderEnum,
  MangaRelationEnum,
  TagGroupEnum,
  LocalizationLanguageEnum
} from './enum'

type IId = string

declare global {
  // #region Response
  interface IResponseError {
    result: ResponseResultEnum.ERROR
    errors: Array<Error>
  }

  type ILocalizedString<T = string> = Record<LocalizationLanguageEnum, T>
  interface IResponseStatistics<T> extends IResponseError {
    result: ResponseResultEnum.OK
    statistics: T
  }
  interface IResponseEntity<T> extends IResponseError {
    result: ResponseResultEnum.OK
    response: ResponseTypeEnum.ENTITY
    data: T
  }
  interface IResponseCollection<T> extends IResponseError {
    result: ResponseResultEnum.OK
    response: ResponseTypeEnum.COLLECTION
    data: Array<T>
    limit?: number
    offset?: number
    total?: number
  }
  // #endregion

  // #region Helpers
  interface IObjectType<
    T extends TypeEnum,
    Attributes,
    Relationship = undefined
  > {
    type: T
    id: IId
    attributes: Attributes
    relationships: Relationship
  }
  // #endregion

  // #region Requests
  interface ICommonChapterAndMangaRequest {
    limit?: number
    offset?: number
    title?: string
  }
  interface IMangaRequest extends ICommonChapterAndMangaRequest {
    authors?: Array<string>
    artists?: Array<string>
    year?: string
    includedTags?: Array<string>
    includedTagsMode?: TagMode
    excludedTags?: Array<strings>
    excludedTagsMode?: TagMode
    status?: Status
    originalLanguage?: Array<string>
    excludedOriginalLanguage?: Array<string>
    availableTranslatedLanguage?: Array<string>
    contentRating?: ContentRating[]
    publicationDemographic?: PublicationDemographic[]
    // date
    createdAtSince?: string
    updatedAtSince?: string
    // includes
    includes?: Array<
      TypeEnum.MANGA,
      TypeEnum.COVER_ART,
      TypeEnum.AUTHOR,
      TypeEnum.ARTIST,
      TypeEnum.TAG
    >
    order?: {
      title?: OrderEnum
      year?: OrderEnum
      createdAt?: OrderEnum
      updatedAt?: OrderEnum
      latestUploadedChapter?: OrderEnum
      followedCount?: OrderEnum
      relevance?: OrderEnum
      rating?: OrderEnum
    }
  }
  interface IChapterRequest extends ICommonChapterAndMangaRequest {
    volume?: string
    chapter?: string
    translatedLanguage?: string[]
    groups?: Array<string>
    version?: number
    includes?: Array<TypeEnum.MANGA | TypeEnum.SCANLATION_GROUP | TypeEnum.USER>
    order?: {
      createdAt?: OrderEnum
      updatedAt?: OrderEnum
      publishAt?: OrderEnum
      readableAt?: OrderEnum
      volume?: OrderEnum
      chapter?: OrderEnum
    }
  }

  // #endregion
  // #region Attributes

  interface IMangaAttributes {
    title?: ILocalizedString
    altTitles?: Array<ILocalizedString>
    description?: ILocalizedString
    isLocked?: boolean
    links?: { [key: string]: string }
    originalLanguage?: string
    lastVolume?: string
    lastChapter?: string
    publicationDemographic?: PublicationDemographicEnum
    status?: StatusEnum
    year?: number
    contentRating?: ContentRatingEnum
    chapterNumbersResetOnNewVolume?: boolean
    availableTranslatedLanguages?: Array<LocalizationLanguageEnum>
    latestUploadedChapter?: string
    tags?: Array<ITag>
    state?: StateEnum
    version?: number
    createdAt?: string
    updatedAt?: string
  }

  interface ICoverAttributes {
    volume?: string
    fileName?: string
    description?: string
    locale?: string
    version?: number
    createdAt?: string
    updatedAt?: string
  }

  interface IChapterAttributes {
    title?: string
    volume?: string
    chapter?: string
    pages?: number
    translatedLanguage?: LocalizationLanguageEnum
    uploader?: string
    externalUrl?: string
    version?: number
    createdAt?: string
    updatedAt?: string
    publishAt?: string
    readableAt?: string
  }

  interface ITagAttributes {
    name?: LocalizedString
    description?: LocalizedString
    group?: TagGroupEnum
    version?: number
  }
  interface IScanlationGroupAttributes {
    name?: string
  }
  interface IUserAttributes {
    name: string
  }
  interface IMeAttributes {
    username: string
    roles: string[]
    version: number
  }
  // #endregion
  // #region Relations
  type IGeneralRelation<T> = Pick<T, 'id' | 'type' | 'attributes'> & {
    related?: MangaRelationEnum
  }
  type IMangaRelationships = Array<
    IGeneralRelation<IManga> | IGeneralRelation<ICover>
  >
  type IChapterRelationships = Array<
    | IGeneralRelation<TypeEnum.MANGA, IMangaAttributes>
    | IGeneralRelation<TypeEnum.SCANLATION_GROUP, IMangaAttributes>
    | IGeneralRelation<TypeEnum.USER, IMangaAttributes>
  >
  // #endregion
  // #region Type
  interface IManga {
    id: IId
    type: TypeEnum.MANGA
    attributes: IMangaAttributes
    relationships: IMangaRelationships
  }
  interface IChapter {
    id: IId
    type: TypeEnum.CHAPTER
    attributes: IChapterAttributes
    relationships: IChapterRelationships
  }
  type ICover = IObjectType<TypeEnum.COVER_ART, ICoverAttributes>
  type ITag = IObjectType<TypeEnum.TAG, ITagAttributes>
  type IMe = IObjectType<TypeEnum.USER, IMeAttributes>
  // #endregion
  // #region Responses
  // #endregion
  // #region ListResponses
  type IMangaCollection = IResponseCollection<IManga>
  type IChapterCollection = IResponseCollection<IChapter>
  type ITagCollection = IResponseCollection<ITag>
  // #endregion

  // #region Stats
  type IComment = {
    threadId: string
    repliesCount: number
  }
  type IRating = {
    average: number | null
    bayesian: number | null
    distribution: Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10, number>
  }
  type IMangaStats = {
    comments: IComment
    rating: IRating
    follows: number
  }
  type IChapterStats = {
    comments: IComment
  }
  type IMangaStatsResponse = IResponseStatistics<Record<string, IMangaStats>>
  type IChapterStatsResponse = IResponseStatistics<
    Record<string, IChapterStats>
  >
  // #endregion
}
