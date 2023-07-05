import type { User } from '@/pages/login/api'

function getTokenKey() {
  return window['pro-layout-localStoragePrefix'] + 'Token'
}

function getUserInfoKey() {
  return window['pro-layout-localStoragePrefix'] + 'UserInfo'
}

export const USER_INFO_KEY = getUserInfoKey()

export function getToken(): string {
  return localStorage.getItem(getTokenKey()) || ''
}

export function setToken(token: string) {
  localStorage.setItem(getTokenKey(), token)
}

export function removeToken(): void {
  localStorage.removeItem(getTokenKey())
  localStorage.removeItem(getUserInfoKey())
  sessionStorage.clear()
}

export function getUserInfo(): User {
  const user = localStorage.getItem(getUserInfoKey())
  return user ? JSON.parse(user) : null
}

export function setUserInfo(user: User) {
  localStorage.setItem(getUserInfoKey(), JSON.stringify(user))
}

export function removeUserInfo(): void {
  localStorage.removeItem(getUserInfoKey())
}
