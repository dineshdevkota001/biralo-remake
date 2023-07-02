import getToken from '@utils/axios/token'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import axios from '@utils/axios'
import { ResponseResultEnum } from '@interfaces/enum'

type AuthContext = {
  isAuthenticated: boolean
  isChecked: boolean
  user: null | IMe
  refresh: () => void
}

export const AuthContext = createContext<AuthContext>({
  isAuthenticated: false,
  isChecked: false,
  user: null,
  refresh: () => undefined
})

export default function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: IHaveChildren) {
  const [user, setUser] = useState<IMe | undefined | null>()

  const refreshUser = useCallback(async () => {
    const token = await getToken()
    if (!token) return

    try {
      const { data } = await axios.get<IResponseEntity<IMe>>('/user/me')

      if (data.result === ResponseResultEnum.OK) setUser(data.data)
    } catch (e) {
      console.log('me error', (e as Error)?.message ?? 'Me Error')
      setUser(null)
    }
  }, [])

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          isChecked: typeof user !== 'undefined',
          isAuthenticated: user !== null,
          user: user ?? null,
          refresh: refreshUser
        }),
        [user, refreshUser]
      )}
    >
      {children}
    </AuthContext.Provider>
  )
}
