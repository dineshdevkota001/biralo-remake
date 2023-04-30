import { TypeEnum } from '@interfaces/mangadex'

export default function getRelationOfType<T>(
  relationships: IGeneralRelation<T>[],
  objectType: TypeEnum
) {
  return relationships?.find(({ type }) => type === objectType)
}
