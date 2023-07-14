import {
  CoverQualityEnum,
  LocalizationLanguageEnum,
  QualityEnum
} from '@interfaces/mangadex/enum'

export const defaultMangadexConfig: IMangadexConfig = {
  quality: QualityEnum.DATA_SAVER,
  pageSize: 10,
  chapterMultiplier: 3,
  language: LocalizationLanguageEnum.EN,
  coverQuality: CoverQualityEnum.LOW,
  excludedTags: [],
  includedTags: [],
  translatedLanguage: [],
  originalLanguage: []
}

export const defaultAppConfig: IAppConfig = {
  themeColor: '#ff6740',
  colorScheme: undefined
}
