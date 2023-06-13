import { createContext } from 'react'

export const api = {
  responseKey: 'data.data',
  tablePageKey: {
    page: 'pageNum',
    pageSize: 'pageSize',
    data: 'data.data.list',
    totalData: 'data.data.total',
    pageSizeVal: 20,
  },
}
export const ApiContext = createContext(api)
