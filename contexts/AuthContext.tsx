import { createContext, useMemo } from 'react'

type AuthContext = {
  isAuthenticated: false
}

export const AuthContext = createContext<AuthContext>({
  isAuthenticated: false
})

export default function useAuth() {
  return null
}

export function AuthProvider({ children }: IHaveChildren) {
  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          isAuthenticated: false
        }),
        []
      )}
    >
      {children}
    </AuthContext.Provider>
  )
}
