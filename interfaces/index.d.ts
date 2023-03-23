/// <reference types="node" />

declare class LocalizedString {
  static locale: string
  constructor(stringObject: { [x: string]: string })
  availableLocales: string[]
  get localString(): string
  get data(): {
    [locale: string]: string
  }
}
declare class Links {
  constructor(linksObject: { [x: string]: string })
  availableLinks: string[]
  /**
   * Anilist (https://anilist.co) link to manga
   */
  al: string
  /**
   * AnimePlanet (https://anime-planet.com) link to manga
   */
  ap: string
  /**
   * Bookwalker (https://bookwalker.jp/) link to manga
   */
  bw: string
  /**
   * Mangaupdates (https://mangaupdates.com) link to manga
   */
  mu: string
  /**
   * Novelupdates (https://novelupdates.com) link to manga
   */
  nu: string
  /**
   * MyAnimeList (https://myanimelist.net) link to manga
   */
  mal: string
  /**
   * Kitsu (https://kitsu.io) link to manga
   */
  kt: string
  kit: string
  /**
   * Amazon (https://amazon.com) link to manga
   */
  amz: string
  /**
   * EBookJapan (https://ebookjapan.yahoo.co.jp) link to manga
   */
  ebj: string
  /**
   * Link to manga raws
   */
  raw: string
  /**
   * Link to offical english manga translation
   */
  engtl: string
  /**
   * CDJapan (https://www.cdjapan.co.jp/) link to manga
   */
  cdj: string
}
declare class Relationship<ResolveType> {
  static types: {}

  static convertType<T>(
    type: string,
    dataArray: any[],
    caller: any
  ): Relationship<T>

  static registerType(name: string, classObject: any): void

  static resolveAll<T_1>(relationshipArray: Relationship<T_1>[]): Promise<T_1[]>
  constructor(data: any)

  id: string
  type: string
  cached: boolean
  /**
   * This function must be called to return the proper and complete object representation of this relationship.
   * Essentially, it calls and returns Manga.get(), Author.get(), Cover.get(), etc.
   * @returns {Promise<ResolveType>}
   */
  resolve(): Promise<ResolveType>
}
/**
 * Represents the cover art of a manga volume
 * https://api.mangadex.org/docs.html#tag/Cover
 */
export declare class Cover {
  static get(id: string, includeSubObjects?: boolean): Promise<Cover>

  static search(
    searchParameters?: {
      limit?: number
      offset?: number
      manga?: string[] | Manga[]
      ids?: string[] | Cover[]
      uploaders?: string[] | User[]
      order?: {
        createdAt?: 'asc' | 'desc'
        updatedAt?: 'asc' | 'desc'
        volume?: 'asc' | 'desc'
      }
    },
    includeSubObjects?: boolean
  ): Promise<Cover[]>

  static create(
    mangaId?: string,
    file?: {
      data: Buffer
      type?: 'jpeg' | 'png' | 'gif'
      name: string
    },
    options?: {
      volume?: string | null
      description?: string
    }
  ): Promise<Cover>
  static getMultiple(
    ...ids: (string | Cover | Relationship<Cover>)[]
  ): Promise<Cover[]>
  static getByQuery(searchParameters?: {
    limit?: number
    offset?: number
    manga?: string[] | Manga[]
    ids?: string[] | Cover[]
    uploaders?: string[] | User[]
    order?: {
      createdAt?: 'asc' | 'desc'
      updatedAt?: 'asc' | 'desc'
      volume?: 'asc' | 'desc'
    }
  }): Promise<Cover>

  static getMangaCovers(
    ...manga: (string | Manga | Relationship<Manga>)[]
  ): Promise<Cover[]>
  constructor(context: any | string)
  id: string
  volume: string
  description: string
  createdAt: Date
  updatedAt: Date
  manga: Relationship<Manga>
  uploader: Relationship<User>
  locale: string
  imageSource: string
  image512: string
  image256: string
}
declare class Tag {
  static cache: Tag[]
  static getAllTags(): Promise<Tag[]>
  static getTag(indentity: string): Promise<Tag>
  constructor(data: any)
  id: string
  localizedName: LocalizedString
  localizedDescription: LocalizedString
  group: string
  get name(): string
  get description(): string
}

export declare class Chapter {
  static search(
    searchParameters?:
      | string
      | {
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
          contentRating?: Array<
            'safe' | 'suggestive' | 'erotica' | 'pornographic'
          >
          ids?: string[]
          limit?: number
          offset?: number
          groups?: string[] | Group[]
          uploader?: string | User | Relationship<User>
          manga?: string | Manga | Relationship<Manga>
          volume?: string[]
          chapter?: string
        },
    includeSubObjects?: boolean
  ): Promise<Chapter[]>
  static getMultiple(
    ...ids: (string | Chapter | Relationship<Chapter>)[]
  ): Promise<Chapter[]>
  static get(id: string, includeSubObjects?: boolean): Promise<Chapter>
  static getByQuery(
    searchParameters?:
      | string
      | {
          title?: string
          createdAtSince?: string
          /**
           * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
           */
          updatedAtSince?: string
          /**
           * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
           */
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
          contentRating?: Array<
            'safe' | 'suggestive' | 'erotica' | 'pornographic'
          >
          ids?: string[]
          limit?: number
          offset?: number
          groups?: string[] | Group[]
          uploader?: string | User | Relationship<User>
          manga?: string | Manga | Relationship<Manga>
          volume?: string[]
          chapter?: string
        }
  ): Promise<Chapter>
  static changeReadMarker(id: string, read?: boolean): Promise<void>
  constructor(context: any | string)
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
  groups: Array<Relationship<Group>>
  manga: Relationship<Manga>
  uploader: Relationship<User>
  getReadablePages(saver?: boolean, forcePort?: boolean): Promise<string[]>
  changeReadMarker(read?: boolean): Promise<Chapter>
}
declare class UploadSession {
  static open(
    manga: string | Manga,
    ...groups: (string | Group | Relationship<Group>)[]
  ): UploadSession
  /**
   * Returns the currently open upload session for the logged in user.
   * Returns null if there is no current session
   * @returns {UploadSession|null}
   */
  static getCurrentSession(): UploadSession | null
  /**
   * There is no reason to directly create an upload session object. Use static methods, ie 'open()'.
   * @param {Object} res API response
   */
  constructor(res: any)
  /**
   * Id of this upload session
   * @type {String}
   */
  id: string
  /**
   * Relationship of the target manga
   * @type {Relationship<import('../index').Manga>}
   */
  manga: Relationship<Manga>
  /**
   * Relationships to the groups attributed to this chapter
   * @type {Relationship<import('../index').Group>}
   */
  groups: Relationship<Group>
  /**
   * Relationship to the uploader (the current user)
   * @type {Relationship<import('../index').User>}
   */
  uploader: Relationship<User>
  /**
   * Is this session commited?
   * @type {Boolean}
   */
  isCommitted: boolean
  /**
   * Is this session processed?
   * @type {Boolean}
   */
  isProcessed: boolean
  /**
   * Is this session deleted?
   * @type {Boolean}
   */
  isDeleted: boolean
  /**
   * Is this session open for uploading pages?
   * @type {Boolean}
   */
  open: boolean
  /**
   * The ids of every page uploaded THIS session
   * @type {String[]}
   */
  pages: string[]
  /**
   * @ignore
   * @typedef {Object} PageFileObject
   * @property {Buffer} PageFileObject.data
   * @property {'jpeg'|'png'|'gif'} [PageFileObject.type]
   * @property {String} PageFileObject.name
   */
  /**
   * Uploads pages through this upload session
   * @param {PageFileObject[]} pages
   * @returns {Promise<String[]>} Returns the ids of every newly uploaded file
   */
  uploadPages(
    pages: {
      data: Buffer
      type?: 'jpeg' | 'png' | 'gif'
      name: string
    }[]
  ): Promise<string[]>
  /**
   * Closes this upload session
   * @returns {Promise<void>}
   */
  close(): Promise<void>
  /**
   * @ignore
   * @typedef {Object} ChapterDraftObject
   * @property {String} ChapterDraftObject.volume
   * @property {String} ChapterDraftObject.chapter
   * @property {String} ChapterDraftObject.title
   * @property {String} ChapterDraftObject.translatedLanguage
   */
  /**
   * @param {ChapterDraftObject} chapterDraft
   * @param {String[]} pageOrder Array of file ids sorted by their proper order. Default is the upload order
   * @returns {Promise<Chapter>} Returns the new chapter
   */
  commit(
    chapterDraft: {
      volume: string
      chapter: string
      title: string
      translatedLanguage: string
    },
    pageOrder?: string[]
  ): Promise<Chapter>
  /**
   * Deletes an uploaded page via its upload file id.
   * @param {String} page
   * @returns {Promise<void>}
   */
  deletePage(page: string): Promise<void>
}
/**
 * Represents a custom, user-created list of manga
 * https://api.mangadex.org/docs.html#tag/CustomList
 */
