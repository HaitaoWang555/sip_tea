import type { ResponseBodyType, PageInfo } from '@/types/api'
import request from '@/utils/request'
import type { AxiosPromise } from 'axios'
import type {
  CreateResourceDto,
  UpdateResourceDto,
  SearchResourceDto,
  SearchResourceDtoWithNotPage,
  Resource,
} from 'be/system/resource/type'

export type { CreateResourceDto, UpdateResourceDto, SearchResourceDto, SearchResourceDtoWithNotPage, Resource }

export function query(params: SearchResourceDto): AxiosPromise<ResponseBodyType<PageInfo<Resource[]>>> {
  return request({
    url: '/resource/query',
    method: 'get',
    params,
  })
}

export function create(data: CreateResourceDto): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/resource',
    method: 'post',
    data,
  })
}

export function findAll(): AxiosPromise<ResponseBodyType<Resource[]>> {
  return request({
    url: '/resource',
    method: 'get',
  })
}

export function findOne(id: number): AxiosPromise<ResponseBodyType<Resource>> {
  return request({
    url: '/resource/' + id,
    method: 'get',
  })
}

export function update(data: UpdateResourceDto & Resource): AxiosPromise<ResponseBodyType<Resource>> {
  return request({
    url: '/resource/' + data.id,
    method: 'patch',
    data,
  })
}

export function remove(id: number): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/resource/' + id,
    method: 'delete',
  })
}
