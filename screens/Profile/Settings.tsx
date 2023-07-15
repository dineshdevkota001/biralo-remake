import { ScrollView, StyleSheet } from 'react-native'
import Configuration from '@components/Configuration'

const style = StyleSheet.create({
  scrollRoot: {
    gap: 16
  }
})

export default function Profile() {
  return (
    <ScrollView style={style.scrollRoot}>
      <Configuration />
    </ScrollView>
  )
}
