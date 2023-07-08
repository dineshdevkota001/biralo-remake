interface IConfig {
  quality: QualityEnum
  language: LocalizationLanguageEnum
  coverQuality: CoverQualityEnum
  pageSize: number
  chapterMultiplier: number
  excludedTags: string[]
  includedTags: string[]
  translatedLanguage: string[]
  originalLanguage: string[]
  themeColor: string
  colorScheme?: 'dark' | 'light'
}

interface IConfigurationContext {
  config: IConfig
  setConfig: (v: Partial<IConfig>) => void
}
