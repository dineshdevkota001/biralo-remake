import {
  CoverQualityEnum,
  LocalizationLanguageEnum,
  QualityEnum
} from '@interfaces/mangadex/enum'

const defaultConfig: IConfig = {
  quality: QualityEnum.DATA_SAVER,
  language: LocalizationLanguageEnum.EN,
  coverQuality: CoverQualityEnum.LOW,
  pageSize: 10,
  chapterMultiplier: 3,
  excludedTags: [],
  includedTags: [],
  translatedLanguage: [],
  originalLanguage: [],
  themeColor: '#ff6740'
}

export default defaultConfig
