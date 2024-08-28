import ProForm from '@/components/ProForm'
import useColumnList from '@/hooks/columnList'
import { message, Button, Input, Spin, Form } from 'antd'
import { useEffect, useState } from 'react'
import { randomImage, SignInDto } from './api'
import styles from './styles.module.less'
import checkCode from '@/assets/checkcode.png'
import { setToken } from '@/utils/auth'
import { useNavigate } from 'react-router'
import { ProItem } from '@/types/components-utils'
import { useStore } from '@/stores/index'

let randomImageKey = ''

const columnList: ProItem[] = [
  {
    dataIndex: 'username',
    title: '姓名',
    valueType: 'input',
    isForm: true,
    defaultValue: 'guest',
    formItemAttrs: {
      rules: [{ required: true, trigger: 'blur' }],
    },
  },
  {
    dataIndex: 'password',
    title: '密码',
    valueType: 'input',
    isForm: true,
    defaultValue: 'guest',
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
]

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
            <div
              id="randCodeImage"
              dangerouslySetInnerHTML={{ __html: randCodeImage }}
              onClick={handleChangeCheckCode}
            ></div>
          ) : (
            <img src={checkCode} onClick={handleChangeCheckCode} />
          )}
        </div>
      </Spin>
    </div>
  )
}

export default function Login() {
  const [list] = useColumnList(columnList)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const login = useStore((state) => state.login)
  const getInfo = useStore((state) => state.getInfo)

  function onSubmit(params: SignInDto) {
    setLoading(true)
    params.captchaKey = randomImageKey
    login(params)
      .then((res) => {
        setToken(res.data.data.token)
        getInfo().then(() => {
          navigate('/')
        })
        message.success(res.data.message)
      })
      .catch((err) => {
        console.error(err)
        const node = document.querySelector('#randCodeImage') as HTMLElement
        if (node) node.click()
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <div className={styles.userLayout}>
        <ProForm columnList={list} onSubmit={onSubmit}>
          <div className="footer-btn-wrap-card">
            <Button type="primary" loading={loading} htmlType="submit" size="large" style={{ width: '100%' }}>
              登录
            </Button>
          </div>
        </ProForm>
      </div>
    </>
  )
}
