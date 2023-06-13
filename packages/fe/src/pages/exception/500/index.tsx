import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'

export default function Error500() {
  return (
    <Result
      status="500"
      title="500"
      style={{
        background: 'none',
      }}
      subTitle="Sorry, the server is reporting an error."
      extra={
        <Link to="/">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  )
}
