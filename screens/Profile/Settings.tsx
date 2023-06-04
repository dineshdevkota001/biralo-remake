import { ScrollView } from 'react-native'
import Configuration from '@components/Configuration'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Text } from 'react-native-paper'
import { logout } from '@utils/axios/token'
import useAuth from '@contexts/AuthContext'

export default function Profile() {
  const { user, isAuthenticated } = useAuth()

  console.log(user, isAuthenticated)
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <ScrollView style={{ gap: 16 }}>
        <Text>{user?.attributes?.username ?? 'Not here'}</Text>
        <Button onPress={() => logout()}>Logout</Button>
        <Configuration />
      </ScrollView>
    </SafeAreaView>
  )
}
