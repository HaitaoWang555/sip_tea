import type { ResponseBodyType, PageInfo } from '@/types/api'
import request from '@/utils/request'
import type { AxiosPromise } from 'axios'
import type { CreateRoleDto, UpdateRoleDto, SearchRoleDto, SearchRoleDtoWithNotPage, Role } from 'be/system/role/type'

export type { CreateRoleDto, UpdateRoleDto, SearchRoleDto, SearchRoleDtoWithNotPage, Role }

export function query(params: SearchRoleDto): AxiosPromise<ResponseBodyType<PageInfo<Role[]>>> {
  return request({
    url: '/role/query',
    method: 'get',
    params,
  })
}

export function create(data: CreateRoleDto): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/role',
    method: 'post',
    data,
  })
}

export function findAll(): AxiosPromise<ResponseBodyType<Role[]>> {
  return request({
    url: '/role',
    method: 'get',
  })
}

export function findOne(id: number): AxiosPromise<ResponseBodyType<Role>> {
  return request({
    url: '/role/' + id,
    method: 'get',
  })
}

export function update(data: UpdateRoleDto & Role): AxiosPromise<ResponseBodyType<Role>> {
  return request({
    url: '/role/' + data.id,
    method: 'patch',
    data,
  })
}

export function remove(id: number | string): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/role/' + id,
    method: 'delete',
  })
}