export declare class List {
  /**
   * Retrieves and returns a list by its id
   * @param {String} id Mangadex id
   * @param {Boolean} [includeSubObjects=false] Attempt to resolve sub objects (eg author, artists, etc) when available through the base request
   * @returns {Promise<List>}
   */
  static get(id: string, includeSubObjects?: boolean): Promise<List>
  /**
   * Create a new custom list. Must be logged in
   * @param {String} name
   * @param {import('../index').Manga[]|String[]} manga
   * @param {'public'|'private'} [visibility='private']
   * @returns {Promise<List>}
   */
  static create(
    name: string,
    manga: Manga[] | string[],
    visibility?: 'public' | 'private'
  ): Promise<List>
  /**
   * Deletes a custom list. Must be logged in
   * @param {String} id
   * @returns {Promise<void>}
   */
  static delete(id: string): Promise<void>
  /**
   * Adds a manga to a custom list. Must be logged in
   * @param {String} listId
   * @param {import('../index').Manga|String} manga
   * @returns {Promise<void>}
   */
  static addManga(listId: string, manga: Manga | string): Promise<void>
  /**
   * Removes a manga from a custom list. Must be logged in
   * @param {String} listId
   * @param {import('../index').Manga|String} manga
   * @returns {Promise<void>}
   */
  static removeManga(listId: string, manga: Manga | string): Promise<void>
  /**
   * Returns all lists created by the logged in user.
   * @param {Number} [limit=100] Amount of lists to return (0 to Infinity)
   * @param {Number} [offset=0] How many lists to skip before returning
   * @param {Boolean} [includeSubObjects=false] Attempt to resolve sub objects (eg author, artists, etc) when available through the base request
   * @returns {Promise<List[]>}
   */
  static getLoggedInUserLists(
    limit?: number,
    offset?: number,
    includeSubObjects?: boolean
  ): Promise<List[]>
  /**
   * Returns all public lists created by a user.
   * @param {String|import('../index').User|Relationship<import('../index').User>} user
   * @param {Number} [limit=100] Amount of lists to return (0 to Infinity)
   * @param {Number} [offset=0] How many lists to skip before returning
   * @param {Boolean} [includeSubObjects=false] Attempt to resolve sub objects (eg author, artists, etc) when available through the base request
   * @returns {Promise<List[]>}
   */
  static getUserLists(
    user: string | User | Relationship<User>,
    limit?: number,
    offset?: number,
    includeSubObjects?: boolean
  ): Promise<List[]>
  /**
   * @ignore
   * @typedef {Object} FeedParameterObject
   * @property {Number} [FeedParameterObject.limit] Not limited by API limits (more than 500). Use Infinity for maximum results (use at your own risk)
   * @property {Number} [FeedParameterObject.offset]
   * @property {String[]} [FeedParameterObject.translatedLanguage]
   * @property {String} [FeedParameterObject.createdAtSince] DateTime string with following format: YYYY-MM-DDTHH:MM:SS
   * @property {String} [FeedParameterObject.updatedAtSince] DateTime string with following format: YYYY-MM-DDTHH:MM:SS
   * @property {String} [FeedParameterObject.publishAtSince] DateTime string with following format: YYYY-MM-DDTHH:MM:SS
   * @property {Object} [FeedParameterObject.order]
   * @property {'asc'|'desc'} [FeedParameterObject.order.volume]
   * @property {'asc'|'desc'} [FeedParameterObject.order.chapter]
   * @property {'asc'|'desc'} [FeedParameterObject.order.createdAt]
   * @property {'asc'|'desc'} [FeedParameterObject.order.updatedAt]
   */
  /**
   * Returns a list of the most recent chapters from the manga in a list
   * @param {String} id Mangadex id of the list
   * @param {FeedParameterObject} parameterObject Information on which chapters to be returned
   * @param {Boolean} [includeSubObjects=false] Attempt to resolve sub objects (eg author, artists, etc) when available through the base request
   * @returns {Promise<Chapter[]>}
   */
  static getFeed(
    id: string,
    parameterObject?: {
      /**
       * Not limited by API limits (more than 500). Use Infinity for maximum results (use at your own risk)
       */
      limit?: number
      offset?: number
      translatedLanguage?: string[]
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
       */
      createdAtSince?: string
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
       */
      updatedAtSince?: string
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
       */
      publishAtSince?: string
      order?: {
        volume?: 'asc' | 'desc'
        chapter?: 'asc' | 'desc'
        createdAt?: 'asc' | 'desc'
        updatedAt?: 'asc' | 'desc'
      }
    },
    includeSubObjects?: boolean
  ): Promise<Chapter[]>
  /**
   * There is no reason to directly create a custom list object. Use static methods, ie 'get()'.
   * @param {Object|String} context Either an API response or Mangadex id
   */
  constructor(context: any | string)
  id: string
  /**
   * Name of this custom list
   * @type {String}
   */
  name: string
  /**
   * Version of this custom list
   * @type {String}
   */
  version: string
  /**
   * String form of this list's visibility
   * @type {'public'|'private'}
   */
  visibility: 'public' | 'private'
  /**
   * Relationships to all of the manga in this custom list
   * @type {Array<Relationship<import('../index').Manga>>}
   */
  manga: Array<Relationship<Manga>>
  /**
   * This list's owner
   * @type {Relationship<import('../index').User>}
   */
  owner: Relationship<User>
  /**
   * Is this list public?
   * @type {Boolean}
   */
  get public(): boolean
  /**
   * Returns a list of the most recent chapters from the manga in a list
   * https://api.mangadex.org/docs.html#operation/get-list-id-feed
   * @param {FeedParameterObject} [parameterObject] Information on which chapters to be returned
   * @returns {Promise<Chapter[]>}
   */
  getFeed(parameterObject?: {
    /**
     * Not limited by API limits (more than 500). Use Infinity for maximum results (use at your own risk)
     */
    limit?: number
    offset?: number
    translatedLanguage?: string[]
    /**
     * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
     */
    createdAtSince?: string
    /**
     * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
     */
    updatedAtSince?: string
    /**
     * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
     */
    publishAtSince?: string
    order?: {
      volume?: 'asc' | 'desc'
      chapter?: 'asc' | 'desc'
      createdAt?: 'asc' | 'desc'
      updatedAt?: 'asc' | 'desc'
    }
  }): Promise<Chapter[]>
  /**
   * Delete a custom list. Must be logged in
   * @returns {Promise<void>}
   */
  delete(): Promise<void>
  /**
   * Renames a custom list. Must be logged in
   * @param {String} newName
   * @returns {Promise<List>}
   */
  rename(newName: string): Promise<List>
  /**
   * Changes the visibility a custom list. Must be logged in
   * @param {'public'|'private'} [newVis] Leave blank to toggle
   * @returns {Promise<List>}
   */
  changeVisibility(newVis?: 'public' | 'private'): Promise<List>
  /**
   * Changes the manga in a custom list. Must be logged in
   * @param {import('../index').Manga[]|String[]} newList
   * @returns {Promise<List>}
   */
  updateMangaList(newList: Manga[] | string[]): Promise<List>
  /**
   * Adds a manga to this list
   * @param {import('../index').Manga|String} manga
   * @returns {Promise<List>}
   */
  addManga(manga: Manga | string): Promise<List>
  /**
   * Removes a manga from this list
   * @param {import('../index').Manga|String} manga
   * @returns {Promise<List>}
   */
  removeManga(manga: Manga | string): Promise<List>
}
/**
 * Represents a manga object
 * https://api.mangadex.org/docs.html#tag/Manga
 */
