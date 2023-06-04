import { NumericDictionary, identity, pickBy } from 'lodash'

export default function cleanObject<T>(obj: NumericDictionary<T>) {
  return pickBy<NumericDictionary<T>>(obj, identity)
}
