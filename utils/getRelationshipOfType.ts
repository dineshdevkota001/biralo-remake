import { ObjectType } from "@interfaces/dex/enum";

export default function getRelationOfType<T, U>(
  relationships: Object<T, U>[],
  objectType: ObjectType,
) {
  return relationships?.find(({ type }) => type === objectType);
}
