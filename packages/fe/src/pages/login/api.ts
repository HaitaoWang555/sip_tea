import request from '@/utils/request'
import type { ResponseBodyType } from '@/types/api'
import type { AxiosPromise } from 'axios'
import type { Menu as MenuEntity } from '../system/menu/api'
import type { Position as PositionEntity } from '../system/position/api'
import type { Department as DepartmentEntity } from '../system/department/api'

export type LoginParams = {
  username: string
  password: string
  captcha: string
  captchaKey: string
}

export type User = {
  id?: string
  username?: string
  icon?: string
  email?: string
  nickName?: string
  loginTime?: string
  status?: number
  menus?: MenuEntity[]
  position?: PositionEntity[]
  department?: DepartmentEntity[]
}

export type TokenType = {
  expiresIn: number
  refreshToken: string
  token: string
  tokenHead: string
}

export function randomImage(key: string): AxiosPromise<ResponseBodyType<string>> {
  return request({
    url: '/admin/captcha/image/' + key,
    method: 'get',
  })
}

export function adminUserInfo(): AxiosPromise<ResponseBodyType<User>> {
  return request({
    url: '/auth/profile',
    method: 'get',
  })
}

export function adminUserLogin(params: LoginParams): AxiosPromise<ResponseBodyType<TokenType>> {
  return request({
    url: '/auth/login',
    method: 'post',
    data: params,
  })
}
export function adminUserLogout(): AxiosPromise<ResponseBodyType<string>> {
  return request({
    url: '/auth/logout',
    method: 'post',
  })
}
