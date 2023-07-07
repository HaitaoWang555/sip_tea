import type { ResponseBodyType, PageInfo } from '@/types/api'
import request from '@/utils/request'
import type { AxiosPromise } from 'axios'
import type {
  CreatePositionDto,
  UpdatePositionDto,
  SearchPositionDto,
  SearchPositionDtoWithNotPage,
  Position,
} from 'be/system/position/type'

export type { CreatePositionDto, UpdatePositionDto, SearchPositionDto, SearchPositionDtoWithNotPage, Position }

export function query(params: SearchPositionDto): AxiosPromise<ResponseBodyType<PageInfo<Position[]>>> {
  return request({
    url: '/position/query',
    method: 'get',
    params,
  })
}

export function create(data: CreatePositionDto): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/position',
    method: 'post',
    data,
  })
}

export function findAll(): AxiosPromise<ResponseBodyType<Position[]>> {
  return request({
    url: '/position',
    method: 'get',
  })
}

export function findOne(id: number): AxiosPromise<ResponseBodyType<Position>> {
  return request({
    url: '/position/' + id,
    method: 'get',
  })
}

export function update(data: UpdatePositionDto & Position): AxiosPromise<ResponseBodyType<Position>> {
  return request({
    url: '/position/' + data.id,
    method: 'patch',
    data,
  })
}

export function remove(id: number | string): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/position/' + id,
    method: 'delete',
  })
}
