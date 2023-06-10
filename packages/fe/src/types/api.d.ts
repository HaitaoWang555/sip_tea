export type ResponseBodyType<T> = {
  message?: string
  timestamp?: number
  data: T
  code: number
  success: boolean
}
export type PageInfo<T> = {
  list: T
  pageNum: number
  pageSize: number
  total: number
}

export type Pagination = {
  pageNum?: number
  pageSize?: number
}

export type BaseEntity = {
  createBy?: string
  createTime?: string
  updateBy?: string
  updateTime?: string
  remark?: string
}
