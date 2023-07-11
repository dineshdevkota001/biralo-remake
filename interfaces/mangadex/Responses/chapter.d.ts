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

interface IChapter {
  id: string
  type: 'chapter'
  attributes: IChapterAttributes
  relationships: IChapterRelationships
}

type IChapterCollection = IResponseCollection<IChapter>
