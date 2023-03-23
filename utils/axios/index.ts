import { BACKEND } from '@constants/api'
import axios from 'axios'

axios.defaults.baseURL = BACKEND

export default axios
