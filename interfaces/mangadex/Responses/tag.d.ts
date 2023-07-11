interface ITagAttributes {
  name?: LocalizedString
  description?: LocalizedString
  group?: TagGroupEnum
  version?: number
}

interface ITag {
  id: string
  type: 'tag'
  attributes: ITagAttributes
}

type ITagCollection = IResponseCollection<ITag>
