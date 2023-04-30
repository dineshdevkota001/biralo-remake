/* eslint-disable no-use-before-define */
export enum ResponseResultEnum {
  OK = 'ok',
  ERROR = 'error'
}

export enum ResponseTypeEnum {
  ENTITY = 'entity',
  COLLECTION = 'collection'
}

export enum TagModeEnum {
  AND = 'AND',
  OR = 'OR'
}

export enum TypeEnum {
  MANGA = 'manga',
  CHAPTER = 'chapter',
  COVER_ART = 'cover_art',
  USER = 'user',
  AUTHOR = 'author',
  CUSTOM_LIST = 'custom_list',
  GROUP = 'group',
  MANGA_RELATION = 'manga_relation',
  MAPPING_ID = 'mapping_id',
  TAG = 'tag',
  SCANLATION_GROUP = 'scanlation_group'
}

export enum PublicationDemographicEnum {
  SHOUNEN = 'shounen',
  SHOUJO = 'shoujo',
  JOSEI = 'josei',
  SEINEN = 'seinen'
}

export enum StatusEnum {
  COMPLETED = 'completed',
  ONGOING = 'ongoing',
  CANCELLED = 'cancelled',
  HIATUS = 'hiatus'
}

export enum ContentRatingEnum {
  SAFE = 'safe',
  SUGGESTIVE = 'suggestive',
  EROTICA = 'erotica',
  PORNOGRAPHIC = 'pornographic'
}

export enum ContentWarningEnum {
  GORE = 'gore',
  SEXUAL_VIOLENCE = 'sexual_violence'
}

export enum StateEnum {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  PUBLISHED = 'published',
  REJECTED = 'rejected'
}

export enum OrderEnum {
  ASC = 'asc',
  DESC = 'desc'
}

export enum MangaRelationEnum {
  MONOCHROME = 'monochrome',
  MAIN_STORY = 'main_story',
  ADAPTED_FROM = 'adapted_from',
  BASED_ON = 'based_on',
  PREQUEL = 'prequel',
  SIDE_STORY = 'side_story',
  DOUJINSHI = 'doujinshi',
  SAME_FRANCHISE = 'same_franchise',
  SHARED_UNIVERSE = 'shared_universe',
  SEQUEL = 'sequel',
  SPIN_OFF = 'spin_off',
  ALTERNATE_STORY = 'alternate_story',
  ALTERNATE_VERSION = 'alternate_version',
  PRESERIALIZATION = 'preserialization',
  COLORED = 'colored',
  SERIALIZATION = 'serialization'
}

export enum TagGroupEnum {
  CONTENT = 'content',
  FORMAT = 'format',
  GENRE = 'genre',
  THEME = 'theme'
}

export enum LocalizationLanguageEnum {
  EN = 'en',
  JP_RO = 'jp-RO'
}
export enum CoverQualityEnum {
  LOW = 256,
  HIGH = 512
}

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
    includes: Array<
      TypeEnum.MANGA,
      TypeEnum.COVER_ART,
      TypeEnum.AUTHOR,
      TypeEnum.ARTIST,
      TypeEnum.TAG
    >
    order?: {
      createdAt?: OrderEnum
      updatedAt?: OrderEnum
      publishAt?: OrderEnum
      readableAt?: OrderEnum
      volume?: OrderEnum
      chapter?: OrderEnum
    }
  }
  interface IChapterRequest extends ICommonChapterAndMangaRequest {
    volume?: string
    chapter?: string
    translatedLanguage?: string[]
    groups?: Array<string>
    version?: number
    includes: Array<TypeEnum.MANGA | TypeEnum.SCANLATION_GROUP | TypeEnum.USER>
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
    availableTranslatedLanguages?: Array
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
    translatedLanguage?: string
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
  // #endregion
  // #region Relations
  // interface IGeneralRelation<T> {
  //   id: string
  //   type: Type
  //   attributes: T
  // }
  type IGeneralRelation<T> = Pick<T, 'id' | 'type' | 'attributes'> & {
    related?: MangaRelationEnum
  }
  type IMangaRelationships = Array<
    IGeneralRelation<IManga> | IGeneralRelation<ICover>
  >
  type IChapterRelationships = Array<
    IGeneralRelation<TypeEnum.MANGA, IMangaAttributes>
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
