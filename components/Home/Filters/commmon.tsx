import { View } from 'react-native'
import { Chip, ChipProps, Text, useTheme } from 'react-native-paper'

export function FilterChip({
  icon,
  style,
  textStyle,
  ...props
}: ChipProps & { icon?: 'plus' | 'minus' }) {
  const { colors } = useTheme()
  if (icon === 'plus')
    return (
      <Chip
        {...props}
        icon={icon}
        style={[
          {
            backgroundColor: colors.primaryContainer
          },
          style
        ]}
        textStyle={[
          {
            color: colors.onPrimaryContainer
          },
          textStyle
        ]}
      />
    )

  if (icon === 'minus')
    return (
      <Chip
        {...props}
        icon={icon}
        style={[
          {
            backgroundColor: colors.errorContainer
          },
          style
        ]}
        textStyle={[
          {
            color: colors.onErrorContainer
          },
          textStyle
        ]}
      />
    )
  return (
    <Chip
      mode={props.selected ? 'flat' : 'outlined'}
      {...props}
      icon={icon}
      textStyle={textStyle}
      style={style}
    />
  )
}

export function Section({
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
