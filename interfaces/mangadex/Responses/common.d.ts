// Most commonly a restful server will provide some type of response.
// it can be error or proper response.

// For our current api,
// we have a reponse error in which the error would be ResponseError
// for normal ones we have Response entity

// Response Entity will have a result response and data field for sure.
// except statistics for some reason,
// Making a  generic type for everything

interface IResponseError {
  result: 'error'
  errors: Array<Error>
}

interface IResponsePositive {
  result: 'ok'
}

type IResponseEntity<T> =
  | IResponseError
  | {
      result: 'ok'
      response: 'entity'
      data: T
    }

type IResponseCollection<T> =
  | IResponseError
  | {
      result: 'ok'
      response: 'collection'
      data: Array<T>
      limit?: number
      offset?: number
      total?: number
    }

type ICommonObject = {
  id: string
}

type ILocalizedString<T = string> = Record<ILocalizationLanguageEnum, T>
