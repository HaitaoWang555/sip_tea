import request from '@/utils/request'
import type { AxiosPromise } from 'axios'
import type { ResponseBodyType } from '@/types/api'
import { RcFile } from 'antd/es/upload'
import { UpdateProfileDto } from 'be/auth/type'

export function updateAccount(data: UpdateProfileDto): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/auth/profile',
    method: 'put',
    data,
  })
}

export function uploadImg(file: RcFile, module?: string): AxiosPromise<ResponseBodyType<string>> {
  const formData = new FormData()
  formData.append('icon', file)
  if (module) formData.append('module', module)

  return request({
    url: '/upload/icon',
    method: 'post',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
