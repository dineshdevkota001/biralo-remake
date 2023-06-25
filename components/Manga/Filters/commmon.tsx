import { StyleProp, View, ViewStyle } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

export function Section({
  title,
  children,
  containerStyle
}: { title: string; containerStyle: StyleProp<ViewStyle> } & IHaveChildren) {
  const { colors } = useTheme()
  return (
    <View
      style={[
        {
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          borderColor: colors.shadow,
          gap: 4
        },
        containerStyle
      ]}
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

export function formArrayHelpers(
  arr: Array<string>,
  tag: string | { id: string },
  someFunction = (x: string) => x === (typeof tag === 'string' ? tag : tag.id)
) {
  const isPresent = arr?.some(someFunction)

  const getInsertedArray = () => {
    if (isPresent) return arr
    return [...(arr ?? []), typeof tag === 'string' ? tag : tag.id]
  }
  const getRemovedArray = () => {
    if (!isPresent) return arr
    return arr.filter(x => !someFunction(x))
  }
  const getToggledArray = isPresent ? getRemovedArray : getInsertedArray

  return { isPresent, getInsertedArray, getRemovedArray, getToggledArray }
}
