import { View } from 'react-native'
import { Text } from 'react-native-paper'
import Themes from './Themes'
import ColorScheme from './ColorScheme'

export default function Configuration() {
  return (
    <View
      style={{
        display: 'flex',
        gap: 16,
        padding: 16
      }}
    >
      <Text variant="titleMedium">Color Mode</Text>
      <ColorScheme />
      <Text variant="titleMedium">Theme</Text>
      <Themes />
      <Text variant="titleMedium">Rabbit</Text>
    </View>
  )
}
