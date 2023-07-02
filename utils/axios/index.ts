import { BACKEND } from '@constants/api'
import axios from 'axios'
import { merge } from 'lodash'
import getToken, { refreshToken } from './token'

axios.defaults.baseURL = BACKEND

let token: string | null
let tested = false
let tries = 0

export async function refreshTokenOnAxios() {
  token = await getToken()
}

axios.interceptors.request.use(
  async config => {
    // Do something before request is sent

    if (!token && !tested) {
      refreshTokenOnAxios()
      tested = true
    }

    return merge(config, {
      headers: { Authorization: token ? `Bearer ${token}` : undefined }
    })
  },
  error => {
    Promise.reject(error)
  }
)

axios.interceptors.response.use(async v => {
  if ((v.status === 401 || v.status === 403) && tries < 3) {
    token = await refreshToken()
    if (token) tries = 0
    else tries += 1
  }
  return v
})

export default axios
