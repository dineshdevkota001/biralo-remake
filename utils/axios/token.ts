import { REFRESH_TOKEN_KEY, SESSION_TOKEN_KEY } from '@constants/static/key'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ResponseResultEnum } from '@interfaces/enum'
import axios from './index'

export default function getToken() {
  return AsyncStorage.getItem(SESSION_TOKEN_KEY)
}

export async function setTokens({ refresh, session }: IToken) {
  AsyncStorage.setItem(SESSION_TOKEN_KEY, session)
  await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refresh)
  return session
}

export async function refreshToken() {
  const token = AsyncStorage.getItem(REFRESH_TOKEN_KEY)
  if (!token) return null
  const { data } = await axios.post<{
    result: 'ok'
    token: IToken
  }>('/auth/refresh', { token })
  if (!data) return null
  setTokens(data?.token)
  return data?.token.session
}

export async function logout() {
  const x = await axios.post('auth/logout')
  if (x.data.result === ResponseResultEnum.OK)
    AsyncStorage.multiRemove([SESSION_TOKEN_KEY, REFRESH_TOKEN_KEY])
}
