import type { ProItem } from '@/types/components-utils'
import { setFormDefaultValues, transformDate } from '@/utils/components'
import { Card, Col, Form, Row, Spin } from 'antd'
import { useState } from 'react'

import ExpandArea from './expandArea'
import FormItems from './formItems'
import styles from './styles.module.less'

export type Props = {
  columnList: ProItem[]
  onSearch: (values: Record<string, unknown>) => void
  searchBtnLoading?: boolean
  labelWidth?: string
}

function SearchForm(props: Props) {
  const [loading, setLoading] = useState(true)
  const [expand, setExpand] = useState(false)
  const [initialValues, setInitialValues] = useState<Record<string, unknown>>()

  const [form] = Form.useForm()

  function onFinish(values: Record<string, unknown>) {
    props.onSearch(transformDate(values, props.columnList))
  }

  if (loading) {
    setInitialValues(setFormDefaultValues(props.columnList))
    setLoading(false)
  }

  return (
    <div className={styles['pro-searchForm']}>
      <Card bodyStyle={{ paddingBottom: 0 }}>
        {loading ? (
          <Spin />
        ) : (
          <Form
            form={form}
            labelCol={{ flex: props.labelWidth || '80px' }}
            labelAlign="left"
            labelWrap
            initialValues={initialValues}
            wrapperCol={{ flex: '1 1 0%' }}
            autoComplete="off"
            onFinish={onFinish}
          >
            <Row gutter={24}>
              {props.columnList
                .filter((item) => item.isSearch)
                .map((item, index) => {
                  return (
                    <Col
                      span={item.span || 6}
                      key={item.dataIndex}
                      style={{ display: index < 3 || expand ? 'block' : 'none' }}
                    >
                      <Form.Item
                        key={item.dataIndex}
                        {...item.formItemAttrs}
                        rules={undefined}
                        label={item.title}
                        name={item.dataIndex}
                      >
                        {FormItems(item)}
                      </Form.Item>
                    </Col>
                  )
                })}
              {props.columnList.length > 0 && (
                <ExpandArea
                  columnList={props.columnList}
                  expand={expand}
                  resetFields={() => {
                    form.resetFields()
                  }}
                  loading={props.searchBtnLoading}
                  setExpand={(expand) => {
                    setExpand(expand)
                  }}
                />
              )}
            </Row>
          </Form>
        )}
      </Card>
    </div>
  )
}

export default SearchForm
