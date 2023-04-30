import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ComponentProps } from 'react'

export type IconProps = ComponentProps<typeof MaterialCommunityIcons>

export default function Icon({ style, size, ...props }: IconProps) {
  return (
    <MaterialCommunityIcons
      {...props}
      style={[
        {
          fontSize: size
        },
        style
      ]}
      size={size}
    />
  )
}
