import { get } from 'lodash'

const defaultLanguage: ILocalizationLanguage = 'en'
const defaultTitleLanguage: ILocalizationLanguage = 'jp-RO'

function extractValue(
  obj: LocalizedString,
  firstOption: string,
  secondOption: string
) {
  return (
    get(obj, firstOption) || get(obj, secondOption) || Object.values(obj)[0]
  )
}

export function getTitle(str?: LocalizedString) {
  if (!str) return ''
  return extractValue(str, defaultTitleLanguage, defaultLanguage)
}

export function getString(str?: LocalizedString) {
  if (!str) return ''
  return extractValue(str, defaultLanguage, defaultTitleLanguage)
}
