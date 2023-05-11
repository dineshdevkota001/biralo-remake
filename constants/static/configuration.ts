import {
  CoverQualityEnum,
  LocalizationLanguageEnum,
  QualityEnum
} from '@interfaces/enum'

const defaultConfig: IConfigContext = {
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
  // readingMode: 'adaptive'
}

export default defaultConfig
