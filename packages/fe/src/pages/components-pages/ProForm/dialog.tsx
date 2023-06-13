import DialogProForm from '@/components/ProForm/dialog'
import { submit } from '../api'
import { useState } from 'react'
import { Button, message } from 'antd'
import { baseData } from './data'
import useColumnList from '@/hooks/columnList'

export default function DialogForm() {
  const [open, setOpen] = useState(false)
  const [list] = useColumnList(baseData)
  const [loading, setLoading] = useState(false)

  function show() {
    setOpen(true)
  }

  function onSubmit(params: any) {
    console.log(params)
    setLoading(true)
    submit()
      .then((res) => {
        console.log(res)
        message.success(res.data.message)
        setOpen(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Button type="primary" onClick={show}>
        Open Form Modal
      </Button>
      <DialogProForm
        open={open}
        title="title"
        setOpen={setOpen}
        columnList={list}
        onSubmit={onSubmit}
        confirmLoading={loading}
      ></DialogProForm>
    </>
  )
}
