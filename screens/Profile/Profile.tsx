import { ScrollView } from 'react-native'
import { Button, useTheme } from 'react-native-paper'
import {
  useAutoDiscovery,
  useAuthRequest,
  makeRedirectUri
} from 'expo-auth-session'
import { AUTH_REALM, OAUTH_CLIENT_ID } from '@constants/api'

export default function Profile() {
  const { colors } = useTheme()
  const discovery = useAutoDiscovery(AUTH_REALM)

  const [, , prompt] = useAuthRequest(
    {
      clientId: OAUTH_CLIENT_ID,
      redirectUri: makeRedirectUri(),
      scopes: ['openid', 'profile', 'email', 'offline_access']
    },
    discovery
  )

  return (
    <ScrollView
      style={{
        minHeight: '100%',
        backgroundColor: colors.surface
      }}
      contentContainerStyle={{
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
        padding: 8,
        gap: 16
      }}
    >
      <Button mode="contained-tonal" onPress={() => prompt()}>
        Log In
      </Button>
    </ScrollView>
  )
}
