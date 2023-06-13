import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { printANSI } from '@/utils/screenLog'
import 'dayjs/locale/zh-cn'
import zhCN from 'antd/locale/zh_CN'
import App from '@/App'

import '@/index.less'
import '@/antd.less'

printANSI()

window['pro-layout-localStoragePrefix'] = 'wlb-admin-'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </HashRouter>
  </React.StrictMode>
)
