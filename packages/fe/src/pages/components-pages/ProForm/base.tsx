import ProForm from '@/components/ProForm'
import { submit } from '../api'
import { useState } from 'react'
import { Button, FormInstance, message } from 'antd'
import { baseData } from './data'
import useColumnList from '@/hooks/columnList'

let formInstance: FormInstance<unknown>

export default function BaseProForm() {
  const [list] = useColumnList(baseData)
  const [loading, setLoading] = useState(false)

  function onRender(form: FormInstance<unknown>) {
    formInstance = form
  }

  function resetForm() {
    formInstance?.resetFields()
  }

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
        resetForm()
      })
  }

  return (
    <ProForm columnList={list} onSubmit={onSubmit} onRender={onRender}>
      <div className="footer-btn-wrap-card">
        <Button onClick={resetForm}>重置</Button>
        <Button type="primary" loading={loading} htmlType="submit">
          提交
        </Button>
      </div>
    </ProForm>
  )
}
