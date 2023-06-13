import Dialog from '@/components/Dialog'
import { Button } from 'antd'
import { useState } from 'react'

export default function BaseDialog() {
  const [open, setOpen] = useState(false)

  function show() {
    setOpen(true)
  }

  function ok() {
    setOpen(false)
  }

  return (
    <>
      <Button type="primary" onClick={show}>
        Open Modal
      </Button>
      <Dialog open={open} title="title" setOpen={setOpen} onOk={ok}>
        pppp
      </Dialog>
    </>
  )
}
