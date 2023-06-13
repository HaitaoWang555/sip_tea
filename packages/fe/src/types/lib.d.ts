// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NonIndexRouteObject, IndexRouteObject } from 'react-router-dom'

declare module 'react-router-dom' {
  export interface NonIndexRouteObject {
    icon?: React.ReactNode
    hidden?: boolean
    key?: string
    label?: string
  }
  export interface IndexRouteObject {
    icon?: React.ReactNode
    hidden?: boolean
    key?: string
    label?: string
  }
}

declare global {
  interface Window {
    'pro-layout-localStoragePrefix': string
  }
}
