import type { ProItem } from '@/types/components-utils'

export const columnList: ProItem[] = [
  {
    dataIndex: 'tableName',
    title: '表名称',
    valueType: 'input',
    isSearch: true,
    isForm: true,
    formItemAttrs: {
      rules: [{ required: true }],
    },
  },
  {
    dataIndex: 'tableComment',
    title: '表描述',
    valueType: 'input',
    isSearch: true,
    isForm: true,
  },
  {
    dataIndex: 'createdAt',
    title: '创建时间',
    renderType: 'date',
  },
  {
    dataIndex: 'updatedAt',
    title: '更新时间',
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
