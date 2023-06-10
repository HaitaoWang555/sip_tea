import axios from 'axios'


// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    return config
  },
  (error) => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  async (response) => {
    return response
  },
  (error) => {
    // do something with request error
    return Promise.reject(error)
  }
)

export default service
