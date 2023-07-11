import { Outlet } from 'react-router-dom'
import { MonitorOutlined } from '@ant-design/icons'

import CacheList from '@/pages/monitor/cache/list'
import OperatelogList from '@/pages/monitor/operateLog/list'

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
    {
      path: '/monitor/operateLog',
      label: '操作日志',
      element: <OperatelogList />,
    },
  ],
}

export default monitorRouter
