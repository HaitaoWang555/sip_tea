import * as dayjs from 'dayjs'
dayjs.locale('zh-cn')

export function formatDate(date: string | number | Date, type: string) {
  if (!date) return '-'
  return dayjs(date).format(type)
}
