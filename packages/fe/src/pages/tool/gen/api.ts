import type { ResponseBodyType, PageInfo } from '@/types/api'
import request from '@/utils/request'
import type { AxiosPromise } from 'axios'
import type {
  CreateGenTableDto,
  UpdateGenTableDto,
  SearchGenTableDto,
  SearchGenTableDtoWithNotPage,
  GenTable,
  GenTableColumn,
} from 'be/gen_table/type'

export type {
  CreateGenTableDto,
  UpdateGenTableDto,
  SearchGenTableDto,
  SearchGenTableDtoWithNotPage,
  GenTable,
  GenTableColumn,
}

export function query(params: SearchGenTableDto): AxiosPromise<ResponseBodyType<PageInfo<GenTable[]>>> {
  return request({
    url: '/gen-table/query',
    method: 'get',
    params,
  })
}

export function create(data: CreateGenTableDto): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/gen-table',
    method: 'post',
    data,
  })
}

export function findAll(): AxiosPromise<ResponseBodyType<GenTable[]>> {
  return request({
    url: '/gen-table',
    method: 'get',
  })
}

export function findOne(id: number): AxiosPromise<ResponseBodyType<GenTable>> {
  return request({
    url: '/gen-table/' + id,
    method: 'get',
  })
}

export function update(data: UpdateGenTableDto & GenTable): AxiosPromise<ResponseBodyType<GenTable>> {
  return request({
    url: '/gen-table/' + data.id,
    method: 'patch',
    data,
  })
}

export function remove(id: number): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/gen-table/' + id,
    method: 'delete',
  })
}

export function generate(id: number, templeteFiles?: string[]): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/gen-table/generate/' + id,
    method: 'post',
    data: templeteFiles,
  })
}
