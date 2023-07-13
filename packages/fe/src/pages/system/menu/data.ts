import type { ProItem } from '@/types/components-utils'
import { findAll } from './api'
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
    width: '120px',
    dataIndex: 'title',
    title: '菜单标题',
    valueType: 'input',
    formItemAttrs: {
      rules: [{ required: true }],
    },
    isSearch: true,
    isForm: true,
    noTable: false,
  },
  {
    width: '120px',
    dataIndex: 'parentId',
    title: '上级',
    valueType: 'select',
    formItemAttrs: {
      rules: [{ required: true }],
    },
    isSearch: false,
    isForm: true,
    noTable: true,
    defaultOption: [
      {
        label: '顶级菜单',
        value: 0,
      },
    ],
    optionsKey: {
      label: 'title',
      value: 'id',
    },
    optionMth: findAll,
    noCacheOptionMth: true,
  },
  {
    width: '120px',
    dataIndex: 'type',
    title: '类型',
    valueType: 'select',
    formItemAttrs: {
      rules: [{ required: true }],
    },
    isForm: true,
    noTable: false,
    renderType: 'dict',
    option: [
      {
        label: '菜单',
        value: 1,
      },
      {
        label: '按钮',
        value: 2,
      },
    ],
  },
  {
    width: '120px',
    dataIndex: 'code',
    title: '状态',
    valueType: 'select',
    formItemAttrs: {
      rules: [{ required: true }],
    },
    isSearch: true,
    isForm: true,
    noTable: false,
    renderType: 'dict',
    option: [
      {
        label: '生效',
        value: 1,
      },
      {
        label: '失效',
        value: 0,
      },
    ],
  },
  {
    width: '300px',
    minWidth: '260px',
    dataIndex: 'url',
    title: '前端路径',
    valueType: 'input',
    formItemAttrs: {
      rules: [{ required: true }],
    },
    isSearch: true,
    isForm: true,
    noTable: false,
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
    width: '240px',
    dataIndex: 'action',
    fixed: 'right',
    title: '操作',
    noInfo: true,
  },
]
