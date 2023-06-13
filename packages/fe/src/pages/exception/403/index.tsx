import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'

export default function Error403() {
  return (
    <Result
      status="403"
      title="403"
      style={{
        background: 'none',
      }}
      subTitle="Sorry, you don't have access to this page."
      extra={
        <Link to="/">
          <Button type="primary">Back to home</Button>
        </Link>
      }
    />
  )
}
