import { NumericDictionary, pickBy } from 'lodash'

export default function cleanObject<T>(obj: NumericDictionary<T>) {
  return pickBy<NumericDictionary<T>>(obj, x => {
    if (Array.isArray(x)) return x.length ? x : undefined
    return x
  })
}
