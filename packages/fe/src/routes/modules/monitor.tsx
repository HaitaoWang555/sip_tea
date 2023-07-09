import { Outlet } from 'react-router-dom'
import { MonitorOutlined } from '@ant-design/icons'

import CacheList from '@/pages/monitor/cache/list'

const monitorRouter = {
  path: '/monitor',
  icon: <MonitorOutlined />,
  label: '系统监控',
  element: <Outlet />,
  children: [
    {
      path: '/monitor/cache',
      label: '缓存管理',
      element: <CacheList />,
    },
  ],
}

export default monitorRouter
