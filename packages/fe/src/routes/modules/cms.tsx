import { Outlet } from 'react-router-dom'
import { ReadOutlined } from '@ant-design/icons'

import PoetryList from '@/pages/cms/poetry/list'

const cmsRouter = {
  path: '/cms',
  label: '内容管理',
  icon: <ReadOutlined />,
  element: <Outlet />,
  children: [
    {
      path: '/cms/poetry',
      label: '诗词',
      element: <PoetryList />,
    },
  ],
}

export default cmsRouter
