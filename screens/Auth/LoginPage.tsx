import ControlledInput from '@components/Common/Input/Controlled/TextInput'
import { useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios, { refreshTokenOnAxios } from '@utils/axios'
import { setTokens } from '@utils/axios/token'
import { Button } from 'react-native-paper'
import useAuth from '@contexts/AuthContext'

const defaultValues = {
  username: '',
  password: ''
}

export default function LoginScreen() {
  const { refresh } = useAuth()
  const { control, handleSubmit } = useForm({
    defaultValues
  })

  const onSubmit = async (values: typeof defaultValues) => {
    const { data } = await axios.post<{
      result: 'ok'
      token: IToken
    }>('/auth/login', values)

    if (!data) return
    const { token } = data

    await setTokens(token)
    refreshTokenOnAxios()
    refresh()
  }

  return (
    <SafeAreaView
      edges={[]}
      style={{
        flex: 1
      }}
    >
      <ControlledInput
        control={control}
        name="username"
        label="Username"
        autoCorrect={false}
        autoCapitalize="none"
        autoComplete="username"
        autoFocus
        importantForAutofill="yes"
      />
      <ControlledInput
        control={control}
        name="password"
        label="Password"
        autoCorrect={false}
        autoCapitalize="none"
        autoComplete="password"
        importantForAutofill="yes"
      />
      <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
    </SafeAreaView>
  )
}
