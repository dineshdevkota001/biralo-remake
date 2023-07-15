import { Searchbar, SearchbarProps } from 'react-native-paper'
import { debounce } from 'lodash'
import { useCallback, useState } from 'react'

export default function DebouncedSearchbar({
  onChangeText,
  value,
  ...props
}: Partial<SearchbarProps> & { onChangeText: (text: string) => void }) {
  const [valueToRender, setValueToRender] = useState(value ?? '')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setDebouncedValue = useCallback(debounce(onChangeText, 500), [
    onChangeText
  ])

  const setValue = useCallback(
    (v?: string | null) => {
      setValueToRender(v || '')
      setDebouncedValue(v || '')
    },
    [setDebouncedValue]
  )
  return <Searchbar value={valueToRender} onChangeText={setValue} {...props} />
}
