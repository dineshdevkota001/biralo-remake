import useVariables from '@contexts/VariableContext'
import { debounce } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { Searchbar, SearchbarProps, Text } from 'react-native-paper'

export default function DebouncedSearchbar(
  props: Omit<SearchbarProps, 'value'>
) {
  const [search, setSearch] = useState('')
  const { search: globalSearch, setSearch: setGlobalSearch } = useVariables()
  const [value, setValueToRender] = useState('')

  const setDebouncedValue = useCallback(
    debounce((v: string) => {
      setSearch(v)
    }, 500),
    []
  )

  useEffect(() => {
    setGlobalSearch(search)
  }, [search, setGlobalSearch])

  const setValue = useCallback(
    (v?: string | null) => {
      setValueToRender(v || '')
      setDebouncedValue(v || '')
    },
    [setDebouncedValue]
  )

  return (
    <Searchbar
      autoFocus
      style={{ marginHorizontal: 8, marginBottom: 8, flex: 1 }}
      icon="arrow-left"
      {...props}
      onChangeText={setValue}
      value={value}
    />
  )
}