export declare class Manga {
  static search(
    searchParameters?:
      | string
      | {
          title?: string
          year?: number
          includedTagsMode?: 'AND' | 'OR'
          excludedTagsMode?: 'AND' | 'OR'
          createdAtSince?: string
          updatedAtSince?: string
          order?: {
            createdAt?: 'asc' | 'desc'
            updatedAt?: 'asc' | 'desc'
            title?: 'asc' | 'desc'
            latestUploadedChapter?: 'asc' | 'desc'
            followedCount?: 'asc' | 'desc'
            relevance?: 'asc' | 'desc'
            year?: 'asc' | 'desc'
          }
          authors?: string[] | Author[]
          artists?: string[] | Author[]
          includedTags?: string[] | Tag[]
          excludedTags?: string[] | Tag[]
          status?: Array<'ongoing' | 'completed' | 'hiatus' | 'cancelled'>
          originalLanguage?: string[]
          excludedOriginalLanguage?: string[]
          availableTranslatedLanguage?: string[]
          publicationDemographic?: Array<
            'shounen' | 'shoujo' | 'josei' | 'seinen' | 'none'
          >
          ids?: string[]
          contentRating?: Array<
            'safe' | 'suggestive' | 'erotica' | 'pornographic'
          >
          hasAvailableChapters?: boolean
          group?: string
          limit?: number
          offset?: number
        },
    includeSubObjects?: boolean
  ): Promise<Manga[]>
  /**
   * Returns the total amount of search results for a specific query
   * @param {MangaParameterObject|String} [searchParameters] An object of offical search parameters, or a string representing the title
   * @returns {Promise<Number>}
   */
  static getTotalSearchResults(
    searchParameters?:
      | string
      | {
          title?: string
          year?: number
          includedTagsMode?: 'AND' | 'OR'
          excludedTagsMode?: 'AND' | 'OR'
          /**
           * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
           */
          createdAtSince?: string
          /**
           * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
           */
          updatedAtSince?: string
          order?: {
            createdAt?: 'asc' | 'desc'
            updatedAt?: 'asc' | 'desc'
            title?: 'asc' | 'desc'
            latestUploadedChapter?: 'asc' | 'desc'
            followedCount?: 'asc' | 'desc'
            relevance?: 'asc' | 'desc'
            year?: 'asc' | 'desc'
          }
          /**
           * Array of author ids
           */
          authors?: string[] | Author[]
          /**
           * Array of artist ids
           */
          artists?: string[] | Author[]
          includedTags?: string[] | Tag[]
          excludedTags?: string[] | Tag[]
          status?: Array<'ongoing' | 'completed' | 'hiatus' | 'cancelled'>
          originalLanguage?: string[]
          excludedOriginalLanguage?: string[]
          availableTranslatedLanguage?: string[]
          publicationDemographic?: Array<
            'shounen' | 'shoujo' | 'josei' | 'seinen' | 'none'
          >
          /**
           * Max of 100 per request
           */
          ids?: string[]
          contentRating?: Array<
            'safe' | 'suggestive' | 'erotica' | 'pornographic'
          >
          hasAvailableChapters?: boolean
          /**
           * Group id
           */
          group?: string
          /**
           * Not limited by API limits (more than 100). Use Infinity for maximum results (use at your own risk)
           */
          limit?: number
          offset?: number
        }
  ): Promise<number>
  /**
   * Creates a manga.
   * @param {LocalizedString | Object} [title] The title of the manga.
   * @param {string} [originalLanguage] The original language of the manga.
   * @param {'ongoing'|'completed'|'hiatus'|'cancelled'} [status] The status of the manga.
   * @param {'safe'|'suggestive'|'erotica'|'pornographic'} [contentRating] The content rating of the manga.
   * @param {Object | undefined} [options] Additional options for creating the manga.
   * @returns {Promise<Manga>}
   */
  static create(
    title?: LocalizedString | any,
    originalLanguage?: string,
    status?: 'ongoing' | 'completed' | 'hiatus' | 'cancelled',
    contentRating?: 'safe' | 'suggestive' | 'erotica' | 'pornographic',
    options?: any | undefined
  ): Promise<Manga>
  /**
   * Gets multiple manga
   * @param {...String|Relationship<Manga>} ids
   * @returns {Promise<Manga[]>}
   */
  static getMultiple(...ids: (string | Relationship<Manga>)[]): Promise<Manga[]>
  /**
   * Retrieves and returns a manga by its id
   * @param {String} id Mangadex id
   * @param {Boolean} [includeSubObjects=false] Attempt to resolve sub objects (eg author, artists, etc) when available through the base request
   * @returns {Promise<Manga>}
   */
  static get(id: string, includeSubObjects?: boolean): Promise<Manga>
  /**
   * Performs a search for one manga and returns that manga
   * @param {MangaParameterObject|String} [searchParameters] An object of offical search parameters, or a string representing the title
   * @param {Boolean} [includeSubObjects=false] Attempt to resolve sub objects (eg author, artists, etc) when available through the base request
   * @returns {Promise<Manga>}
   */
  static getByQuery(
    searchParameters?:
      | string
      | {
          title?: string
          year?: number
          includedTagsMode?: 'AND' | 'OR'
          excludedTagsMode?: 'AND' | 'OR'
          /**
           * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
           */
          createdAtSince?: string
          /**
           * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
           */
          updatedAtSince?: string
          order?: {
            createdAt?: 'asc' | 'desc'
            updatedAt?: 'asc' | 'desc'
            title?: 'asc' | 'desc'
            latestUploadedChapter?: 'asc' | 'desc'
            followedCount?: 'asc' | 'desc'
            relevance?: 'asc' | 'desc'
            year?: 'asc' | 'desc'
          }
          /**
           * Array of author ids
           */
          authors?: string[] | Author[]
          /**
           * Array of artist ids
           */
          artists?: string[] | Author[]
          includedTags?: string[] | Tag[]
          excludedTags?: string[] | Tag[]
          status?: Array<'ongoing' | 'completed' | 'hiatus' | 'cancelled'>
          originalLanguage?: string[]
          excludedOriginalLanguage?: string[]
          availableTranslatedLanguage?: string[]
          publicationDemographic?: Array<
            'shounen' | 'shoujo' | 'josei' | 'seinen' | 'none'
          >
          /**
           * Max of 100 per request
           */
          ids?: string[]
          contentRating?: Array<
            'safe' | 'suggestive' | 'erotica' | 'pornographic'
          >
          hasAvailableChapters?: boolean
          /**
           * Group id
           */
          group?: string
          /**
           * Not limited by API limits (more than 100). Use Infinity for maximum results (use at your own risk)
           */
          limit?: number
          offset?: number
        },
    includeSubObjects?: boolean
  ): Promise<Manga>
  /**
   * @ignore
   * @typedef {Object} FeedParameterObject
   * @property {Number} [FeedParameterObject.limit] Not limited by API limits (more than 500). Use Infinity for maximum results (use at your own risk)
   * @property {Number} [FeedParameterObject.offset]
   * @property {String[]} [FeedParameterObject.translatedLanguage]
   * @property {String} [FeedParameterObject.createdAtSince] DateTime string with following format: YYYY-MM-DDTHH:MM:SS
   * @property {String} [FeedParameterObject.updatedAtSince] DateTime string with following format: YYYY-MM-DDTHH:MM:SS
   * @property {String} [FeedParameterObject.publishAtSince] DateTime string with following format: YYYY-MM-DDTHH:MM:SS
   * @property {Object} [FeedParameterObject.order]
   * @property {'asc'|'desc'} [FeedParameterObject.order.volume]
   * @property {'asc'|'desc'} [FeedParameterObject.order.chapter]
   * @property {'asc'|'desc'} [FeedParameterObject.order.createdAt]
   * @property {'asc'|'desc'} [FeedParameterObject.order.updatedAt]
   * @property {'asc'|'desc'} [FeedParameterObject.order.publishAt]
   */
  /**
   * Returns a feed of chapters for a manga
   * @param {String} id
   * @param {FeedParameterObject|Number} [parameterObject] Either a parameter object or a number representing the limit
   * @param {Boolean} [includeSubObjects=false] Attempt to resolve sub objects (eg author, artists, etc) when available through the base request
   * @returns {Promise<Chapter[]>}
   */
  static getFeed(
    id: string,
    parameterObject?:
      | number
      | {
          /**
           * Not limited by API limits (more than 500). Use Infinity for maximum results (use at your own risk)
           */
          limit?: number
          offset?: number
          translatedLanguage?: string[]
          /**
           * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
           */
          createdAtSince?: string
          /**
           * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
           */
          updatedAtSince?: string
          /**
           * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
           */
          publishAtSince?: string
          order?: {
            volume?: 'asc' | 'desc'
            chapter?: 'asc' | 'desc'
            createdAt?: 'asc' | 'desc'
            updatedAt?: 'asc' | 'desc'
            publishAt?: 'asc' | 'desc'
          }
        },
    includeSubObjects?: boolean
  ): Promise<Chapter[]>
  /**
   * Returns one random manga
   * @param {Array<'safe' | 'suggestive' | 'erotica' | 'pornographic'>} [contentRatings] Allowed content ratings for the random manga
   * @param {Boolean} [includeSubObjects=false] Attempt to resolve sub objects (eg author, artists, etc) when available through the base request
   * @returns {Promise<Manga>}
   */
  static getRandom(
    contentRatings?: Array<'safe' | 'suggestive' | 'erotica' | 'pornographic'>,
    includeSubObjects?: boolean
  ): Promise<Manga>
  /**
   * Returns all manga followed by the logged in user
   * @param {Number} [limit=100] Amount of manga to return (0 to Infinity)
   * @param {Number} [offset=0] How many manga to skip before returning
   * @returns {Promise<Manga[]>}
   */
  static getFollowedManga(limit?: number, offset?: number): Promise<Manga[]>
  /**
   * Retrieves a tag object based on its id or name ('Oneshot', 'Thriller,' etc).
   * The result of every available tag is cached, so subsequent tag requests will have no delay
   * https://api.mangadex.org/docs.html#operation/get-manga-tag
   * @param {String} indentity
   * @returns {Promise<Tag>}
   */
  static getTag(indentity: string): Promise<Tag>
  /**
   * Returns an array of every tag available on Mangadex right now.
   * The result is cached, so subsequent tag requests will have no delay
   * https://api.mangadex.org/docs.html#operation/get-manga-tag
   * @returns {Promise<Tag[]>}
   */
  static getAllTags(): Promise<Tag[]>
  /**
   * Retrieves the logged in user's reading status for a manga.
   * If there is no status, null is returned
   * @param {String} id
   * @returns {Promise<'reading'|'on_hold'|'plan_to_read'|'dropped'|'re_reading'|'completed'>}
   */
  static getReadingStatus(
    id: string
  ): Promise<
    | 'reading'
    | 'on_hold'
    | 'plan_to_read'
    | 'dropped'
    | 're_reading'
    | 'completed'
  >
  /**
   * Sets the logged in user's reading status for this manga.
   * Call without arguments to clear the reading status
   * @param {String} id
   * @param {'reading'|'on_hold'|'plan_to_read'|'dropped'|'re_reading'|'completed'} [status]
   * @returns {Promise<void>}
   */
  static setReadingStatus(
    id: string,
    status?:
      | 'reading'
      | 'on_hold'
      | 'plan_to_read'
      | 'dropped'
      | 're_reading'
      | 'completed'
  ): Promise<void>
  /**
   * Returns the reading status for every manga for this logged in user as an object with Manga ids as keys
   * @returns {Object.<string, 'reading'|'on_hold'|'plan_to_read'|'dropped'|'re_reading'|'completed'>}
   */
  static getAllReadingStatuses(): {
    [x: string]:
      | 'reading'
      | 'on_hold'
      | 'plan_to_read'
      | 'dropped'
      | 're_reading'
      | 'completed'
  }
  /**
   * Gets the combined feed of every manga followed by the logged in user
   * @param {FeedParameterObject|Number} [parameterObject] Either a parameter object or a number representing the limit
   * @param {Boolean} [includeSubObjects=false] Attempt to resolve sub objects (eg author, artists, etc) when available through the base request
   * @returns {Promise<Chapter[]>}
   */
  static getFollowedFeed(
    parameterObject?:
      | number
      | {
          /**
           * Not limited by API limits (more than 500). Use Infinity for maximum results (use at your own risk)
           */
          limit?: number
          offset?: number
          translatedLanguage?: string[]
          /**
           * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
           */
          createdAtSince?: string
          /**
           * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
           */
          updatedAtSince?: string
          /**
           * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
           */
          publishAtSince?: string
          order?: {
            volume?: 'asc' | 'desc'
            chapter?: 'asc' | 'desc'
            createdAt?: 'asc' | 'desc'
            updatedAt?: 'asc' | 'desc'
            publishAt?: 'asc' | 'desc'
          }
        },
    includeSubObjects?: boolean
  ): Promise<Chapter[]>
  /**
   * Makes the logged in user either follow or unfollow a manga
   * @param {String} id
   * @param {Boolean} [follow=true] True to follow, false to unfollow
   * @returns {Promise<void>}
   */
  static changeFollowship(id: string, follow?: boolean): Promise<void>
  /**
   * Retrieves the read chapters for multiple manga
   * @param  {...String|Manga|Relationship<Manga>} ids
   * @returns {Promise<Chapter[]>}
   */
  static getReadChapters(
    ...ids: (string | Manga | Relationship<Manga>)[]
  ): Promise<Chapter[]>
  /**
   * Returns all covers for a manga
   * @param {...String|Manga|Relationship<Manga>} id Manga id(s)
   * @returns {Promise<Cover[]>}
   */
  static getCovers(
    ...id: (string | Manga | Relationship<Manga>)[]
  ): Promise<Cover[]>
  /**
   * @ignore
   * @typedef {Object} AggregateChapter
   * @property {String} AggregateChapter.chapter
   * @property {Number} AggregateChapter.count
   * @property {String} AggregateChapter.id
   * @property {String[]} AggregateChapter.others
   */
  /**
   * @ignore
   * @typedef {Object} AggregateVolume
   * @property {String} AggregateVolume.volume
   * @property {Number} AggregateVolume.count
   * @property {Object.<string, AggregateChapter>} AggregateVolume.chapters
   */
  /**
   * Returns a summary of every chapter for a manga including each of their numbers and volumes they belong to
   * https://api.mangadex.org/docs.html#operation/post-manga
   * @param {String} id
   * @param {...String|String[]} languages
   * @returns {Promise<Object.<string, AggregateVolume>>}
   */
  static getAggregate(
    id: string,
    ...languages: (string | string[])[]
  ): Promise<{
    [x: string]: {
      volume: string
      count: number
      chapters: {
        [x: string]: {
          chapter: string
          count: number
          id: string
          others: string[]
        }
      }
    }
  }>
  /**
   * Creates a new upload session with a manga as the target
   * @param {String} id
   * @param {...String|import('../index').Group} groups
   * @returns {Promise<UploadSession>}
   */
  static createUploadSession(
    id: string,
    ...groups: (string | Group)[]
  ): Promise<UploadSession>
  /**
   * Returns the currently open upload session for the logged in user.
   * Returns null if there is no current session
   * @returns {Promise<UploadSession>}
   */
  static getCurrentUploadSession(): Promise<UploadSession>
  /**
   * @ignore
   * @typedef {Object} Statistics
   * @property {Number} Statistics.follows
   * @property {Object} Statistics.rating
   * @property {Number} Statistics.rating.average
   * @property {Object.<string, number>} Statistics.rating.distribution
   */
  /**
   * Returns the rating and follow count of a manga
   * @param {String} id
   * @returns {Statistics}
   */
  static getStatistics(id: string): {
    follows: number
    rating: {
      average: number
      distribution: {
        [x: string]: number
      }
    }
  }
  /**
   * There is no reason to directly create a manga object. Use static methods, ie 'get()'.
   * @param {Object|String} context Either an API response or Mangadex id
   */
  constructor(context: any | string)
  id: string
  /**
   * Main title with different localization options
   * @type {LocalizedString}
   */
  localizedTitle: LocalizedString
  /**
   * Alt titles with different localization options
   * @type {LocalizedString[]}
   */
  localizedAltTitles: LocalizedString[]
  /**
   * Description with different localization options
   * @type {LocalizedString}
   */
  localizedDescription: LocalizedString
  /**
   * Is this Manga locked?
   * @type {Boolean}
   */
  isLocked: boolean
  /**
   * Link object representing links to other websites about this manga
   * https://api.mangadex.org/docs.html#section/Static-data/Manga-links-data
   * @type {Links}
   */
  links: Links
  /**
   * 2-letter code for the original language of this manga
   * @type {String}
   */
  originalLanguage: string
  /**
   * This manga's last volume based on the default feed order
   * @type {String}
   */
  lastVolume: string
  /**
   * This manga's last chapter based on the default feed order
   * @type {String}
   */
  lastChapter: string
  /**
   * Publication demographic of this manga
   * https://api.mangadex.org/docs.html#section/Static-data/Manga-publication-demographic
   * @type {'shounen'|'shoujo'|'josei'|'seinen'}
   */
  publicationDemographic: 'shounen' | 'shoujo' | 'josei' | 'seinen'
  /**
   * Publication/Scanlation status of this manga
   * @type {'ongoing'|'completed'|'hiatus'|'cancelled'}
   */
  status: 'ongoing' | 'completed' | 'hiatus' | 'cancelled'
  /**
   * Year of this manga's publication
   * @type {Number}
   */
  year: number
  /**
   * The content rating of this manga
   * @type {'safe'|'suggestive'|'erotica'|'pornographic'}
   */
  contentRating: 'safe' | 'suggestive' | 'erotica' | 'pornographic'
  /**
   * The date of this manga's page creation
   * @type {Date}
   */
  createdAt: Date
  /**
   * The date the manga was last updated
   * @type {Date}
   */
  updatedAt: Date
  /**
   * Authors attributed to this manga
   * @type {Array<Relationship<import('../index').Author>>}
   */
  authors: Array<Relationship<Author>>
  /**
   * Artists attributed to this manga
   * @type {Array<Relationship<import('../index').Author>>}
   */
  artists: Array<Relationship<Author>>
  /**
   * This manga's main cover. Use 'getCovers' to retrive other covers
   * @type {Relationship<Cover>}
   */
  mainCover: Relationship<Cover>
  /**
   * Array of tags for this manga
   * @type {Tag[]}
   */
  tags: Tag[]
  /**
   * @ignore
   * @typedef {Object} RelatedMangaObject
   * @property {Manga[]} RelatedMangaObject.monochrome
   * @property {Manga[]} RelatedMangaObject.main_story
   * @property {Manga[]} RelatedMangaObject.adapted_from
   * @property {Manga[]} RelatedMangaObject.based_on
   * @property {Manga[]} RelatedMangaObject.prequel
   * @property {Manga[]} RelatedMangaObject.side_story
   * @property {Manga[]} RelatedMangaObject.doujinshi
   * @property {Manga[]} RelatedMangaObject.same_franchise
   * @property {Manga[]} RelatedMangaObject.shared_universe
   * @property {Manga[]} RelatedMangaObject.sequel
   * @property {Manga[]} RelatedMangaObject.spin_off
   * @property {Manga[]} RelatedMangaObject.alternate_story
   * @property {Manga[]} RelatedMangaObject.preserialization
   * @property {Manga[]} RelatedMangaObject.colored
   * @property {Manga[]} RelatedMangaObject.serialization
   */
  /**
   * @type {RelatedMangaObject}
   */
  relatedManga: {
    monochrome: Manga[]
    main_story: Manga[]
    adapted_from: Manga[]
    based_on: Manga[]
    prequel: Manga[]
    side_story: Manga[]
    doujinshi: Manga[]
    same_franchise: Manga[]
    shared_universe: Manga[]
    sequel: Manga[]
    spin_off: Manga[]
    alternate_story: Manga[]
    preserialization: Manga[]
    colored: Manga[]
    serialization: Manga[]
  }
  /**
   * The version of this manga (incremented by updating manga data)
   * @type {Number}
   */
  version: number
  /**
   * Does this manga's chapter numbers reset on a new volume?
   * @type {Boolean}
   */
  chapterNumbersResetOnNewVolume: boolean
  /**
   * An array of locale strings that represent the languages this manga is available in
   * @type {String[]}
   */
  availableTranslatedLanguages: string[]
  /**
   * The state of this manga's publication
   * @type {string}
   */
  state: string
  /**
   * The latest uploaded chapter for this manga
   * @type {Relationship<Chapter>}
   */
  latestUploadedChapter: Relationship<Chapter>
  /**
   * Main title string based on global locale
   * @type {String}
   */
  get title(): string
  /**
   * Alt titles array based on global locale
   * @type {String[]}
   */
  get altTitles(): string[]
  /**
   * Description string based on global locale
   * @type {String}
   */
  get description(): string
  getStatistics(): {
    follows: number
    rating: {
      average: number
      distribution: {
        [x: string]: number
      }
    }
  }
  /**
   * Creates a new upload session with this manga as the target
   * @param {...String|import('../index').Group} groups
   * @returns {Promise<UploadSession>}
   */
  createUploadSession(...groups: (string | Group)[]): Promise<UploadSession>
  /**
   * Returns all covers for this manga
   * @returns {Promise<Cover[]>}
   */
  getCovers(): Promise<Cover[]>
  /**
   * Returns a feed of this manga's chapters.
   * @param {FeedParameterObject|Number} [parameterObject] Either a parameter object or a number representing the limit
   * @param {Boolean} [includeSubObjects=false] Attempt to resolve sub objects (eg author, artists, etc) when available through the base request
   * @returns {Promise<Chapter[]>}
   */
  getFeed(
    parameterObject?:
      | number
      | {
          /**
           * Not limited by API limits (more than 500). Use Infinity for maximum results (use at your own risk)
           */
          limit?: number
          offset?: number
          translatedLanguage?: string[]
          /**
           * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
           */
          createdAtSince?: string
          /**
           * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
           */
          updatedAtSince?: string
          /**
           * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
           */
          publishAtSince?: string
          order?: {
            volume?: 'asc' | 'desc'
            chapter?: 'asc' | 'desc'
            createdAt?: 'asc' | 'desc'
            updatedAt?: 'asc' | 'desc'
            publishAt?: 'asc' | 'desc'
          }
        },
    includeSubObjects?: boolean
  ): Promise<Chapter[]>
  /**
   * Adds this manga to a list
   * @param {List|String} list
   * @returns {Promise<void>}
   */
  addToList(list: List | string): Promise<void>
  /**
   * Retrieves the logged in user's reading status for this manga.
   * If there is no status, null is returned
   * @returns {Promise<'reading'|'on_hold'|'plan_to_read'|'dropped'|'re_reading'|'completed'>}
   */
  getReadingStatus(): Promise<
    | 'reading'
    | 'on_hold'
    | 'plan_to_read'
    | 'dropped'
    | 're_reading'
    | 'completed'
  >
  /**
   * Sets the logged in user's reading status for this manga.
   * Call without arguments to clear the reading status
   * @param {'reading'|'on_hold'|'plan_to_read'|'dropped'|'re_reading'|'completed'} [status]
   * @returns {Promise<Manga>}
   */
  setReadingStatus(
    status?:
      | 'reading'
      | 'on_hold'
      | 'plan_to_read'
      | 'dropped'
      | 're_reading'
      | 'completed'
  ): Promise<Manga>
  /**
   * Makes the logged in user either follow or unfollow this manga
   * @param {Boolean} [follow=true] True to follow, false to unfollow
   * @returns {Promise<Manga>}
   */
  changeFollowship(follow?: boolean): Promise<Manga>
  /**
   * Returns an array of every chapter that has been marked as read for this manga
   * @returns {Promise<Chapter[]>}
   */
  getReadChapters(): Promise<Chapter[]>
  /**
   * Returns a summary of every chapter for this manga including each of their numbers and volumes they belong to
   * https://api.mangadex.org/docs.html#operation/post-manga
   * @param {...String} languages
   * @returns {Promise<Object.<string, AggregateVolume>>}
   */
  getAggregate(...languages: string[]): Promise<{
    [x: string]: {
      volume: string
      count: number
      chapters: {
        [x: string]: {
          chapter: string
          count: number
          id: string
          others: string[]
        }
      }
    }
  }>
  /**
   * Updates a manga's information using the information stored in the model and returns a new Manga.
   * @returns {Promise<Manga>}
   */
  update(): Promise<Manga>
}
/**
 * Represents an author or artist
 * https://api.mangadex.org/docs.html#tag/Author
 */
