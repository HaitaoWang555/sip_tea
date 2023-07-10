import request from '@/utils/request'
import type { AxiosPromise } from 'axios'
import type { ResponseBodyType } from '@/types/api'
import { RcFile } from 'antd/es/upload'

type Account = {
  id?: number
  icon?: string
  email?: string
  nickName?: string
}

export function updateAccount(data: Account): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/admin/adminUser/updateAccount',
    method: 'put',
    data,
  })
}

export function uploadImg(file: RcFile, module?: string): AxiosPromise<ResponseBodyType<string>> {
  const formData = new FormData()
  formData.append('file', file)
  if (module) formData.append('module', module)

  return request({
    url: '/file/file/uploadImg',
    method: 'post',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
