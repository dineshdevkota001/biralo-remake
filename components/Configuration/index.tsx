import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Themes from './Themes'
import ColorScheme from './ColorScheme'
import Tags from './Tags'

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    gap: 16,
    padding: 16
  }
})

export default function Configuration() {
  return (
    <View style={styles.root}>
      <Text variant="titleMedium">Color Mode</Text>
      <ColorScheme />
      <Text variant="titleMedium">Theme</Text>
      <Themes />
      <Tags />
    </View>
  )
}
