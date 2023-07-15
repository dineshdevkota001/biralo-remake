interface IMangadexConfig {
  quality: QualityEnum
  language: ILocalizationLanguageEnum
  coverQuality: CoverQualityEnum
  pageSize: number
  chapterMultiplier: number
  excludedTags: string[]
  includedTags: string[]
  translatedLanguage: ILocalizationLanguageEnum[]
  originalLanguage: ILocalizationLanguageEnum[]
}

interface IAppConfig {
  themeColor: string
  colorScheme?: 'dark' | 'light'
}
