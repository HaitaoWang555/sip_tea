import { ProItem } from '@/types/components-utils'
import { isTextNull } from '@/utils/components'
import { Button, Card, Descriptions, Spin } from 'antd'
import { useState } from 'react'

export type Props = {
  columnList: ProItem[]
  title?: string
  column?: number
  type?: 'dialog'
  layout?: 'horizontal' | 'vertical'
  setOpen?: (value: React.SetStateAction<boolean>) => void
  formValues?: Record<string, unknown>
  children?: React.ReactNode
}

export default function ProInfo(props: Props) {
  const [loading, setLoading] = useState(true)

  const defaultRender = (val: string | undefined) => {
    return isTextNull(val) ? '-' : val
  }

  if (loading) {
    setLoading(false)
    props.columnList.forEach((i) => {
      if (i.isShowFormItem) i.noInfo = !i.isShowFormItem(props.formValues)
      if (i.tableRender && !i.infoRender) {
        i.infoRender = i.tableRender
      } else if (!i.tableRender && !i.infoRender) {
        i.infoRender = defaultRender
      }
    })
  }

  return (
    <Spin spinning={loading}>
      <Card>
        <Descriptions
          title={props.title}
          bordered
          column={props.column || { xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          layout={props.layout}
        >
          {props.columnList
            .filter((i) => !i.noInfo)
            .map((item) => {
              return (
                <Descriptions.Item key={item.dataIndex} label={item.title} span={item.infoSpan || 1}>
                  {props.formValues && item.infoRender && item.infoRender(props.formValues[item.dataIndex])}
                </Descriptions.Item>
              )
            })}
        </Descriptions>
        {props.children}
      </Card>
      {props.type === 'dialog' && (
        <div className="footer-btn-wrap">
          <Button
            onClick={() => {
              props.setOpen && props.setOpen(false)
            }}
          >
            关闭
          </Button>
        </div>
      )}
    </Spin>
  )
}