export declare class Author {
  /**
   * @ignore
   * @typedef {Object} AuthorParameterObject
   * @property {String} [AuthorParameterObject.name]
   * @property {String[]} [AuthorParameterObject.ids] Max of 100 per request
   * @property {Number} [AuthorParameterObject.limit] Not limited by API limits (more than 100). Use Infinity for maximum results (use at your own risk)
   * @property {Number} [AuthorParameterObject.offset]
   * @property {Object} [AuthorParameterObject.order]
   * @property {'asc'|'desc'} [AuthorParameterObject.order.name]
   */
  /**
   * Peforms a search and returns an array of a authors/artists.
   * https://api.mangadex.org/docs.html#operation/get-author
   * @param {AuthorParameterObject|String} [searchParameters] An object of offical search parameters, or a string representing the name
   * @param {Boolean} [includeSubObjects=false] Attempt to resolve sub objects (eg author, artists, etc) when available through the base request
   * @returns {Promise<Author[]>}
   */
  static search(
    searchParameters?:
      | string
      | {
          name?: string
          /**
           * Max of 100 per request
           */
          ids?: string[]
          /**
           * Not limited by API limits (more than 100). Use Infinity for maximum results (use at your own risk)
           */
          limit?: number
          offset?: number
          order?: {
            name?: 'asc' | 'desc'
          }
        },
    includeSubObjects?: boolean
  ): Promise<Author[]>
  /**
   * Create a new Author.
   * @param {string} [name] The name of the author.
   * @param {Object | undefined} [options] Additional arguments to pass to the API.
   * @returns {Promise<Author>}
   */
  static create(name?: string, options?: any | undefined): Promise<Author>
  /**
   * Gets multiple authors
   * @param {...String|Author|Relationship<Author>} ids
   * @returns {Promise<Author[]>}
   */
  static getMultiple(
    ...ids: (string | Author | Relationship<Author>)[]
  ): Promise<Author[]>
  /**
   * Retrieves and returns a author by its id
   * @param {String} id Mangadex id
   * @param {Boolean} [includeSubObjects=false] Attempt to resolve sub objects (eg author, artists, etc) when available through the base request
   * @returns {Promise<Author>}
   */
  static get(id: string, includeSubObjects?: boolean): Promise<Author>
  /**
   * Performs a search for one author and returns that author
   * @param {AuthorParameterObject|String} [searchParameters] An object of offical search parameters, or a string representing the name
   * @returns {Promise<Author>}
   */
  static getByQuery(
    searchParameters?:
      | string
      | {
          name?: string
          /**
           * Max of 100 per request
           */
          ids?: string[]
          /**
           * Not limited by API limits (more than 100). Use Infinity for maximum results (use at your own risk)
           */
          limit?: number
          offset?: number
          order?: {
            name?: 'asc' | 'desc'
          }
        }
  ): Promise<Author>
  /**
   * There is no reason to directly create an author object. Use static methods, ie 'get()'.
   * @param {Object|String} context Either an API response or Mangadex id
   */
  constructor(context: any | string)
  id: string
  /**
   * Name of this author/artist
   * @type {String}
   */
  name: string
  /**
   * Image URL for this author/artist
   * @type {String}
   */
  imageUrl: string
  /**
   * Author/Artist biography
   * @type {String[]}
   */
  biography: string[]
  /**
   * The date of this author/artist page creation
   * @type {Date}
   */
  createdAt: Date
  /**
   * The date the author/artist was last updated
   * @type {Date}
   */
  updatedAt: Date
  /**
   * Manga this author/artist has been attributed to
   * @type {Array<Relationship<import('../index').Manga>>}
   */
  manga: Array<Relationship<Manga>>
}
/**
 * Represents a scanlation group
 * https://api.mangadex.org/docs.html#tag/Group
 */
