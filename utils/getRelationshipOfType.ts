import { TypeEnum } from '@interfaces/mangadex/enum'

export default function getRelationOfType<U>(
  relationships: IBaseRelation[],
  objectType: TypeEnum
): U {
  return relationships?.find(({ type }) => type === objectType) as unknown as U
}
