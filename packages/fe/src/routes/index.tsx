/* eslint-disable react-refresh/only-export-components */

import { RouteObject } from 'react-router-dom'
import BasicLayout from '@/layouts/BasicLayout'
import ContentLayout from '@/layouts/ContentLayout'
import Exception404 from '@/pages/exception/404'
import Exception403 from '@/pages/exception/403'
import Login from '@/pages/login/Login'

const modules = import.meta.glob('./modules/*.tsx', { eager: true })

const allRouterModules = Object.values(modules).map((i: any) => i.default)
const constantRoutesPath: string[] = ['/']
const constantRoutes: RouteObject[] = [
  {
    path: '/w',
    element: <ContentLayout />,
    children: [
      {
        path: '/w/login',
        element: <Login />,
        hidden: true,
      },
    ],
  },
  { path: '/403', element: <Exception403 />, hidden: true },
  { path: '/404', element: <Exception404 />, hidden: true },
  { path: '*', element: <Exception404 />, hidden: true },
]

const routes: RouteObject[] = [
  {
    path: '/',
    element: <BasicLayout />,
    children: [...allRouterModules],
  },
  ...constantRoutes,
]

function getConstantRoutesPath(arr: RouteObject[]) {
  arr.forEach((i) => {
    constantRoutesPath.push(i.path || '')
    if (i.children && i.children.length > 0) {
      getConstantRoutesPath(i.children)
    }
  })
}

getConstantRoutesPath(constantRoutes)

export { routes, constantRoutes, constantRoutesPath }
