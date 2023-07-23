import { ScrollView, StyleSheet, View } from 'react-native'
import Configuration from '@components/Configuration'
import Logo from '@components/Common/Logo'
import { Text } from 'react-native-paper'
import spacing from '@utils/theme/spacing'

const styles = StyleSheet.create({
  scrollRoot: {
    gap: 16
  },
  header: {
    gap: spacing(4),
    padding: spacing(4),
    paddingBottom: 0
  },
  title: {
    textAlign: 'center'
  }
})

export default function Profile() {
  return (
    <ScrollView style={styles.scrollRoot}>
      <View style={styles.header}>
        <Logo width="100%" height="200" />
        <Text variant="displayMedium" style={styles.title}>
          Biralo
        </Text>
        <Text variant="titleLarge">Configurations</Text>
      </View>
      <Configuration />
    </ScrollView>
  )
}
