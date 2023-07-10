import type { ProItem } from '@/types/components-utils'
import { Position, findAll as findAllPosition } from '../position/api'
import { Department, findAll as findAllDepartment } from '../department/api'
import { Role, findAll as findAllRole } from '../role/api'
import { verify } from './api'

function checkUsername(rule: any, value: string) {
  return new Promise((resolve, reject) => {
    if (!value) {
      rule.message = '请输入用户名！'
      reject()
    } else {
      verify(value)
        .then(() => {
          resolve(value)
        })
        .catch(() => {
          rule.message = '用户名重复！'
          reject()
        })
    }
  })
}

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
    width: '200px',
    dataIndex: 'username',
    title: '用户名',
    valueType: 'input',
    formItemAttrs: {
      validateTrigger: ['onChange', 'onBlur'],
      rules: [{ required: true, validator: checkUsername, validateTrigger: 'onBlur' }],
    },
    isSearch: true,
    isForm: true,
    noTable: false,
    fixed: 'left',
    isShowFormItem: (formParam, formType) => {
      return formType === 'add'
    },
  },
  {
    width: '120px',
    dataIndex: 'password',
    title: '密码',
    valueType: 'input',
    formItemAttrs: {
      rules: [{ required: true }],
    },
    isSearch: false,
    isForm: false,
    noTable: true,
    noInfo: true,
    isShowFormItem: (formParam, formType) => {
      return formType === 'add'
    },
  },
  {
    width: '200px',
    dataIndex: 'email',
    title: '邮箱',
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
    dataIndex: 'nickName',
    title: '昵称',
    valueType: 'input',
    formItemAttrs: {
      rules: [{ required: true }],
    },
    isSearch: true,
    isForm: true,
    noTable: false,
  },
  {
    dataIndex: 'positionIds',
    title: '职位',
    valueType: 'select',
    formItemAttrs: {
      rules: [{ required: true }],
    },
    optionMth: findAllPosition,
    formAttrs: {
      mode: 'multiple',
    },
    optionsKey: {
      label: 'title',
      value: 'id',
    },
    noCacheOptionMth: true,
    isForm: true,
    isSearch: true,
    noTable: true,
    noInfo: true,
  },
  {
    width: '120px',
    dataIndex: 'positions',
    title: '职位',
    tableRender: (val: Position[]) => {
      if (!(val && val.length > 0)) return '-'
      return val.map((i) => i.title).join(', ')
    },
  },
  {
    dataIndex: 'departmentIds',
    title: '部门',
    valueType: 'select',
    formItemAttrs: {
      rules: [{ required: true }],
    },
    optionMth: findAllDepartment,
    formAttrs: {
      mode: 'multiple',
    },
    optionsKey: {
      label: 'title',
      value: 'id',
    },
    noCacheOptionMth: true,
    isForm: true,
    isSearch: true,
    noTable: true,
    noInfo: true,
  },
  {
    width: '120px',
    dataIndex: 'departments',
    title: '部门',
    tableRender: (val: Department[]) => {
      if (!(val && val.length > 0)) return '-'
      return val.map((i) => i.title).join(', ')
    },
  },
  {
    dataIndex: 'roleIds',
    title: '角色',
    valueType: 'select',
    formItemAttrs: {
      rules: [{ required: true }],
    },
    optionMth: findAllRole,
    formAttrs: {
      mode: 'multiple',
    },
    optionsKey: {
      label: 'title',
      value: 'id',
    },
    noCacheOptionMth: true,
    isSearch: true,
    isForm: true,
    noTable: true,
    noInfo: true,
  },
  {
    width: '120px',
    dataIndex: 'roles',
    title: '角色',
    tableRender: (val: Role[]) => {
      if (!(val && val.length > 0)) return '-'
      return val.map((i) => i.title).join(', ')
    },
  },
  {
    width: '180px',
    dataIndex: 'loginTime',
    title: '最后登录时间',
    isSearch: false,
    isForm: false,
    noTable: false,
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
    width: '180px',
    dataIndex: 'createdAt',
    title: '创建时间',
    renderType: 'date',
  },
  {
    width: '180px',
    dataIndex: 'updatedAt',
    title: '更新时间',
    renderType: 'date',
  },
  {
    width: '200px',
    dataIndex: 'action',
    fixed: 'right',
    title: '操作',
    noInfo: true,
  },
]
