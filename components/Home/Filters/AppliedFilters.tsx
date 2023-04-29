import useVariables from '@contexts/VariableContext'
import { capitalize } from 'lodash'
import { useWatch } from 'react-hook-form'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

export default function AppliedFilters() {
  const { search, control } = useVariables()
  const values = useWatch({ control })

  return (
    <>
      <View>
        <Text>Search: {search || 'None'}</Text>
        {Object.keys(values)?.map(key => {
          const value = values?.[key]
          return (
            <Text>
              {capitalize(key)}:{' '}
              {Array.isArray(value)
                ? value?.length
                : (value || value?.length) ?? 0}
            </Text>
          )
        })}
      </View>
    </>
  )
}
