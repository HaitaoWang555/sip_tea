import publicApi from './public'
import user from './user'

type MockItem = {
  url: string
  type: string
  response: (params?: any) => void
}

const mocks = [...publicApi, ...user] as MockItem[]

export { mocks }
