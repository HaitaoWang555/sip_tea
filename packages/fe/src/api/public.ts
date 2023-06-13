import request from '@/utils/request'
import type { AxiosPromise } from 'axios'
import type { ResponseBodyType } from '@/types/api'
import { RcFile } from 'antd/es/upload'

export function upload(file: RcFile, module?: string): AxiosPromise<ResponseBodyType<string>> {
  const formData = new FormData()
  formData.append('file', file)
  if (module) formData.append('module', module)

  return request({
    url: '/file/file/upload',
    method: 'post',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
