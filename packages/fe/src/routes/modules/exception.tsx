import { Outlet } from 'react-router-dom'
import { WarningOutlined } from '@ant-design/icons'

import Exception404 from '@/pages/exception/404'
import Exception403 from '@/pages/exception/403'
import Exception500 from '@/pages/exception/500'

const exceptionRouter = {
  path: '/exception',
  icon: <WarningOutlined />,
  label: '异常页',
  element: <Outlet />,
  children: [
    {
      path: '/exception/403',
      label: '403',
      element: <Exception403 />,
    },
    {
      path: '/exception/404',
      label: '404',
      element: <Exception404 />,
    },
    {
      path: '/exception/500',
      label: '500',
      element: <Exception500 />,
    },
  ],
}

export default exceptionRouter
