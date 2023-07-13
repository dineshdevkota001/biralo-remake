import { BACKEND } from '@constants/api'
import axios, { AxiosResponse } from 'axios'
import { merge } from 'lodash'
// import getToken, { refreshToken } from './token'

axios.defaults.baseURL = BACKEND

const token: string | null = null
let tested = false
let tries = 0

export async function refreshTokenOnAxios() {
  // token = await getToken()
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

axios.interceptors.response.use(async (res: AxiosResponse<IResponseError>) => {
  if ((res.status === 401 || res.status === 403) && tries < 3) {
    // token = await refreshToken()
    if (token) tries = 0
    else tries += 1
  }

  // NOTICE: We handle all response errors here
  if (res.data.result === 'error') {
    console.warn('Known error', res.status, res.data)
    throw Error(res.data.errors?.[0]?.message)
  }

  return res
})

export default axios
