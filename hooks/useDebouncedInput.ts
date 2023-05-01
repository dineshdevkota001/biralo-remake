import { debounce } from 'lodash'
import { useCallback, useState } from 'react'

export default function useDebouncedInput(
  callback: (v: string) => void,
  defaultValue?: string | (() => string)
) {
  const [valueToRender, setValueToRender] = useState(defaultValue ?? '')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setDebouncedValue = useCallback(
    debounce((v: string) => callback(v), 500),
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
