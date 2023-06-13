import { LoginParams, User, adminUserLogin, adminUserInfo, adminUserLogout, TokenType } from '@/pages/login/api'
import { ResponseBodyType } from '@/types/api'
import { getToken } from '@/utils/auth'
import { AxiosResponse } from 'axios'
import { StateCreator } from 'zustand'

export interface UserSlice {
  token: string
  user: User
  login: (params: LoginParams) => Promise<AxiosResponse<ResponseBodyType<TokenType>>>
  getInfo: () => Promise<AxiosResponse<ResponseBodyType<User>>>
  logout: () => Promise<boolean>
  reset: () => void
}
export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (set, get) => ({
  token: getToken(),
  user: {},
  login: (params) => {
    return new Promise<AxiosResponse<ResponseBodyType<TokenType>>>((resolve, reject) => {
      adminUserLogin(params)
        .then((res) => {
          set(() => ({ token: res.data.data.token }))
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getInfo() {
    return new Promise<AxiosResponse<ResponseBodyType<User>>>((resolve, reject) => {
      adminUserInfo()
        .then((res) => {
          set(() => ({ user: res.data.data }))
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  logout() {
    return new Promise<boolean>((resolve, reject) => {
      adminUserLogout()
        .then(() => {
          get().reset()
          resolve(true)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  reset() {
    set({ user: {}, token: '' })
  },
})
