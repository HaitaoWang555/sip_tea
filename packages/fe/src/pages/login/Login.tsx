import ProForm from '@/components/ProForm'
import useColumnList from '@/hooks/columnList'
import { FormInstance, message, Button, Input, Spin, Form } from 'antd'
import { useEffect, useState } from 'react'
import { randomImage, LoginParams } from './api'
import styles from './styles.module.less'
import checkCode from '@/assets/checkcode.png'
import { setToken } from '@/utils/auth'
import { useNavigate } from 'react-router'
import { ProItem } from '@/types/components-utils'
import { useStore } from '@/stores/index'

let randomImageKey = ''

function CaptchaFormItem(props: ProItem) {
  const [randCodeImage, setRandCodeImage] = useState('')
  const [spin, setSpin] = useState(false)
  let lock = false

  function handleChangeCheckCode() {
    if (lock) return
    lock = true
    setSpin(true)
    randomImageKey = new Date().getTime() + ''
    randomImage(randomImageKey)
      .then((res) => {
        setRandCodeImage(res.data.data)
      })
      .finally(() => {
        lock = false
        setSpin(false)
      })
  }

  useEffect(() => {
    handleChangeCheckCode()
    return () => {
      setRandCodeImage('')
    }
  }, [])

  return (
    <div className={styles.captcha}>
      <Form.Item name={props.dataIndex} {...props.formItemAttrs} label={props.title}>
        <Input placeholder="请输入验证码！" allowClear />
      </Form.Item>
      <Spin spinning={spin}>
        <div className={styles.imgWrap}>
          {randCodeImage ? (
            <img id="randCodeImage" src={randCodeImage} onClick={handleChangeCheckCode} />
          ) : (
            <img src={checkCode} onClick={handleChangeCheckCode} />
          )}
        </div>
      </Spin>
    </div>
  )
}

export default function Login() {
  const [list] = useColumnList([
    {
      dataIndex: 'username',
      title: '姓名',
      valueType: 'input',
      isForm: true,
      formItemAttrs: {
        rules: [{ required: true, trigger: 'blur' }],
      },
    },
    {
      dataIndex: 'password',
      title: '密码',
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
      dataIndex: 'captcha',
      title: '验证码',
      formRender: (props: ProItem) => <CaptchaFormItem {...props} />,
      isForm: true,
      formItemAttrs: {
        rules: [{ required: true, trigger: 'blur' }],
      },
    },
  ])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<FormInstance<unknown>>()
  const navigate = useNavigate()
  const login = useStore((state) => state.login)

  function onRender(form: FormInstance<unknown>) {
    setForm(form)
  }

  function resetForm() {
    form?.resetFields()
  }

  function onSubmit(params: LoginParams) {
    setLoading(true)
    params.captchaKey = randomImageKey
    login(params)
      .then((res) => {
        setToken(res.data.data.token)
        navigate('/')
        message.success(res.data.message)
      })
      .catch((err) => {
        console.error(err)
        const node = document.querySelector('#randCodeImage') as HTMLElement
        if (node) node.click()
      })
      .finally(() => {
        setLoading(false)
        resetForm()
      })
  }

  return (
    <>
      <div id="userLayout">
        <ProForm columnList={list} onSubmit={onSubmit} onRender={onRender}>
          <div className="footer-btn-wrap-card">
            <Button onClick={resetForm}>重置</Button>
            <Button type="primary" loading={loading} htmlType="submit">
              提交
            </Button>
          </div>
        </ProForm>
      </div>
    </>
  )
}
