interface IScanlationGroupAttributes {
  name?: string
  altNames?: Array<ILocalizedString>
  website?: string | null
  ircServer?: string | null
  ircChannel?: string | null
  discord?: string | null
  contactEmail?: string | null
  description?: string | null
  twitter?: string | null
  mangaUpdates?: string | null
  focusedLanguage?: Array<string> | null
  locked?: boolean
  official?: boolean
  inactive?: boolean
  /**
   * Should respected ISO 8601 duration specification: https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @type {string}
   * @memberof ScanlationGroupAttributes
   */
  publishDelay?: string
  version?: number
  createdAt?: string
  updatedAt?: string
}

type IScanlationGroup = {
  id: string
  type: 'scanlation_group'
  attributes: IScanlationGroupAttributes
}
