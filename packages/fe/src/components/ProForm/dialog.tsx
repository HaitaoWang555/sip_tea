import ProForm, { Props as ProFormProps } from './index'
import Dialog, { Props as DialogProps } from '../Dialog'
import { FormInstance } from 'antd'
import { useState } from 'react'

export type Props = ProFormProps<unknown> & DialogProps

export default function DialogProForm(props: Props) {
  const [FormInstanceVal, setFormInstanceVal] = useState<FormInstance<unknown>>()

  function saveForm(form: FormInstance<unknown>) {
    setFormInstanceVal(form)
  }

  function dialogClose() {
    FormInstanceVal && FormInstanceVal.resetFields()
  }

  return (
    <>
      <Dialog {...props} footer={null} afterClose={dialogClose} wrapClassName="proDialog">
        <ProForm {...props} type="dialog" onRender={saveForm}></ProForm>
      </Dialog>
    </>
  )
}
