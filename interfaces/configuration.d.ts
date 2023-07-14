interface IMangadexConfig {
  quality: QualityEnum
  language: LocalizationLanguageEnum
  coverQuality: CoverQualityEnum
  pageSize: number
  chapterMultiplier: number
  excludedTags: string[]
  includedTags: string[]
  translatedLanguage: string[]
  originalLanguage: string[]
}

interface IAppConfig {
  themeColor: string
  colorScheme?: 'dark' | 'light'
}
