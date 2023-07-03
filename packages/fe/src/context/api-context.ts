import { createContext } from 'react'

export const DATAKEY = 'data.data.list'
export const TREEDATAKEY = 'data.data'

export const api = {
  responseKey: 'data.data',
  tablePageKey: {
    page: 'pageNum',
    pageSize: 'pageSize',
    data: DATAKEY,
    totalData: 'data.data.total',
    pageSizeVal: 20,
  },
}
export const ApiContext = createContext(api)
