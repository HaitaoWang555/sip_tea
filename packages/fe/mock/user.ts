import { page, randomUser } from './utils'

const userArray = new Array(100).fill(null).map(() => {
  return randomUser()
})

export default [
  {
    url: '/users',
    type: 'get',
    response: (params: any) => {
      return {
        code: 200,
        message: 'success',
        data: page(userArray, Number(params.pageNum), Number(params.pageSize)),
      }
    },
  },
  {
    url: '/users/getAll',
    type: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: userArray,
      }
    },
  },
  {
    url: '/users/info',
    type: 'get',
    response: (params: any) => {
      return {
        code: 200,
        message: 'success',
        data: userArray.find((i) => i.id === Number(params.id)),
      }
    },
  },
  {
    url: '/users',
    type: 'post',
    response: () => {
      return {
        code: 200,
        message: 'success',
      }
    },
  },
  {
    url: '/users',
    type: 'delete',
    response: () => {
      return {
        code: 200,
        message: 'success',
      }
    },
  },
  {
    url: '/users',
    type: 'put',
    response: () => {
      return {
        code: 200,
        message: 'success',
      }
    },
  },
]
