import { Outlet } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'

import Settings from '@/pages/account/settings'

const dashboardRouter = {
  path: '/account',
  label: '个人页',
  element: <Outlet />,
  icon: <UserOutlined />,
  children: [
    {
      path: '/account/settings',
      label: '个人设置',
      element: <Settings />,
    },
  ],
}

export default dashboardRouter
