import type { ResponseBodyType, PageInfo } from '@/types/api'
import request from '@/utils/request'
import type { AxiosPromise } from 'axios'
import type {
  CreateOperatelogDto,
  UpdateOperatelogDto,
  SearchOperatelogDto,
  SearchOperatelogDtoWithNotPage,
  Operatelog,
} from 'be/monitor/operateLog/type'

export type {
  CreateOperatelogDto,
  UpdateOperatelogDto,
  SearchOperatelogDto,
  SearchOperatelogDtoWithNotPage,
  Operatelog,
}

export function query(params: SearchOperatelogDto): AxiosPromise<ResponseBodyType<PageInfo<Operatelog[]>>> {
  return request({
    url: '/operateLog/query',
    method: 'get',
    params,
  })
}

export function create(data: CreateOperatelogDto): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/operateLog',
    method: 'post',
    data,
  })
}

export function findAll(): AxiosPromise<ResponseBodyType<Operatelog[]>> {
  return request({
    url: '/operateLog',
    method: 'get',
  })
}

export function findOne(id: number): AxiosPromise<ResponseBodyType<Operatelog>> {
  return request({
    url: '/operateLog/' + id,
    method: 'get',
  })
}

export function update(data: UpdateOperatelogDto & Operatelog): AxiosPromise<ResponseBodyType<Operatelog>> {
  return request({
    url: '/operateLog/' + data.id,
    method: 'patch',
    data,
  })
}

export function remove(id: number | string): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/operateLog/' + id,
    method: 'delete',
  })
}
