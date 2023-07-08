import { ScrollView, StyleSheet } from 'react-native'
import Configuration from '@components/Configuration'
import { Button, Text } from 'react-native-paper'
import { logout } from '@utils/axios/token'
import useAuth from '@contexts/AuthContext'

const style = StyleSheet.create({
  scrollRoot: {
    gap: 16
  }
})

export default function Profile() {
  const { user } = useAuth()

  return (
    <ScrollView style={style.scrollRoot}>
      <Text>{user?.attributes?.username ?? 'Not here'}</Text>
      <Button onPress={() => logout()}>Logout</Button>
      <Configuration />
    </ScrollView>
  )
}
