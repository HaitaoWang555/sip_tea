import type { ProItem } from '@/types/components-utils'

export const columnList: ProItem[] = [
  {
    width: '250px',
    dataIndex: 'email',
    title: '邮箱',
    valueType: 'input',
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
    defaultValue: 1,
    option: [
      { label: '生效', value: 1 },
      { label: '失效', value: 0 },
    ],
    isSearch: true,
    isForm: true,
    renderType: 'dict',
  },
  {
    dataIndex: 'createAt',
    title: '创建时间',
    valueType: 'range-picker',
    isSearch: true,
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
