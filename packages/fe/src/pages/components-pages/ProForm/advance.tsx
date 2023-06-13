import ProForm from '@/components/ProForm'
import { submit } from '../api'
import { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import { advance } from './data'
import useColumnList from '@/hooks/columnList'

function MyRender(props: any) {
  console.log(props)
  return <div>MyRender</div>
}

export default function AdvanceProForm() {
  const [list, updateList] = useColumnList(advance)
  const [loading, setLoading] = useState(false)

  function onSubmit(params: any) {
    console.log(params)
    setLoading(true)
    submit()
      .then((res) => {
        console.log(res)
        message.success(res.data.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    updateList({ dataIndex: 'routerText', formRender: MyRender })
  }, [])

  return (
    <ProForm labelWidth="90px" columnList={list} onSubmit={onSubmit}>
      <Button type="primary" loading={loading} htmlType="submit">
        提交
      </Button>
    </ProForm>
  )
}
