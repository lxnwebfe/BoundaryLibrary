import axios from 'axios'

const axiosAction = axios.create({
  baseURL: '/api',
  timeout: 1000
})

export default axiosAction
