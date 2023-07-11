interface IUserAttributes {
  name: string
}

interface IMeAttributes {
  username: string
  roles: string[]
  version: number
}

interface IMe {
  id: string
  type: 'user'
  attributes: IMeAttributes
}
