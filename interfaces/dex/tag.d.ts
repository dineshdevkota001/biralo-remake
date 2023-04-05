namespace Tag {
  interface Attributes {
    name?: LocalizedString
    description?: LocalizedString
    group?: Group
    version?: number
  }
  type Group = 'content' | 'format' | 'genre' | 'theme'
}
