import { isString } from 'lodash'

export default function spacing(val: number) {
  if (isString(val)) return val
  return val * 4
}
