import { Outlet } from 'react-router-dom'
import { SettingOutlined } from '@ant-design/icons'

import UserList from '@/pages/system/user/list'

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
  ],
}

export default systemRouter
