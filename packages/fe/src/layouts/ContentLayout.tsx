import { Layout } from 'antd'
import Content from './components/Content'

export default function ContentLayout() {
  return (
    <Layout style={{ padding: '0 24px 24px' }}>
      <Content height={0} />
    </Layout>
  )
}
