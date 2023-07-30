import publicApi from './public'
import user from './user'
import auth from './auth'

type MockItem = {
  url: string
  type: string
  response: (params?: any) => void
}

const mocks = [...publicApi, ...user, ...auth] as MockItem[]

export { mocks }
