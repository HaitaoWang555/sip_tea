import { Outlet } from 'react-router-dom'
import { ToolFilled } from '@ant-design/icons'

import GenList from '@/pages/tool/gen/list'

const toolRouter = {
  path: '/tool',
  label: '系统工具',
  icon: <ToolFilled />,
  element: <Outlet />,
  children: [
    {
      path: '/tool/gen',
      label: '代码生成',
      element: <GenList />,
    },
  ],
}

export default toolRouter
