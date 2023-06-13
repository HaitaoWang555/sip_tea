import { useState } from 'react'
import { Layout } from 'antd'
import Sider from './components/Sider'
import Header from './components/Header'
import Content from './components/Content'
import './base.less'
const App = () => {
  const [headerHeight] = useState(48) // Header Height
  const [siderWidth] = useState(200) // Sider width
  const [siderCollapsedWidth] = useState(80) // Sider width
  const [layoutMarginLeft, setLayoutMarginLeft] = useState(200) // Sider width

  function triggerClick(collapsed: boolean) {
    setLayoutMarginLeft(collapsed ? siderCollapsedWidth : siderWidth)
  }

  return (
    <Layout>
      <Header
        height={headerHeight}
        image="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        title="Ant Design Pro"
      />
      <Layout>
        <Sider top={headerHeight} width={siderWidth} collapsedWidth={siderCollapsedWidth} triggerClick={triggerClick} />
        <Layout style={{ padding: '0 24px 24px', marginTop: headerHeight + 'px', marginLeft: layoutMarginLeft + 'px' }}>
          <Content height={headerHeight} />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App
