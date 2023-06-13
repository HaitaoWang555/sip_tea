import ProForm from '@/components/ProForm'
import { submit } from '../api'
import { useState } from 'react'
import { Button, message } from 'antd'
import { linkage } from './data'
import useColumnList from '@/hooks/columnList'

export default function LinkageProForm() {
  const [list, updateList] = useColumnList(linkage)
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

  return (
    <ProForm columnList={list} labelWidth="120px" updateColumnList={updateList} onSubmit={onSubmit}>
      <Button type="primary" loading={loading} htmlType="submit">
        提交
      </Button>
    </ProForm>
  )
}
