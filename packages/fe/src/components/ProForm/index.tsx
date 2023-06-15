import type { ConvertInterfaceToDict, ProItem } from '@/types/components-utils'
import { formatNullToUndefined, getFormDefaultValues, setFormDefaultValues, transformDate } from '@/utils/components'
import {
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Spin,
  TreeSelect,
  Checkbox,
  Radio,
  FormInstance,
  Button,
} from 'antd'
import { useEffect, useMemo, useState } from 'react'
import MySwitch from './MySwitch'
import MyUpload from './MyUpload'
const { RangePicker } = DatePicker
const { TextArea } = Input
const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group

import styles from './styles.module.less'

export type Props<RecordType> = {
  columnList: ProItem[]
  updateColumnList?: (columnList: ProItem | undefined | ProItem[]) => void
  onSubmit?: (values: ConvertInterfaceToDict<RecordType>) => void
  children?: React.ReactNode
  labelWidth?: string
  formType?: string
  type?: 'dialog'
  confirmLoading?: boolean
  setOpen?: (value: React.SetStateAction<boolean>) => void
  onRender?: (form: FormInstance<unknown>) => void
  formParams?: ConvertInterfaceToDict<RecordType>
}

function formItems(item: ProItem) {
  if (item.valueType === 'input') {
    return <Input {...item.formAttrs} allowClear />
  } else if (item.valueType === 'text-area') {
    return <TextArea {...item.formAttrs} allowClear />
  } else if (item.valueType === 'select') {
    return <Select options={item.option} {...item.formAttrs} allowClear />
  } else if (item.valueType === 'tree-select') {
    return <TreeSelect showSearch treeData={item.option} {...item.formAttrs} allowClear />
  } else if (item.valueType === 'input-number') {
    return <InputNumber {...item.formAttrs} allowClear />
  } else if (item.valueType === 'range-picker') {
    return <RangePicker {...item.formAttrs} style={{ width: '100%' }} allowClear />
  } else if (item.valueType === 'switch') {
    return <MySwitch {...item.formAttrs} />
  } else if (item.valueType === 'checkbox') {
    return <CheckboxGroup {...item.formAttrs} options={item.option} />
  } else if (item.valueType === 'radio') {
    return <RadioGroup {...item.formAttrs} options={item.option} />
  } else if (item.valueType === 'upload') {
    return <MyUpload {...item.formAttrs} />
  } else if (item.valueType === 'custom') {
    return item.formRender(item)
  } else if (item.formRender) {
    return item.formRender(item)
  }
}

function formItemText<RecordType extends object>(props: Props<RecordType> & { item: ProItem }) {
  const key = props.item.dataIndex as keyof RecordType
  return props.formParams && props.formParams[key]
}

function ProForm<RecordType extends object>(props: Props<RecordType>) {
  const [loading, setLoading] = useState(true)
  const [initialValues, setInitialValues] = useState<Record<string, unknown>>()
  const [rows, setRows] = useState<number[]>([])
  const [form] = Form.useForm()

  const hasShowFormItem = useMemo(() => {
    return props.columnList.filter((i) => i.isShowFormItem).length > 0
  }, [props.columnList])

  function onFinish(values: ConvertInterfaceToDict<RecordType>) {
    props.onSubmit && props.onSubmit(transformDate(values, props.columnList))
  }

  function initRows() {
    const arr = Array.from(new Set(props.columnList.filter((item) => item.isForm).map((i) => i.row || 0)))
    setRows(arr)
  }

  function onFormChange(formName: string, info: any) {
    if (formName === 'ProForm') {
      if (!hasShowFormItem) return
      linkForm(info.forms['ProForm'].getFieldsValue())
    }
  }

  function linkForm(params: any) {
    if (hasShowFormItem && ['add', 'edit', undefined].includes(props.formType)) {
      props.columnList.forEach((i) => {
        if (i.isShowFormItem) {
          if (Boolean(i.isForm) !== i.isShowFormItem(params, props.formType)) {
            i.isForm = !i.isForm
            props.updateColumnList && props.updateColumnList(i)
          }
        }
      })
    }
  }

  useEffect(() => {
    if (props.columnList && props.columnList.length && rows.length === 0) {
      initRows()
      setInitialValues(setFormDefaultValues(props.columnList))
      setLoading(false)
    }
  }, [props.columnList])

  useEffect(() => {
    if (props.columnList && props.columnList.length) {
      linkForm(getFormDefaultValues(props.columnList))
    }
  }, [props.formType])

  useEffect(() => {
    if (props.formParams) {
      linkForm(props.formParams)
      form.setFieldsValue(formatNullToUndefined(props.formParams))
    }
  }, [props.formParams])

  useEffect(() => {
    props.onRender && props.onRender(form)
  }, [])

  return (
    <div className={styles['pro-form']}>
      {loading ? (
        <Spin />
      ) : (
        <Form.Provider onFormChange={onFormChange}>
          <Form
            name="ProForm"
            form={form}
            labelCol={{ flex: props.labelWidth || '82px' }}
            labelAlign="left"
            labelWrap
            initialValues={initialValues}
            wrapperCol={{ flex: '1 1 0%' }}
            autoComplete="off"
            onFinish={onFinish}
          >
            {rows.map((row, i) => {
              return (
                <Card bodyStyle={{ paddingBottom: 0 }} key={i} style={{ marginTop: i !== 0 ? 20 : 'auto' }}>
                  <Row gutter={24}>
                    {props.columnList
                      .filter((item) => item.isForm && item.row === i)
                      .map((item) => {
                        return (
                          <Col span={item.formSpan || 24} key={item.dataIndex}>
                            <Form.Item
                              key={item.dataIndex}
                              {...item.formItemAttrs}
                              label={item.title}
                              name={item.valueType && item.valueType !== 'text' ? item.dataIndex : undefined}
                              noStyle={Boolean(item.formRender) && item.valueType !== 'custom'}
                              className={['radio', 'checkbox', 'switch'].includes(item.valueType || '') ? 'left' : ''}
                            >
                              {item.valueType === 'text' ? formItemText({ ...props, item }) : formItems(item)}
                            </Form.Item>
                          </Col>
                        )
                      })}
                  </Row>
                </Card>
              )
            })}
            {props.children && <div style={{ marginTop: 20 }}>{props.children}</div>}
            {props.type === 'dialog' && (
              <div className="footer-btn-wrap">
                <Button
                  onClick={() => {
                    props.setOpen && props.setOpen(false)
                  }}
                >
                  关闭
                </Button>
                <Button type="primary" loading={props.confirmLoading} htmlType="submit">
                  提交
                </Button>
              </div>
            )}
          </Form>
        </Form.Provider>
      )}
    </div>
  )
}

export default ProForm
