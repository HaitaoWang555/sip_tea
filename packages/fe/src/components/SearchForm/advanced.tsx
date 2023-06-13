import type { ProItem, AdvancedFormItem } from '@/types/components-utils'
import { initColumnOptions } from '@/utils/components'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, Select, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useList } from 'react-use'
import FormItems from './formItems'
import styles from './styles.module.less'

export type Props = {
  columnList: ProItem[]
  onSearch?: (values: Record<string, unknown>) => void
  searchBtnLoading?: boolean
  labelWidth?: string
  searchList?: AdvancedFormItem[]
}

function AdvanceSearchForm(props: Props) {
  const [loading, setLoading] = useState(true)
  const [conditionList] = useState<{ label: string; value: string }[]>([
    { label: '等于', value: 'eq' },
    { label: '相似', value: 'like' },
    { label: '以..开始', value: 'right_like' },
    { label: '以..结尾', value: 'left_like' },
    { label: '在...中', value: 'in' },
    { label: '不等于', value: 'ne' },
    { label: '大于', value: 'gt' },
    { label: '大于等于', value: 'ge' },
    { label: '小于', value: 'lt' },
    { label: '小于等于', value: 'le' },
  ])
  const [searchKeys, setSearchKeys] = useState<{ label: string; value: string }[]>()
  const [initialValues, setInitialValues] = useState<Record<string, unknown>>()
  const [columnOptions, { set, updateAt }] = useList<ProItem | undefined>([])

  const [form] = Form.useForm()

  function onFinish(values: Record<string, unknown>) {
    props.onSearch && props.onSearch(values)
  }

  function changeColumn(key: string, index: number) {
    const item = props.columnList.find((i) => i.dataIndex === key)
    if (item) {
      updateAt(index, item)
    }
  }

  if (loading) {
    if (props.searchList) {
      set(initColumnOptions(props.columnList, props.searchList))
      setInitialValues({ advancedQueryList: props.searchList })
    }
    setLoading(false)
  }

  useEffect(() => {
    setSearchKeys(
      props.columnList
        .filter((i) => i.isSearch)
        .map((i) => {
          return {
            label: i.title || '',
            value: i.dataIndex,
          }
        })
    )
    if (props.searchList) {
      set(initColumnOptions(props.columnList, props.searchList))
    }
  }, [props.columnList, props.searchList])

  return (
    <div className={styles['pro-advance-searchForm']}>
      <Card bodyStyle={{ paddingBottom: 0 }}>
        <Spin spinning={loading}>
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
            <Form.List name="advancedQueryList">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <div className={styles.item} key={field.key}>
                      <Form.Item name={[field.name, 'matchKey']}>
                        <Select
                          options={[
                            { label: '并且', value: 'AND' },
                            { label: '或者', value: 'OR' },
                          ]}
                          placeholder="匹配模式"
                          allowClear
                          style={{ width: '100px' }}
                        />
                      </Form.Item>

                      <Form.Item name={[field.name, 'searchKey']}>
                        <Select
                          options={searchKeys}
                          placeholder="请选择查询字段"
                          showSearch
                          allowClear
                          onChange={(key) => {
                            changeColumn(key, index)
                          }}
                          style={{ width: '100px' }}
                        />
                      </Form.Item>

                      <Form.Item name={[field.name, 'condition']}>
                        <Select options={conditionList} placeholder="请选择条件" style={{ width: '100px' }} />
                      </Form.Item>

                      <Form.Item
                        {...columnOptions[index]?.formItemAttrs}
                        rules={undefined}
                        name={[field.name, 'value']}
                      >
                        {columnOptions[index] ? (
                          FormItems(columnOptions[index] as ProItem)
                        ) : (
                          <Input allowClear placeholder="请先选择查询字段" />
                        )}
                      </Form.Item>

                      <div className={styles.operate}>
                        <PlusCircleOutlined onClick={() => add({}, index + 1)} />
                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                      </div>
                    </div>
                  ))}

                  <div style={{ marginBottom: 24 }}>
                    <Button
                      onClick={() => {
                        form.resetFields()
                      }}
                    >
                      重置
                    </Button>
                    <Button
                      style={{ marginLeft: '12px' }}
                      onClick={() => {
                        add({})
                      }}
                    >
                      增加条件
                    </Button>
                    <Button
                      type="primary"
                      loading={props.searchBtnLoading}
                      htmlType="submit"
                      style={{ margin: '0 12px' }}
                    >
                      查询
                    </Button>
                  </div>
                </>
              )}
            </Form.List>
          </Form>
        </Spin>
      </Card>
    </div>
  )
}

export default AdvanceSearchForm
