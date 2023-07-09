import { WEBVIEW } from '@constants/static/screens'
import { StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'

const styles = StyleSheet.create({
  container: {}
})

export default function WebViewScreen({
  route
}: IRootStackScreenProps<typeof WEBVIEW>) {
  return <WebView style={styles.container} source={{ uri: route.params.uri }} />
}
