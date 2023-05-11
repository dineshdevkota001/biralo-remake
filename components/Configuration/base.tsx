import { View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

type IBaseProps = {
  isSelected?: boolean
  color: string
  name: string
  isDefault?: boolean
}

export default function Base({
  isDefault,
  isSelected,
  name,
  color
}: IBaseProps) {
  const { colors } = useTheme()
  return (
    <View
      style={[
        {
          display: 'flex',
          gap: 4,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 8,
          borderRadius: 8,
          borderWidth: 0.5,
          borderColor: colors.backdrop,
          backgroundColor: colors.surface
        },
        isSelected
          ? {
              backgroundColor: colors.primaryContainer
            }
          : undefined
      ]}
    >
      <View
        style={[
          {
            height: 64,
            width: 64,
            borderRadius: 64,
            backgroundColor: color || 'black',
            position: 'relative',
            overflow: 'hidden'
          },
          isSelected
            ? {
                borderColor: colors.background,
                borderWidth: 1
              }
            : undefined
        ]}
      >
        {color ? null : (
          <View style={{ height: 64, width: 32, backgroundColor: 'white' }} />
        )}
      </View>
      <Text variant="titleSmall">
        {name}
        {isDefault ? '*' : ''}
      </Text>
    </View>
  )
}
