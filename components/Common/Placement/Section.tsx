import { View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

export default function Section({
  title,
  children
}: { title: string } & IHaveChildren) {
  const { colors } = useTheme()
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderColor: colors.shadow,
        gap: 4
      }}
    >
      <Text
        variant="labelLarge"
        style={{
          width: '100%',
          color: colors.onSurfaceVariant
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  )
}
