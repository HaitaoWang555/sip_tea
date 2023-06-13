import { getOptions, getTree } from '../api'
import type { ProItem } from '@/types/components-utils'

export const columnList: ProItem[] = [
  {
    width: '250px',
    dataIndex: 'email',
    title: '邮箱',
    valueType: 'input',
    defaultValue: 'aaa@aaa.com',
    isSearch: true,
    isForm: true,
    formItemAttrs: {
      tooltip: 'This is email',
    },
  },
  {
    dataIndex: 'name',
    title: '姓名',
    valueType: 'input',
    isSearch: true,
    isForm: true,
  },
  {
    width: '80px',
    dataIndex: 'status',
    title: '生效状态',
    valueType: 'select',
    defaultValue: 0,
    option: [],
    optionMth: getOptions,
    isSearch: true,
    isForm: true,
    renderType: 'dict',
  },
  {
    dataIndex: 'tree',
    title: '树形筛选',
    valueType: 'tree-select',
    option: [],
    optionMth: getTree,
    isSearch: true,
    isForm: true,
    noTable: true,
  },
  {
    dataIndex: 'createAt',
    title: '创建时间',
    valueType: 'range-picker',
    isSearch: true,
    defaultValue: ['2023-01-13', '2023-02-13'],
    span: 12,
    tableAttrs: { sorter: true },
    renderType: 'date',
  },
  {
    width: '180px',
    dataIndex: 'action',
    fixed: 'right',
    title: '操作',
    noInfo: true,
  },
]
