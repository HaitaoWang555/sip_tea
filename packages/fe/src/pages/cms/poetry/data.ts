import type { ProItem } from '@/types/components-utils'
export const columnList: ProItem[] = [
  {
    width: '120px',
    dataIndex: 'id',
    title: '主键',
    isSearch: false,
    isForm: false,
    noTable: true,
  },
  {
    width: '240px',
    dataIndex: 'title',
    title: '标题',
    valueType: 'input',
    formItemAttrs: {
      rules: [{ required: true }],
    },
    isSearch: true,
    isForm: true,
    noTable: false,
  },
  {
    width: '80px',
    dataIndex: 'dynasty',
    title: '朝代',
    valueType: 'input',
    isSearch: true,
    isForm: true,
    noTable: false,
  },
  {
    width: '80px',
    dataIndex: 'author',
    title: '作者',
    valueType: 'input',
    isSearch: true,
    isForm: true,
    noTable: false,
  },
  {
    width: '300px',
    dataIndex: 'content',
    title: '内容',
    valueType: 'text-area',
    isSearch: true,
    isForm: true,
    noTable: false,
  },
  {
    width: '180px',
    dataIndex: 'action',
    fixed: 'right',
    title: '操作',
    noInfo: true,
  },
]
