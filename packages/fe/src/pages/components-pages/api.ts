import type { ResponseBodyType, PageInfo, Pagination } from '@/types/api'
import request from '@/utils/request'
import type { AxiosPromise } from 'axios'

export function submit(): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/mock/public/submit',
    method: 'post',
  })
}
export function getOptions(): AxiosPromise<ResponseBodyType<any>> {
  return request({
    url: '/mock/public/options',
    method: 'get',
  })
}
export function getTree(): AxiosPromise<ResponseBodyType<any>> {
  return request({
    url: '/mock/public/tree',
    method: 'get',
  })
}

export type UserParams = {
  name?: string
  status?: number
  email?: string
  tree?: number
  createAt?: string[] | string
}

export type UserEntity = {
  id?: number
  name?: string
  status?: number
  email?: string
}

export function userList(params?: UserParams & Pagination): AxiosPromise<ResponseBodyType<PageInfo<UserEntity[]>>> {
  return request({
    url: '/mock/users',
    method: 'get',
    params,
  })
}

export function userInfo(params?: UserParams): AxiosPromise<ResponseBodyType<UserEntity>> {
  return request({
    url: '/mock/users/info',
    method: 'get',
    params,
  })
}

export function addUser(params?: UserEntity): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/mock/users',
    method: 'post',
    data: params,
  })
}

export function delUser(params?: UserEntity): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/mock/users',
    method: 'delete',
    data: params,
  })
}

export function editUser(params?: UserEntity): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/mock/users',
    method: 'put',
    data: params,
  })
}
