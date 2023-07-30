import {
  SignInDto,
  ProfileDto,
  adminUserLogin,
  adminUserInfo,
  adminUserLogout,
  SignInSuccessDto,
} from '@/pages/login/api'
import { ResponseBodyType } from '@/types/api'
import { getToken, removeToken } from '@/utils/auth'
import { AxiosResponse } from 'axios'
import { StateCreator } from 'zustand'

import componentsPagesRouter from '@/routes/modules/components-pages'
import { flatTree } from '@/utils/tree'

export interface UserSlice {
  token: string
  user: ProfileDto
  login: (params: SignInDto) => Promise<AxiosResponse<ResponseBodyType<SignInSuccessDto>>>
  getInfo: () => Promise<AxiosResponse<ResponseBodyType<ProfileDto>>>
  logout: () => Promise<boolean>
  reset: () => void
}
export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (set, get) => ({
  token: getToken(),
  user: {} as ProfileDto,
  login: (params) => {
    return new Promise<AxiosResponse<ResponseBodyType<SignInSuccessDto>>>((resolve, reject) => {
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
    return new Promise<AxiosResponse<ResponseBodyType<ProfileDto>>>((resolve, reject) => {
      adminUserInfo()
        .then((res) => {
          if (import.meta.env.VITE_APP_ENV !== 'production') {
            let staticUrl: any[] = []
            flatTree([componentsPagesRouter], staticUrl)
            staticUrl = staticUrl.map((i) => {
              return {
                title: i.label,
                url: i.path,
              }
            })
            res.data.data.menus.push(...staticUrl)
          }
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
          removeToken()
          get().reset()
          resolve(true)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  reset() {
    set({ user: {} as ProfileDto, token: '' })
  },
})