export declare class Group {
  /**
   * @ignore
   * @typedef {Object} GroupParameterObject
   * @property {String} [GroupParameterObject.name]
   * @property {String} [GroupParameterObject.name]
   * @property {String} [GroupParameterObject.focusedLanguage]
   * @property {Object} [GroupParameterObject.order]
   * @property {'asc'|'desc'} [GroupParameterObject.order.createdAt]
   * @property {'asc'|'desc'} [GroupParameterObject.order.updatedAt]
   * @property {'asc'|'desc'} [GroupParameterObject.order.name]
   * @property {'asc'|'desc'} [GroupParameterObject.order.followedCount]
   * @property {'asc'|'desc'} [GroupParameterObject.order.relevance]
   * @property {String[]} [GroupParameterObject.ids] Max of 100 per request
   * @property {Number} [GroupParameterObject.limit] Not limited by API limits (more than 100). Use Infinity for maximum results (use at your own risk)
   * @property {Number} [GroupParameterObject.offset]
   */
  /**
   * Peforms a search and returns an array of groups.
   * https://api.mangadex.org/docs.html#operation/get-search-group
   * @param {GroupParameterObject|String} [searchParameters] An object of offical search parameters, or a string representing the name
   * @param {Boolean} [includeSubObjects=false] Attempt to resolve sub objects (eg author, artists, etc) when available through the base request
   * @returns {Promise<Group[]>}
   */
  static search(
    searchParameters?:
      | string
      | {
          name?: string
          focusedLanguage?: string
          order?: {
            createdAt?: 'asc' | 'desc'
            updatedAt?: 'asc' | 'desc'
            name?: 'asc' | 'desc'
            followedCount?: 'asc' | 'desc'
            relevance?: 'asc' | 'desc'
          }
          /**
           * Max of 100 per request
           */
          ids?: string[]
          /**
           * Not limited by API limits (more than 100). Use Infinity for maximum results (use at your own risk)
           */
          limit?: number
          offset?: number
        },
    includeSubObjects?: boolean
  ): Promise<Group[]>
  /**
   * Gets multiple groups
   * @param {...String|Group|Relationship<Group>} ids
   * @returns {Promise<Group[]>}
   */
  static getMultiple(
    ...ids: (string | Group | Relationship<Group>)[]
  ): Promise<Group[]>
  /**
   * Retrieves and returns a group by its id
   * @param {String} id Mangadex id
   * @param {Boolean} [includeSubObjects=false] Attempt to resolve sub objects (eg author, artists, etc) when available through the base request
   * @returns {Promise<Group>}
   */
  static get(id: string, includeSubObjects?: boolean): Promise<Group>
  /**
   * Performs a search for one group and returns that group
   * @param {GroupParameterObject|String} [searchParameters] An object of offical search parameters, or a string representing the name
   * @returns {Promise<Group>}
   */
  static getByQuery(
    searchParameters?:
      | string
      | {
          name?: string
          focusedLanguage?: string
          order?: {
            createdAt?: 'asc' | 'desc'
            updatedAt?: 'asc' | 'desc'
            name?: 'asc' | 'desc'
            followedCount?: 'asc' | 'desc'
            relevance?: 'asc' | 'desc'
          }
          /**
           * Max of 100 per request
           */
          ids?: string[]
          /**
           * Not limited by API limits (more than 100). Use Infinity for maximum results (use at your own risk)
           */
          limit?: number
          offset?: number
        }
  ): Promise<Group>
  /**
   * Returns all groups followed by the logged in user
   * @param {Number} [limit=100] Amount of groups to return (0 to Infinity)
   * @param {Number} [offset=0] How many groups to skip before returning
   * @returns {Promise<Group[]>}
   */
  static getFollowedGroups(limit?: number, offset?: number): Promise<Group[]>
  /**
   * Makes the logged in user either follow or unfollow a group
   * @param {String} id
   * @param {Boolean} [follow=true] True to follow, false to unfollow
   * @returns {Promise<void>}
   */
  static changeFollowship(id: string, follow?: boolean): Promise<void>
  /**
   * There is no reason to directly create a group object. Use static methods, ie 'get()'.
   * @param {Object|String} context Either an API response or Mangadex id
   */
  constructor(context: any | string)
  id: string
  /**
   * Name of this group
   * @type {String}
   */
  name: string
  /**
   * The date of this group's creation
   * @type {Date}
   */
  createdAt: Date
  /**
   * The date the group was last updated
   * @type {Date}
   */
  updatedAt: Date
  /**
   * Is this group locked?
   * @type {Boolean}
   */
  locked: boolean
  /**
   * Website URL for this group
   * @type {String}
   */
  website: string
  /**
   * IRC Server for this group
   * @type {String}
   */
  ircServer: string
  /**
   * IRC Channel for this group
   * @type {String}
   */
  ircChannel: string
  /**
   * Discord Invite Code for this group
   * @type {String}
   */
  discord: string
  /**
   * Email for this group
   * @type {String}
   */
  contactEmail: string
  /**
   * This group's twitter
   * @type {String}
   */
  twitter: string
  /**
   * This group's manga updates page
   * @type {String}
   */
  mangaUpdates: string
  /**
   * This group's focused languages
   * @type {String[]}
   */
  focusedLanguages: string[]
  /**
   * This group's publish delay
   * @type {Number}
   */
  publishDelay: number
  /**
   * Is this group inactive?
   * @type {Boolean}
   */
  inactive: boolean
  /**
   * The group's custom description
   * @type {String}
   */
  description: string
  /**
   * Is this group an official publisher?
   * @type {Boolean}
   */
  official: boolean
  /**
   * Is this group managed by an official publisher?
   * @type {Boolean}
   */
  verified: boolean
  /**
   * This group's leader
   * @type {Relationship<import('../index').User>}
   */
  leader: Relationship<User>
  /**
   * Array of this group's members
   * @type {Array<Relationship<import('../index').User>>}
   */
  members: Array<Relationship<User>>
  /**
   * Makes the logged in user either follow or unfollow this group
   * @param {Boolean} [follow=true] True to follow, false to unfollow
   * @returns {Promise<Group>}
   */
  changeFollowship(follow?: boolean): Promise<Group>
}
/**
 * Represents an user
 * https://api.mangadex.org/docs.html#tag/User
 */
