import type { ResponseBodyType, PageInfo } from '@/types/api'
import request from '@/utils/request'
import type { AxiosPromise } from 'axios'
import type { CreateUserDto, UpdateUserDto, SearchUserDto, SearchUserDtoWithNotPage, User } from 'be/user/type'

export type { CreateUserDto, UpdateUserDto, SearchUserDto, SearchUserDtoWithNotPage, User }

export function query(params: SearchUserDto): AxiosPromise<ResponseBodyType<PageInfo<User[]>>> {
  return request({
    url: '/users/query',
    method: 'get',
    params,
  })
}

export function create(data: CreateUserDto): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/users',
    method: 'post',
    data,
  })
}

export function findAll(): AxiosPromise<ResponseBodyType<User[]>> {
  return request({
    url: '/users',
    method: 'get',
  })
}

export function findOne(id: number): AxiosPromise<ResponseBodyType<User>> {
  return request({
    url: '/users/' + id,
    method: 'get',
  })
}

export function update(data: UpdateUserDto & User): AxiosPromise<ResponseBodyType<User>> {
  return request({
    url: '/users/' + data.id,
    method: 'patch',
    data,
  })
}

export function remove(id: number): AxiosPromise<ResponseBodyType<void>> {
  return request({
    url: '/users/' + id,
    method: 'delete',
  })
}
