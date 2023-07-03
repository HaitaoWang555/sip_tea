import { Outlet } from 'react-router-dom'
import { SettingOutlined } from '@ant-design/icons'

import UserList from '@/pages/system/user/list'
import PositionList from '@/pages/system/position/list'
import DepartmentList from '@/pages/system/department/list'

const systemRouter = {
  path: '/system',
  label: '系统管理',
  icon: <SettingOutlined />,
  element: <Outlet />,
  children: [
    {
      path: '/system/user',
      label: '用户',
      element: <UserList />,
    },
    {
      path: '/system/department',
      label: '部门',
      element: <DepartmentList />,
    },
    {
      path: '/system/position',
      label: '职位',
      element: <PositionList />,
    },
  ],
}

export default systemRouter
