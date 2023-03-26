interface IEntity<T> extends IResponse<'entity'> {
  data: T
}

interface ICollection<T> extends IResponse<'collection'> {
  data: T[]
  limit: number
  offset: number
  total: number
}

type IError = {
  id: string
  status: number
  title: string
  detail: string
}

type IResponse<T extends 'entity' | 'collection', U> =
  | {
      result: 'ok'
      response: T
    }
  | {
      result: 'error'
      errors: IError[]
    }

type IObjectIdentifier<T extends 'manga' | 'tag' | 'string' | 'cover_art'> = {
  id: string
  type: T
}
