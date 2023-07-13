import ProForm from '@/components/ProForm'
import useColumnList from '@/hooks/columnList'
import { message, Button, Divider, FormInstance } from 'antd'
import { useState } from 'react'
import { UpdatePassword, updatePassword } from '../api'
import { ProItem } from '@/types/components-utils'
import { useStore } from '@/stores'

let formInstance: FormInstance<unknown>

export default function Security() {
  const securityColumnList: ProItem[] = [
    {
      dataIndex: 'oldPassword',
      title: '原密码',
      valueType: 'input',
      isForm: true,
      formItemAttrs: {
        rules: [{ required: true, trigger: 'blur' }],
      },
      formAttrs: {
        type: 'password',
      },
    },
    {
      dataIndex: 'newPassword',
      title: '新密码',
      valueType: 'input',
      isForm: true,
      formItemAttrs: {
        validateTrigger: ['onChange', 'onBlur'],
        rules: [{ required: true, validateTrigger: 'onBlur' }],
      },
      formAttrs: {
        type: 'password',
      },
    },
    {
      dataIndex: 'confirmPassword',
      title: '确认密码',
      valueType: 'input',
      isForm: true,
      formItemAttrs: {
        validateTrigger: ['onChange', 'onBlur'],
        rules: [{ required: true, validator: checkConfirmPassword, validateTrigger: 'onBlur' }],
      },
      formAttrs: {
        type: 'password',
      },
    },
  ]

  const [list] = useColumnList(securityColumnList)
  const [loading, setLoading] = useState(false)
  const logout = useStore((state) => state.logout)

  function onRender(form: FormInstance<unknown>) {
    formInstance = form
  }

  function checkConfirmPassword(rule: any, value: string) {
    const newPassword = formInstance?.getFieldValue('newPassword')
    return new Promise((resolve, reject) => {
      if (!value) {
        rule.message = '请输入确认密码！'
        reject()
      } else {
        if (newPassword === value) {
          resolve(value)
        } else {
          rule.message = '新密码与确认密码不一致！'
          reject()
        }
      }
    })
  }

  function onSubmit(params: UpdatePassword) {
    setLoading(true)
    updatePassword(params)
      .then((res) => {
        message.success(res.data.message)
        logout().then(() => {
          // window.location.href = '/#/w/login'
        })
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <div>
        <Divider>密码管理</Divider>
        <ProForm columnList={list} onSubmit={onSubmit} onRender={onRender}>
          <div className="footer-btn-wrap-card">
            <Button type="primary" loading={loading} htmlType="submit" style={{ width: '100%' }}>
              提交
            </Button>
          </div>
        </ProForm>
      </div>
    </>
  )
}
