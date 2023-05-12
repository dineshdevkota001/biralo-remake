import { Chip, ChipProps, useTheme } from 'react-native-paper'

export default function PlusMinusChip({
  icon,
  style,
  textStyle,
  ...props
}: ChipProps & { icon?: 'plus' | 'minus' }) {
  const { colors } = useTheme()

  const getStyle = () => {
    switch (icon) {
      case 'plus':
        return {
          backgroundColor: colors.primaryContainer,
          color: colors.onPrimaryContainer
        }
      case 'minus':
        return {
          backgroundColor: colors.errorContainer,
          color: colors.onErrorContainer
        }
      default: {
        if (props.selected)
          return {
            mode: 'flat' as ChipProps['mode']
          }
        return { mode: 'outlined' as ChipProps['mode'] }
      }
    }
  }
  const { mode, ...differStyle } = getStyle()

  return (
    <Chip
      {...props}
      mode={mode}
      icon={icon}
      style={[differStyle, style]}
      textStyle={[differStyle, textStyle]}
    />
  )
}
