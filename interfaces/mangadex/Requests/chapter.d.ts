interface IChapterOrderInput {
  createdAt?: IOrderEnum
  updatedAt?: IOrderEnum
  publishAt?: IOrderEnum
  readableAt?: IOrderEnum
  volume?: IOrderEnum
  chapter?: IOrderEnum
}

interface IChapterRequest extends IPaginationInput {
  title?: string
  volume?: string
  chapter?: string
  translatedLanguage?: string[]
  originalLanguage?: string[]
  contentRating?: IContentRatingEnum[]
  groups?: Array<string>
  version?: number
  includes?: Array<TypeEnum.MANGA | TypeEnum.SCANLATION_GROUP | TypeEnum.USER>
  order?: IChapterOrderInput
}
