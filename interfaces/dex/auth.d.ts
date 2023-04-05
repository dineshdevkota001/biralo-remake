namespace Auth {
  interface LoginResponseToken {
    session?: string
    refresh?: string
  }
  interface CheckResponse {
    result?: Response.Result
    isAuthenticated?: boolean
    roles?: Array<string>
    permissions?: Array<string>
  }
  interface LoginRequest {
    username?: string
    email?: string
    password: string
  }
  export interface LoginResponse {
    result?: Response.Result
    token?: LoginResponseToken
  }
  export interface LogoutResponse {
    result?: Response.Result
  }
  export interface RefreshResponse {
    result: Response.Result
    token?: LoginResponseToken
    message?: string
  }
}
