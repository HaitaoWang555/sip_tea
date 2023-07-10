import ProForm from '@/components/ProForm'
import useColumnList from '@/hooks/columnList'
import { Avatar, Button, Form, message } from 'antd'
import { useEffect, useState } from 'react'
import { updateAccount, uploadImg } from '../api'
import { useStore } from '@/stores/index'
import { ProfileDto as User } from '@/pages/login/api'
import omit from 'lodash-es/omit'
import { ProItem } from '@/types/components-utils'
import styles from './styles.module.less'
import MyUpload from '@/components/ProForm/MyUpload'
import { columnList } from './data'

type FormValue = Omit<User, 'positions' | 'departments'> & {
  position?: string
  department?: string
}

function SettingsBase() {
  const [loading, setLoading] = useState(false)
  const [formParams, setFormParams] = useState<FormValue>({} as FormValue)
  const user = useStore((state) => state.user)
  const getInfo = useStore((state) => state.getInfo)

  function UploadIcon(props: { item: ProItem; formParams: FormValue | undefined }) {
    return (
      <div className={styles.uploadIcon}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={
            (props.formParams && props.formParams.icon) ||
            'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
          }
          alt="avatar"
        />
        <Form.Item name={props.item.dataIndex} {...props.item.formItemAttrs} label={props.item.title}>
          <MyUpload {...props.item.formAttrs} style={{ marginLeft: '30px' }} />
        </Form.Item>
      </div>
    )
  }

  function uploadChange(val: string) {
    setFormParams({ ...formParams, icon: val })
  }

  const [list, updateList] = useColumnList(columnList)

  useEffect(() => {
    if (!user.id) return
    const formValues: FormValue = omit(user, ['positions', 'departments'])
    formValues.department = user.departments ? user.departments.map((i) => i.title).join(',') : ''
    formValues.position = user.positions ? user.positions.map((i) => i.title).join(',') : ''
    setFormParams(formValues)
  }, [user])

  useEffect(() => {
    updateList({
      dataIndex: 'icon',
      formRender: (props: ProItem) => <UploadIcon item={props} formParams={formParams} />,
      formAttrs: {
        accept: '.png,.jpg,.jpeg',
        actionMethod: uploadImg,
        uploadChange: uploadChange,
      },
    })
  }, [formParams])

  function onSubmit(params: FormValue) {
    setLoading(true)
    params.id = user.id
    updateAccount(params)
      .then((res) => {
        message.success(res.data.message)
        getInfo()
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <ProForm columnList={list} formParams={formParams} onSubmit={onSubmit}>
      <div className="footer-btn-wrap-card">
        <Button type="primary" loading={loading} htmlType="submit">
          更新信息
        </Button>
      </div>
    </ProForm>
  )
}

export default SettingsBase
