import type { ProItem } from '@/types/components-utils'
import { Button, Col } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { useState } from 'react'

type Props = {
  columnList: ProItem[]
  expand: boolean
  resetFields: () => void
  setExpand: (expand: boolean) => void
  loading?: boolean
}

function ExpandArea(props: Props) {
  const [offset, setOffset] = useState(0)

  function toSetOffset(expand: boolean) {
    if (expand) {
      const allSpanList = props.columnList
        .filter((i) => i.isSearch)
        .map((i) => {
          return i.span || 6
        })

      let num = 0
      allSpanList.forEach((item) => {
        if (num + item > 24) {
          num = 0
        }
        num = num + item
      })

      setOffset(24 - (num % 24) - 6)
    } else {
      setOffset(0)
    }
  }

  return (
    <Col span={6} offset={offset} style={{ textAlign: 'right', marginBottom: '24px' }}>
      <Button
        onClick={() => {
          props.resetFields()
        }}
      >
        重置
      </Button>
      <Button type="primary" loading={props.loading} htmlType="submit" style={{ margin: '0 12px' }}>
        查询
      </Button>
      {props.columnList.filter((item) => item.isSearch).length > 3 && (
        <a
          style={{ fontSize: 14 }}
          onClick={() => {
            props.setExpand(!props.expand)
            toSetOffset(!props.expand)
          }}
        >
          <span style={{ marginRight: 6 }}>{props.expand ? '收起' : '展开'}</span>
          {props.expand ? <UpOutlined /> : <DownOutlined />}
        </a>
      )}
    </Col>
  )
}

export default ExpandArea
