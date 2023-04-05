namespace Chapter {
  interface Request {
    title?: string
    volume?: string
    chapter?: string
    translatedLanguage?: string
    groups?: Array<string>
    version?: number
  }
  interface Attributes {
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
  type Type = Object<'chapter', Attributes, Object<'manga', Manga.Attributes>[]>
  type ListResponse = Response.Collection<Type>
}
