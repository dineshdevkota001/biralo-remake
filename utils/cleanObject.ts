import { isObject } from 'lodash'

export default function cleanObject<T extends Record<string, any>>(obj: T) {
  const returnVar: Partial<T> = {}
  Object.keys(obj).forEach((k: keyof T) => {
    const value = obj[k]
    if (Array.isArray(value)) {
      if (value.length) returnVar[k] = value
    } else if (isObject(value)) {
      const cleanedObject = cleanObject(value)
      if (cleanedObject) returnVar[k] = cleanedObject
    } else if (value) value[k] = value
  })
  if (Object.keys(returnVar).length === 0) return undefined
  return returnVar
}
