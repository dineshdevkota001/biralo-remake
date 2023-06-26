import Icon, { IconProps } from '@components/Core/Icon'
import { View } from 'react-native'
import { Text, TouchableRipple, useTheme } from 'react-native-paper'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

type ITriStateValue = boolean | undefined

function triStateToNumber(value: ITriStateValue) {
  return Number(!!value)
}

export default function TwowaySwitch({
  leftIconProps,
  rightIconProps,
  value = undefined,
  label,
  iconWidth = 32,
  onChange
}: {
  leftIconProps?: IconProps
  rightIconProps?: IconProps
  value: ITriStateValue
  label: string
  iconWidth?: number
  onChange: (v: ITriStateValue) => void
}) {
  const { colors } = useTheme()
  const offset = useSharedValue(triStateToNumber(value) * iconWidth)

  const setValue = (newValue: ITriStateValue) => {
    onChange(newValue)
  }

  const toggleValue = () => {
    const newValue = !value
    setValue(newValue)
    offset.value = withTiming(triStateToNumber(newValue) * iconWidth)
  }

  const containerStyle = useAnimatedStyle(() => {
    const diff = offset.value

    let triStateColor
    if (diff < 0) triStateColor = colors.error
    else if (diff > 0) triStateColor = colors.primary
    else triStateColor = colors.background

    return {
      backgroundColor: triStateColor
    }
  }, [offset])

  const style = useAnimatedStyle(() => {
    let triStateColor = colors.onSurfaceVariant
    let triStateBackground = colors.surfaceVariant
    const diff = offset.value

    if (diff < 0) {
      triStateColor = colors.onErrorContainer
      triStateBackground = colors.errorContainer
    } else if (diff > 0) {
      triStateColor = colors.onPrimaryContainer
      triStateBackground = colors.primaryContainer
    }

    return {
      transform: [{ translateX: -offset.value }],
      backgroundColor: triStateBackground,
      color: triStateColor
    }
  }, [offset])

  return (
    <TouchableRipple onPress={toggleValue}>
      <Animated.View
        style={[
          {
            display: 'flex',
            flexDirection: 'row',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'space-between',
            overflow: 'hidden'
          },
          containerStyle
        ]}
      >
        <View
          style={{
            position: 'absolute',
            left: 0,
            width: iconWidth,
            alignItems: 'center'
          }}
        >
          <Icon name="close" color={colors.onError} {...leftIconProps} />
        </View>
        <View
          style={{
            position: 'absolute',
            right: 0,
            width: iconWidth,
            alignItems: 'center'
          }}
        >
          <Icon name="check" color={colors.onPrimary} {...rightIconProps} />
        </View>
        <Animated.View
          style={[
            {
              position: 'relative',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 12
            },
            style
          ]}
        >
          <Text>{label}</Text>
        </Animated.View>
      </Animated.View>
    </TouchableRipple>
  )
}
