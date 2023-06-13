import { Layout, Spin } from 'antd'
import { Suspense } from 'react'
const { Content } = Layout
import { Outlet } from 'react-router'

type Props = {
  height: number
}

const MyContent = (props: Props) => {
  return (
    <Content
      style={{
        position: 'relative',
        marginTop: '24px',
        minHeight: `calc(100vh - ${props.height + 48}px)`,
      }}
    >
      <Suspense
        fallback={
          <div
            style={{
              textAlign: 'center',
              margin: '200px auto',
              width: '100%',
              height: '100%',
            }}
          >
            <Spin></Spin>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </Content>
  )
}

export default MyContent
