import { useContext, useEffect, useState } from 'react'
import type { GenTable, GenTableColumn } from './api'
import { Table, Form, Input, FormInstance, Spin, Select, Switch, SwitchProps } from 'antd'
import React from 'react'
import { optionType } from '@/types/components-utils'

type Props = {
  formParams?: GenTable
}
type Colomn = {
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

function formItems(item: Colomn, fn: () => void) {
  if (item.valueType === 'input') {
    return <Input allowClear placeholder={`请输入${item.title}`} onBlur={fn} />
  } else if (item.valueType === 'select') {
    return <Select options={item.option} placeholder={`请选择${item.title}`} allowClear onChange={fn} />
  } else if (item.valueType === 'switch') {
    return <MySwitch onChange={fn} />
  }
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  dataIndex: keyof GenTableColumn
  record: GenTableColumn
  index: number
  valueType: string
  option?: Array<optionType>
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
const EditableCell: React.FC<EditableCellProps> = ({ dataIndex, record, valueType, option, title, ...restProps }) => {
  const form = useContext(EditableContext)

  function save() {
    const values = form?.getFieldsValue()
    Object.assign(record, values)
  }

  useEffect(() => {
    if (form) {
      form.setFieldsValue({ [dataIndex]: record[dataIndex] })
    }
  }, [])

  return (
    <td {...restProps}>
      <Form.Item name={dataIndex} style={{ margin: 0 }}>
        {formItems({ dataIndex, valueType, option, title }, save)}
      </Form.Item>
    </td>
  )
}

export function EdiTable(props: Props) {
  const [data, setData] = useState(props.formParams?.columns)
  const [spin, setSpin] = useState(true)
  const columns: Colomn[] = [
    {
      dataIndex: 'columnName',
      title: '字段名',
      valueType: 'input',
      width: '100px',
    },
    {
      dataIndex: 'columnComment',
      title: '字段描述',
      valueType: 'input',
      width: '100px',
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
          label: 'LIKE',
          value: 'LIKE',
        },
        {
          label: 'BETWEEN',
          value: 'BETWEEN',
        },
        {
          label: '=',
          value: '=',
        },
        {
          label: '!=',
          value: '!=',
        },
        {
          label: '>',
          value: '>',
        },
        {
          label: '>=',
          value: '>=',
        },
        {
          label: '<',
          value: '<',
        },
        {
          label: '<=',
          value: '<=',
        },
      ],
    },
    {
      dataIndex: 'dictType',
      title: '字典类型',
      valueType: 'select',
      width: '100px',
      option: [
        {
          label: '状态',
          value: 'status',
        },
      ],
    },
  ]

  const mergedColumns = columns.map((col) => {
    return {
      ...col,
      onCell: (record: GenTableColumn) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        valueType: col.valueType,
        option: col.option,
      }),
    }
  })

  useEffect(() => {
    if (!data && props.formParams?.columns && props.formParams?.columns.length > 0) {
      setData(props.formParams?.columns)
      setSpin(false)
    }
  }, [props.formParams])

  return (
    <Spin spinning={spin}>
      {data && (
        <Table
          rowKey="id"
          components={{
            body: {
              row: EditableRow,
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          pagination={false}
        />
      )}
    </Spin>
  )
}
