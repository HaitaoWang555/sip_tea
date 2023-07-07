import type { ResponseBodyType, PageInfo } from '@/types/api'
import request from '@/utils/request'
import type { AxiosPromise } from 'axios'
import type {
  CreateDepartmentDto,
  UpdateDepartmentDto,
  SearchDepartmentDto,
  SearchDepartmentDtoWithNotPage,
  Department,
} from 'be/system/department/type'

export type {
  CreateDepartmentDto,
  UpdateDepartmentDto,
  SearchDepartmentDto,
  SearchDepartmentDtoWithNotPage,
  Department,
}

export function query(params: SearchDepartmentDto): AxiosPromise<ResponseBodyType<PageInfo<Department[]>>> {
  return request({
    url: '/department/query',
    method: 'get',
    params,
  })
}

export function create(data: CreateDepartmentDto): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/department',
    method: 'post',
    data,
  })
}

export function findAll(): AxiosPromise<ResponseBodyType<Department[]>> {
  return request({
    url: '/department',
    method: 'get',
  })
}

export function tree(params: SearchDepartmentDtoWithNotPage): AxiosPromise<ResponseBodyType<Department[]>> {
  return request({
    url: '/department/tree',
    method: 'get',
    params,
  })
}

export function findOne(id: number): AxiosPromise<ResponseBodyType<Department>> {
  return request({
    url: '/department/' + id,
    method: 'get',
  })
}

export function update(data: UpdateDepartmentDto & Department): AxiosPromise<ResponseBodyType<Department>> {
  return request({
    url: '/department/' + data.id,
    method: 'patch',
    data,
  })
}

export function remove(id: number | string): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/department/' + id,
    method: 'delete',
  })
}
