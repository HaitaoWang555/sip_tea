import type { ProItem } from '@/types/components-utils'
import { tree as findAllMenu } from '../menu/api'
import { findAll as findAllResource } from '../resource/api'
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
    title: '角色名称',
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
    dataIndex: 'code',
    title: '角色编码',
    valueType: 'input',
    formItemAttrs: {
      rules: [{ required: true }],
    },
    isSearch: true,
    isForm: true,
    noTable: false,
  },
  {
    dataIndex: 'menuIds',
    title: '菜单',
    valueType: 'tree-select',
    formAttrs: {
      multiple: true,
      showSearch: true,
      treeDefaultExpandAll: true,
      treeCheckStrictly: true,
      treeCheckable: true,
      showCheckedStrategy: 'SHOW_ALL',
    },
    optionMth: findAllMenu,
    optionsKey: {
      label: 'title',
      value: 'id',
    },
    noCacheOptionMth: true,
    isForm: true,
    noTable: true,
    noInfo: true,
  },
  {
    dataIndex: 'resourceIds',
    title: '资源',
    valueType: 'select',
    formAttrs: {
      mode: 'multiple',
    },
    optionMth: findAllResource,
    optionsKey: {
      label: 'title',
      value: 'id',
    },
    noCacheOptionMth: true,
    isForm: true,
    noTable: true,
    noInfo: true,
  },
  {
    width: '120px',
    dataIndex: 'status',
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
