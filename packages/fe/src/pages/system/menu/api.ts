import type { ResponseBodyType, PageInfo } from '@/types/api'
import request from '@/utils/request'
import type { AxiosPromise } from 'axios'
import type { CreateMenuDto, UpdateMenuDto, SearchMenuDto, SearchMenuDtoWithNotPage, Menu } from 'be/system/menu/type'

export type { CreateMenuDto, UpdateMenuDto, SearchMenuDto, SearchMenuDtoWithNotPage, Menu }

export function query(params: SearchMenuDto): AxiosPromise<ResponseBodyType<PageInfo<Menu[]>>> {
  return request({
    url: '/menu/query',
    method: 'get',
    params,
  })
}

export function create(data: CreateMenuDto): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/menu',
    method: 'post',
    data,
  })
}

export function findAll(): AxiosPromise<ResponseBodyType<Menu[]>> {
  return request({
    url: '/menu',
    method: 'get',
  })
}

export function tree(params: SearchMenuDtoWithNotPage): AxiosPromise<ResponseBodyType<Menu[]>> {
  return request({
    url: '/menu/tree',
    method: 'get',
    params,
  })
}

export function findOne(id: number): AxiosPromise<ResponseBodyType<Menu>> {
  return request({
    url: '/menu/' + id,
    method: 'get',
  })
}

export function update(data: UpdateMenuDto & Menu): AxiosPromise<ResponseBodyType<Menu>> {
  return request({
    url: '/menu/' + data.id,
    method: 'patch',
    data,
  })
}

export function remove(id: number | string): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/menu/' + id,
    method: 'delete',
  })
}
