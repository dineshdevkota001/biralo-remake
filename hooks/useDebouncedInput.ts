import { debounce } from 'lodash'
import { useCallback, useState } from 'react'

export default function useDebouncedInput(
  callback: (v: string) => void,
  defaultValue?: string | (() => string)
) {
  const [valueToRender, setValueToRender] = useState(defaultValue ?? '')

  const setDebouncedValue = useCallback(
    (v: string) => {
      debounce(() => callback(v), 500)
    },
    [callback]
  )

  const setValue = useCallback(
    (v?: string | null) => {
      setValueToRender(v || '')
      setDebouncedValue(v || '')
    },
    [setDebouncedValue]
  )

  return { value: valueToRender, setValue }
}
