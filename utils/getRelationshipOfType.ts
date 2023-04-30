import { TypeEnum } from '@interfaces/enum'

export default function getRelationOfType<U, T = unknown>(
  relationships: IGeneralRelation<T>[],
  objectType: TypeEnum
): U {
  return relationships?.find(({ type }) => type === objectType) as unknown as U
}
