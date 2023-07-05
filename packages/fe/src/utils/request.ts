import { ResponseBodyType } from '@/types/api'
import axios, { AxiosResponse } from 'axios'
import { mock } from '@/utils/prodMock'
import { message, Modal } from 'antd'
import { getToken, removeToken } from './auth'
import { AUTHORIZATION, AUTHORIZATION_PREFIX } from 'be/utils/consts'

const isNeedMock = import.meta.env.VITE_APP_NEED_MOCK === 'true'

function formatGetParams(params: Record<string, any>) {
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      if (params[key] instanceof Array) {
        if (key === 'advancedQueryList') {
          delete params[key]
          continue
        }
        params[key] = params[key].join(',')
      }
    }
  }
}

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    const token = getToken()
    if (token) {
      config.headers[AUTHORIZATION] = AUTHORIZATION_PREFIX + ' ' + token
      // 所有请求加HEADER
    }
    if (config.params && config.method?.toLocaleLowerCase() === 'get') {
      formatGetParams(config.params)
    }
    if (isNeedMock && config.url?.startsWith('/mock')) {
      config.url = config.url.replace('/mock', '')
      config.baseURL = ''
    }
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
    if (import.meta.env.ENV === 'production' && isNeedMock) {
      const mockRes = await mock(response)
      if (mockRes) {
        return Promise.resolve(mockRes) as unknown as AxiosResponse<any, any>
      }
    }
    const res: ResponseBodyType<unknown> = response.data
    // if the custom code is not 0, it is judged as an error.
    if (res.code !== 200) {
      if (res.code === 401) {
        Modal.confirm({
          title: '登录已过期！',
          okText: '重新登录',
          onOk() {
            return new Promise<void>((resolve) => {
              removeToken()
              window.location.href = '/#/w/login'
              resolve()
            })
          },
        })
      } else {
        message.error(response.data.message)
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response
    }
  },
  (error) => {
    // do something with request error
    message.error(error.message)

    return Promise.reject(error)
  }
)

export default service
