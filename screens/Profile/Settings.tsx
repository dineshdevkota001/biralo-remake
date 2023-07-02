import { ScrollView } from 'react-native'
import Configuration from '@components/Configuration'
import { Button, Text } from 'react-native-paper'
import { logout } from '@utils/axios/token'
import useAuth from '@contexts/AuthContext'

export default function Profile() {
  const { user } = useAuth()

  return (
    <ScrollView style={{ gap: 16, backgroundColor: 'red' }}>
      <Text>{user?.attributes?.username ?? 'Not here'}</Text>
      <Button onPress={() => logout()}>Logout</Button>
      <Configuration />
    </ScrollView>
  )
}
