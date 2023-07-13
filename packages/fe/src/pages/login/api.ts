import request from '@/utils/request'
import type { ResponseBodyType } from '@/types/api'
import type { AxiosPromise } from 'axios'
import type { SignInDto, SignInSuccessDto } from 'be/auth/type'
import { Menu } from '../system/menu/api'
import { User } from '../system/user/api'
type ProfileDto = {
  menus: Menu[]
} & User
export type { SignInDto, SignInSuccessDto, ProfileDto }

export function randomImage(key: string): AxiosPromise<ResponseBodyType<string>> {
  return request({
    url: '/auth/captcha/' + key,
    method: 'get',
  })
}

export function adminUserInfo(): AxiosPromise<ResponseBodyType<ProfileDto>> {
  return request({
    url: '/auth/profile',
    method: 'get',
  })
}

export function adminUserLogin(params: SignInDto): AxiosPromise<ResponseBodyType<SignInSuccessDto>> {
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
