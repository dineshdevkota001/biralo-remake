import { capitalize } from 'lodash'
import { useFormContext, useWatch } from 'react-hook-form'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

export default function AppliedFilters() {
  const { control } = useFormContext<IMangaRequest>()
  const values = useWatch({ control })

  return (
    <View>
      <Text>Search: {values?.title || 'None'}</Text>
      {(Object.keys(values) as Array<keyof IMangaRequest>)?.map(key => {
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
  )
}
