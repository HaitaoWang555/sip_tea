import { Outlet } from 'react-router-dom'
import { SettingOutlined } from '@ant-design/icons'

import PositionList from '@/pages/system/position/list'
import DepartmentList from '@/pages/system/department/list'
import RoleList from '@/pages/system/role/list'
import MenuList from '@/pages/system/menu/list'
import UserList from '@/pages/system/user/list'
import ResourceList from '@/pages/system/resource/list'

const systemRouter = {
  path: '/system',
  label: '系统管理',
  icon: <SettingOutlined />,
  element: <Outlet />,
  children: [
    {
      path: '/system/menu',
      label: '菜单',
      element: <MenuList />,
    },
    {
      path: '/system/resource',
      label: '资源',
      element: <ResourceList />,
    },
    {
      path: '/system/user',
      label: '用户',
      element: <UserList />,
    },
    {
      path: '/system/role',
      label: '角色',
      element: <RoleList />,
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
