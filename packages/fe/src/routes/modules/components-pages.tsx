import { Outlet } from 'react-router-dom'
import { AppstoreOutlined } from '@ant-design/icons'
import SearchFormBase from '@/pages/components-pages/SearchForm/base'
import ProTableBase from '@/pages/components-pages/ProTable/base'
import DialogBase from '@/pages/components-pages/Dialog/base'
import ProFormBase from '@/pages/components-pages/ProForm/base'
import ProFormLinkage from '@/pages/components-pages/ProForm/linkage'
import ProFormAdvance from '@/pages/components-pages/ProForm/advance'
import ProFormDialog from '@/pages/components-pages/ProForm/dialog'
import InfoBase from '@/pages/components-pages/Info/base'
import CrudBase from '@/pages/components-pages/Crud/base'

const componentsPagesRouter = {
  path: '/components',
  label: '组件',
  element: <Outlet />,
  icon: <AppstoreOutlined />,
  children: [
    {
      path: '/components/searchForm',
      label: '搜索表单',
      element: <SearchFormBase />,
    },
    {
      path: '/components/proTable',
      label: '高级表格',
      element: <ProTableBase />,
    },
    {
      path: '/components/dialogBase',
      label: '弹窗',
      element: <DialogBase />,
    },
    {
      path: '/components/infoBase',
      label: '详情',
      element: <InfoBase />,
    },
    {
      path: '/components/proForm',
      label: '高级表单',
      children: [
        {
          path: '/components/proForm/base',
          label: '基础',
          element: <ProFormBase />,
        },
        {
          path: '/components/proForm/linkage',
          label: '联动',
          element: <ProFormLinkage />,
        },
        {
          path: '/components/proForm/advance',
          label: '高级',
          element: <ProFormAdvance />,
        },
        {
          path: '/components/proForm/dialog',
          label: '弹窗',
          element: <ProFormDialog />,
        },
      ],
    },
    {
      path: '/components/crud',
      label: 'CRUD',
      element: <CrudBase />,
    },
  ],
}

export default componentsPagesRouter
