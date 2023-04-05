namespace Relationship {
  type Attributes = any
  type MangaRelation =
    | 'monochrome'
    | 'main_story'
    | 'adapted_from'
    | 'based_on'
    | 'prequel'
    | 'side_story'
    | 'doujinshi'
    | 'same_franchise'
    | 'shared_universe'
    | 'sequel'
    | 'spin_off'
    | 'alternate_story'
    | 'alternate_version'
    | 'preserialization'
    | 'colored'
    | 'serialization'

  type Type = {
    id?: string
    type?: string
    related?: MangaRelation
    attributes?: any
  }
}