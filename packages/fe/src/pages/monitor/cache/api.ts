import type { ResponseBodyType, PageInfo } from '@/types/api'
import request from '@/utils/request'
import type { AxiosPromise } from 'axios'

export function getInfo(): AxiosPromise<ResponseBodyType<any>> {
  return request({
    url: '/cache/info',
    method: 'get',
  })
}

export function findAllPrefixKeys(): AxiosPromise<ResponseBodyType<any>> {
  return request({
    url: '/cache',
    method: 'get',
  })
}

export function findAllGroupKeys(prefix: string): AxiosPromise<ResponseBodyType<any>> {
  return request({
    url: '/cache/' + prefix,
    method: 'get',
  })
}

export function getValue(key: string, type: string): AxiosPromise<ResponseBodyType<any>> {
  return request({
    url: '/cache/' + key + '/' + type,
    method: 'get',
  })
}

export function removeGroup(prefix: string): AxiosPromise<ResponseBodyType<number>> {
  return request({
    url: '/cache/group/' + prefix,
    method: 'delete',
  })
}

export function removeSingle(key: string): AxiosPromise<ResponseBodyType<number>> {
  return request({
    url: '/cache/single/' + key,
    method: 'delete',
  })
}

export function removeAll(): AxiosPromise<ResponseBodyType<number>> {
  return request({
    url: '/cache/all',
    method: 'delete',
  })
}
