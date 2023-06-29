import { useContext, useEffect, useState } from 'react'
import type { GenTable, GenTableColumn } from './api'
import { Table, Form, Input, FormInstance, Spin, Select, Switch, SwitchProps, Button } from 'antd'
import React from 'react'
import { optionType } from '@/types/components-utils'

type Props = {
  formParams?: GenTable
  updateColumns?: (column: GenTableColumn, type?: string) => void
}
type Column = {
  dataIndex: string
  valueType: string
  title?: string
  width?: string
  option?: Array<optionType>
}

type MySwitchProps = SwitchProps & {
  value?: number
  onChange?: (checked: number, event: React.MouseEvent<HTMLButtonElement>) => void
}

function MySwitch(props: MySwitchProps) {
  function changeVal(val: boolean, event: React.MouseEvent<HTMLButtonElement>) {
    props.onChange && props.onChange(val ? 1 : 0, event)
  }
  return <Switch {...props} checked={props.value === 1} onChange={changeVal}></Switch>
}

function formItems(item: Column, fn: () => void) {
  if (item.valueType === 'input') {
    return <Input allowClear placeholder={`请输入${item.title}`} onBlur={fn} />
  } else if (item.valueType === 'select') {
    return <Select options={item.option} placeholder={`请选择${item.title}`} allowClear onChange={fn} />
  } else if (item.valueType === 'switch') {
    return <MySwitch onChange={fn} />
  }
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  dataIndex: keyof GenTableColumn & 'action'
  record: GenTableColumn
  index: number
  valueType: string
  option?: Array<optionType>
  children: React.ReactNode
  updateColumns: (column: GenTableColumn) => void
}
const EditableContext = React.createContext<FormInstance<any> | null>(null)

interface EditableRowProps {
  index: number
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}
const EditableCell: React.FC<EditableCellProps> = ({
  dataIndex,
  record,
  valueType,
  option,
  title,
  children,
  updateColumns,
  ...restProps
}) => {
  const form = useContext(EditableContext)

  function save() {
    const values = form?.getFieldsValue()
    Object.assign(record, values)
    updateColumns(record)
  }

  useEffect(() => {
    if (form) {
      form.setFieldsValue({ [dataIndex]: record[dataIndex] })
    }
  }, [])

  return (
    <td {...restProps}>
      {dataIndex === 'action' ? (
        children
      ) : (
        <Form.Item name={dataIndex} style={{ margin: 0 }}>
          {formItems({ dataIndex, valueType, option, title }, save)}
        </Form.Item>
      )}
    </td>
  )
}

export function EdiTable(props: Props) {
  const [data, setData] = useState(props.formParams?.columns)
  const [spin, setSpin] = useState(true)
  const columns: any[] = [
    {
      dataIndex: 'columnName',
      title: '字段名',
      valueType: 'input',
      width: '200px',
      fixed: 'left',
    },
    {
      dataIndex: 'columnComment',
      title: '字段描述',
      valueType: 'input',
      width: '200px',
      fixed: 'left',
    },
    {
      dataIndex: 'columnType',
      title: '字段类型',
      valueType: 'select',
      width: '100px',
      option: [
        {
          label: 'string',
          value: 'string',
        },
        {
          label: 'number',
          value: 'number',
        },
        {
          label: 'boolean',
          value: 'boolean',
        },
        {
          label: 'Date',
          value: 'Date',
        },
      ],
    },
    {
      dataIndex: 'length',
      title: '字符长度',
      valueType: 'input',
      width: '100px',
    },
    {
      dataIndex: 'isPk',
      title: '是否主键',
      valueType: 'switch',
      width: '100px',
    },
    {
      dataIndex: 'isQuery',
      title: '是否查询',
      valueType: 'switch',
      width: '100px',
    },
    {
      dataIndex: 'isForm',
      title: '是否编辑',
      valueType: 'switch',
      width: '100px',
    },
    {
      dataIndex: 'isTable',
      title: '是否列表',
      valueType: 'switch',
      width: '100px',
    },
    {
      dataIndex: 'isInfo',
      title: '是否详情',
      valueType: 'switch',
      width: '100px',
    },
    {
      dataIndex: 'isRequired',
      title: '是否必填',
      valueType: 'switch',
      width: '100px',
    },
    {
      dataIndex: 'queryType',
      title: '查询类型',
      valueType: 'select',
      width: '100px',
      option: [
        {
          label: 'Like',
          value: 'Like',
        },
        {
          label: 'Equal',
          value: 'Equal',
        },
      ],
    },
    {
      dataIndex: 'validatorType',
      title: '校验规则',
      valueType: 'select',
      width: '150px',
      option: [
        {
          label: 'Allow',
          value: 'Allow',
        },
        {
          label: 'IsEnum',
          value: 'IsEnum',
        },
        {
          label: 'IsNotEmpty',
          value: 'IsNotEmpty',
        },
        {
          label: 'IsNumber',
          value: 'IsNumber',
        },
      ],
    },
    {
      dataIndex: 'dictType',
      title: '字典类型',
      valueType: 'select',
      width: '150px',
      option: [
        {
          label: 'Status',
          value: 'Status',
        },
      ],
    },
    {
      width: '80px',
      dataIndex: 'action',
      fixed: 'right',
      title: '操作',
      render: (_: any, record: GenTableColumn) => <a onClick={() => remove(record)}>删除</a>,
    },
  ]

  const defaultData = {
    id: '',
    columnName: '',
    columnComment: '',
    columnType: undefined,
    isPk: 0,
    isTable: 1,
    isForm: 1,
    isQuery: 1,
    isInfo: 1,
    isRequired: 1,
    queryType: undefined,
    dictType: undefined,
  } as unknown as GenTableColumn

  const mergedColumns = columns.map((col) => {
    return {
      ...col,
      onCell: (record: GenTableColumn) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        valueType: col.valueType,
        option: col.option,
        updateColumns: props.updateColumns,
      }),
    }
  })

  function add() {
    defaultData.id = Math.random()
    if (data) {
      setData([...data, defaultData])
    } else {
      setData([defaultData])
    }
  }

  function remove(record: GenTableColumn) {
    if (data) {
      const newData = data.filter((item) => item.id !== record.id)
      setData(newData)
      props.updateColumns && props.updateColumns(record, 'delete')
    }
  }

  useEffect(() => {
    setData(props.formParams?.columns)
    setSpin(false)
  }, [props.formParams])

  return (
    <div style={{ textAlign: 'center', marginLeft: '24px', marginRight: '24px' }}>
      <Spin spinning={spin}>
        {data && data.length > 0 && (
          <Table
            rowKey="id"
            components={{
              body: {
                row: EditableRow,
                cell: EditableCell,
              },
            }}
            scroll={{ x: '2000px' }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            pagination={false}
          />
        )}
      </Spin>
      <div style={{ margin: '12px 0' }}>
        <Button onClick={add}>新增一列</Button>
      </div>
    </div>
  )
}
