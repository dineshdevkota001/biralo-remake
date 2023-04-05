type ILocalizationLanguage = 'en' | 'jp-RO'

type LocalizedString<T = string> = Record<ILocalizationLanguage, T>

type Order = 'asc' | 'desc'

namespace Response {
  type Result = 'ok' | 'error'
  interface ErrorResponse {
    result: 'error'
    errors: Array<Error>
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

type ObjectType =
  | 'manga'
  | 'chapter'
  | 'cover_art'
  | 'user'
  | 'author'
  | 'custom_list'
  | 'group'
  | 'manga_relation'
  | 'mapping_id'
  | 'tag'
  | 'scanlation_group'

interface Object<T extends ObjectType, U = undefined, V = undefined> {
  id: string
  type: T
  attributes: U
  relationships: V
}

interface ListRequest {
  limit?: number
  offset?: number
}
