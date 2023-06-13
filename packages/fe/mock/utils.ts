import { faker } from '@faker-js/faker/locale/zh_CN'

export const randomName = () => faker.person.fullName()
export const randomEmail = () => faker.internet.email()
export const randomId = () => faker.number.int()
export const randomStatus = () => faker.helpers.arrayElement([0, 1])
export const randomCreateAt = () => faker.date.past()

export function randomUser() {
  return {
    id: randomId(),
    name: randomName(),
    email: randomEmail(),
    status: randomStatus(),
    createAt: randomCreateAt(),
  }
}

export function page(list: any[], pageNum: number, pageSize: number) {
  return {
    total: list.length,
    records: list.slice((pageNum - 1) * pageSize, pageNum * pageSize),
    pageNum,
    pageSize,
  }
}
