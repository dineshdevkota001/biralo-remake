import { Button } from 'react-native-paper'
import {
  useAutoDiscovery,
  useAuthRequest,
  makeRedirectUri
} from 'expo-auth-session'
import { AUTH_REALM, OAUTH_CLIENT_ID } from '@constants/api'

export default function LoginButton() {
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
    <Button mode="contained-tonal" onPress={() => prompt()}>
      Log In
    </Button>
  )
}
