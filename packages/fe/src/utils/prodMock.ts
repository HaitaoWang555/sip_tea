import type { AxiosResponse } from 'axios'
export async function mock(response: AxiosResponse<any, any>) {
  return new Promise<AxiosResponse<any, any>>((resolve) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const item = mocks.find((i) => i.url === response.config.url.replace('/mock', ''))
    if (item) {
      const data = response.config.data ? JSON.parse(response.config.data) : {}
      const params = response.config.params
      response.data = item.response(Object.assign({}, data, params))
      response.status = 200
      response.statusText = 'OK'
      setTimeout(() => {
        resolve(response)
      }, 1000)
    }
  })
}
