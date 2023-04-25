import { createContext } from "react";

type AuthContext = {};
export const AuthContext = createContext<AuthContext>({});

export default function useAuth() {
  return null;
}

export function AuthProvider({ children }: IHaveChildren) {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
