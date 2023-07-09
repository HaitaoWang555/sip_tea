import type { ResponseBodyType, PageInfo } from '@/types/api'
import request from '@/utils/request'
import type { AxiosPromise } from 'axios'
import type {
  CreatePoetryDto,
  UpdatePoetryDto,
  SearchPoetryDto,
  SearchPoetryDtoWithNotPage,
  Poetry,
} from 'be/cms/poetry/type'

export type { CreatePoetryDto, UpdatePoetryDto, SearchPoetryDto, SearchPoetryDtoWithNotPage, Poetry }

export function query(params: SearchPoetryDto): AxiosPromise<ResponseBodyType<PageInfo<Poetry[]>>> {
  return request({
    url: '/poetry/query',
    method: 'get',
    params,
  })
}

export function count(params: SearchPoetryDto): AxiosPromise<ResponseBodyType<number>> {
  return request({
    url: '/poetry/count',
    method: 'get',
    params,
  })
}

export function create(data: CreatePoetryDto): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/poetry',
    method: 'post',
    data,
  })
}

export function findAll(): AxiosPromise<ResponseBodyType<Poetry[]>> {
  return request({
    url: '/poetry',
    method: 'get',
  })
}

export function findOne(id: number): AxiosPromise<ResponseBodyType<Poetry>> {
  return request({
    url: '/poetry/' + id,
    method: 'get',
  })
}

export function update(data: UpdatePoetryDto & Poetry): AxiosPromise<ResponseBodyType<Poetry>> {
  return request({
    url: '/poetry/' + data.id,
    method: 'patch',
    data,
  })
}

export function remove(id: number | string): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/poetry/' + id,
    method: 'delete',
  })
}
