import { Layout } from 'antd'
const { Header } = Layout
import RightContent from '../RightContent'
import './styles.less'

type Props = {
  height: number
  image: string
  title: string
}

const MyHeader = (props: Props) => {
  return (
    <Header
      style={{ padding: '0 24px', height: props.height, lineHeight: props.height + 'px' }}
      className="global-header-logo"
    >
      <a>
        <img src={props.image} />
        <h1>{props.title}</h1>
      </a>
      <RightContent />
    </Header>
  )
}

export default MyHeader
