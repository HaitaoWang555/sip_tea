import Info from '@/components/Info'
import useColumnList from '@/hooks/columnList'
import type { ProItem } from '@/types/components-utils'
import { useState } from 'react'

const columnList: ProItem[] = [
  {
    dataIndex: 'username',
    title: '登录名',
  },
  {
    dataIndex: 'password',
    title: '密码',
    noInfo: true,
  },
  {
    dataIndex: 'status',
    title: '状态',
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
    renderType: 'dict',
  },
  {
    dataIndex: 'realName',
    title: '真实姓名',
  },
  {
    dataIndex: 'roleName',
    title: '角色分配',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    dataIndex: 'email',
    title: '邮箱',
  },
  {
    title: '创建人',
    dataIndex: 'createBy',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
]

export default function BaseInfo() {
  const [list] = useColumnList(columnList)
  const [formValues] = useState({
    realName: '管理员',
    isDefault: 1,
    status: 1,
    createBy: '',
    phone: '186****2341',
    createTime: '2019-06-21 17:54:10',
    updateBy: '管理员',
    updateTime: '2022-06-08 15:07:17',
    id: '1539505208027295746',
    delFlag: 1,
    email: '186ssss@163.com',
    username: 'admin',
  })

  return <Info title="用户信息" columnList={list} formValues={formValues}></Info>
}
