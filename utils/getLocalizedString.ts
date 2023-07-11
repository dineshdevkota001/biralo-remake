import { LocalizationLanguageEnum } from '@interfaces/mangadex/enum'
import { get } from 'lodash'

const defaultLanguage = LocalizationLanguageEnum.EN
const defaultTitleLanguage = LocalizationLanguageEnum.JA_RO

function extractValue(
  obj: ILocalizedString,
  firstOption: string,
  secondOption: string
) {
  return (
    get(obj, firstOption) || get(obj, secondOption) || Object.values(obj)[0]
  )
}

export function getTitle(str?: ILocalizedString) {
  if (!str) return ''
  return extractValue(str, defaultTitleLanguage, defaultLanguage)
}

export function getString(str?: ILocalizedString) {
  if (!str) return ''
  return extractValue(str, defaultLanguage, defaultTitleLanguage)
}
