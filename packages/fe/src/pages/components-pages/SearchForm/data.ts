import { getOptions, getTree } from '../api'
import type { ProItem } from '@/types/components-utils'

export const columnList: ProItem[] = [
  {
    dataIndex: 'email',
    title: '邮箱',
    valueType: 'input',
    defaultValue: 'aaa@aaa.com',
    isSearch: true,
    formItemAttrs: {
      tooltip: 'This is email',
    },
  },
  {
    dataIndex: 'name',
    title: '姓名',
    valueType: 'input',
    isSearch: true,
  },
  {
    dataIndex: 'status',
    title: '生效状态',
    valueType: 'select',
    defaultValue: 0,
    option: [],
    optionMth: getOptions,
    isSearch: true,
  },
  {
    dataIndex: 'tree',
    title: '树形筛选',
    valueType: 'tree-select',
    option: [],
    optionMth: getTree,
    isSearch: true,
  },
  {
    dataIndex: 'createAt',
    title: '创建时间',
    valueType: 'range-picker',
    isSearch: true,
    defaultValue: ['2023-01-13', '2023-02-13'],
    span: 12,
  },
]
