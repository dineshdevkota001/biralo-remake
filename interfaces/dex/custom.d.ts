type ILocalizationLanguage = 'en' | 'jp-RO'

type LocalizedString<T = string> = Record<ILocalizationLanguage, T>

namespace Response {
  type Result = 'ok' | 'error'
  interface ErrorResponse {
    result: 'error'
    errors: Array<Error>
  }
  interface Statistics<T> extends ErrorResponse {
    result: 'ok'
    statistics: T
  }
  interface Entity<T> extends ErrorResponse {
    result: 'ok'
    response: 'entity'
    data: T
  }
  interface Collection<T> extends ErrorResponse {
    result: 'ok'
    response: 'collection'
    data: Array<T>
    limit?: number
    offset?: number
    total?: number
  }
}

interface Object<T extends Dex.ObjectType, U = undefined, V = undefined> {
  id: string
  type: T
  attributes: U
  relationships: V
}

interface ListRequest {
  limit?: number
  offset?: number
}