export declare class User {
  /**
   * @ignore
   * @typedef {Object} UserParameterObject
   * @property {String} [UserParameterObject.username]
   * @property {String[]} [UserParameterObject.ids] Max of 100 per request
   * @property {Number} [UserParameterObject.limit] Not limited by API limits (more than 100). Use Infinity for maximum results (use at your own risk)
   * @property {Number} [UserParameterObject.offset]
   * @property {Object} [UserParameterObject.order]
   * @property {'asc'|'desc'} [UserParameterObject.order.username]
   */
  /**
   * Peforms a search and returns an array of users. Requires authorization
   * https://api.mangadex.org/docs.html#operation/get-user
   * @param {UserParameterObject|String} [searchParameters] An object of offical search parameters, or a string representing the username
   * @returns {Promise<User[]>}
   */
  static search(
    searchParameters?:
      | string
      | {
          username?: string
          /**
           * Max of 100 per request
           */
          ids?: string[]
          /**
           * Not limited by API limits (more than 100). Use Infinity for maximum results (use at your own risk)
           */
          limit?: number
          offset?: number
          order?: {
            username?: 'asc' | 'desc'
          }
        }
  ): Promise<User[]>
  /**
   * Gets multiple users
   * @param {...String|Relationship<User>} ids
   * @returns {Promise<User[]>}
   */
  static getMultiple(...ids: (string | Relationship<User>)[]): Promise<User[]>
  /**
   * Retrieves and returns a user by its id
   * @param {String} id Mangadex id
   * @returns {Promise<User>}
   */
  static get(id: string): Promise<User>
  /**
   * Returns all users followed by the logged in user
   * @param {Number} [limit=100] Amount of users to return (0 to Infinity)
   * @param {Number} [offset=0] How many users to skip before returning
   * @returns {Promise<User[]>}
   */
  static getFollowedUsers(limit?: number, offset?: number): Promise<User[]>
  /**
   * Returns the logged in user as a user object
   * @returns {Promise<User>}
   */
  static getLoggedInUser(): Promise<User>
  /**
   * Makes the logged in user either follow or unfollow a user
   * @param {String} id
   * @param {Boolean} [follow=true] True to follow, false to unfollow
   * @returns {Promise<void>}
   */
  static changeFollowship(id: string, follow?: boolean): Promise<void>
  /**
   * There is no reason to directly create a user object. Use static methods, ie 'get()'.
   * @param {Object|String} context Either an API response or Mangadex id
   */
  constructor(context: any | string)
  id: string
  /**
   * Username of this user
   * @type {String}
   */
  username: string
  /**
   * The roles of this user such as "ROLE_MD_AT_HOME" and "ROLE_ADMIN"
   * @type {String[]}
   */
  roles: string[]
  /**
   * Groups this user is a part of
   * @type {Array<Relationship<import('../index').Group>>}
   */
  groups: Array<Relationship<Group>>
  /**
   * Makes the logged in user either follow or unfollow this user
   * @param {Boolean} [follow=true] True to follow, false to unfollow
   * @returns {Promise<User>}
   */
  changeFollowship(follow?: boolean): Promise<User>
}
/**
 * Converts old (pre v5, numeric ids) Mangadex ids to v5 ids.
 * Any invalid legacy ids will be skipped by Mangadex when remapping, so
 * call this function for each individual id if this is an issue.
 * @param {'group'|'manga'|'chapter'|'tag'} type Type of id
 * @param {...Number|Number[]} ids Array of ids to convert
 * @returns {Promise<String[]>}
 */
export function convertLegacyId(
  type: 'group' | 'manga' | 'chapter' | 'tag',
  ...ids: (number | number[])[]
): Promise<string[]>
/**
 * Sets the global locaization for LocalizedStrings.
 * Uses 2-letter Mangadex region codes.
 * @param {String} newLocale
 */
export function setGlobalLocale(newLocale: string): void
/**
 * Required for authorization
 * https://api.mangadex.org/docs.html#operation/post-auth-login
 * @param {String} username
 * @param {String} password
 * @param {String} [cacheLocation] File location (or localStorage key for browsers) to store the persistent token IN PLAIN TEXT
 * @returns {Promise<void>}
 */
export function login(
  username: string,
  password: string,
  cacheLocation?: string
): Promise<void>
/**
 * A shortcut for resolving all relationships in an array
 * @template T
 * @param {Array<Relationship<T>>} relationshipArray
 * @returns {Promise<Array<T>>}
 */
export function resolveArray<T>(
  relationshipArray: Relationship<T>[]
): Promise<T[]>

export {}
