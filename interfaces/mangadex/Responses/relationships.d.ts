type IBaseRelation = {
  id: string
  type: string
  attributes: unknown
  related?: string
}

type IMangaRelated = {
  id: string
  type: 'manga'
  attributes: IMangaAttributes
  related?: IMangaRelationEnum
}

type ICoverArtRelated = {
  id: string
  type: 'cover_art'
  attributes: ICoverAttributes
  related?: 'cover_art'
}

type IScanlationGroupRelated = {
  id: string
  type: 'scanlation_group'
  attributes: IScanlationGroupAttributes
}

type IUserRelated = {
  id: string
  type: 'user'
  attributes: IUserAttributes
}

type IMangaRelationships = Array<IMangaRelated | ICoverArtRelated>

type IChapterRelationships = Array<
  IMangaRelated | IScanlationGroupRelated | IUserRelated
>
