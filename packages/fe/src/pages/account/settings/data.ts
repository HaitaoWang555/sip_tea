import type { ProItem } from '@/types/components-utils'

export const columnList: ProItem[] = [
  {
    dataIndex: 'username',
    title: '姓名',
    width: '180px',
    valueType: 'input',
    isForm: true,
    formAttrs: { disabled: true },
  },
  {
    dataIndex: 'email',
    title: '邮箱',
    width: '180px',
    valueType: 'input',
    isForm: true,
    formItemAttrs: {
      rules: [{ required: true, trigger: 'blur' }],
    },
  },
  {
    dataIndex: 'nickName',
    title: '昵称',
    width: '180px',
    valueType: 'input',
    isForm: true,
    formItemAttrs: {
      rules: [{ required: true, trigger: 'blur' }],
    },
  },
  {
    dataIndex: 'icon',
    title: '头像',
    isForm: true,
  },
  {
    dataIndex: 'role',
    title: '角色',
  },
  {
    dataIndex: 'position',
    title: '职位',
    isForm: true,
    valueType: 'text',
  },
  {
    dataIndex: 'department',
    title: '部门',
    isForm: true,
    valueType: 'text',
  },
  {
    dataIndex: 'loginTime',
    title: '登录时间',
    width: '180px',
    valueType: 'text',
    isForm: true,
  },
]
