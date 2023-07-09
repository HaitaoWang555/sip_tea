import type { ProItem } from '@/types/components-utils'
import { DatePicker, Input, InputNumber, Select, TreeSelect } from 'antd'
const { RangePicker } = DatePicker

export default function FormItems(item: ProItem) {
  if (item.valueType === 'input' || item.valueType === 'text-area') {
    return <Input {...item.formAttrs} allowClear />
  } else if (item.valueType === 'select') {
    return <Select options={item.option} {...item.formAttrs} allowClear />
  } else if (item.valueType === 'tree-select') {
    return <TreeSelect showSearch treeData={item.option} {...item.formAttrs} allowClear />
  } else if (item.valueType === 'input-number') {
    return <InputNumber {...item.formAttrs} allowClear />
  } else if (item.valueType === 'range-picker') {
    return <RangePicker {...item.formAttrs} style={{ width: '100%' }} allowClear />
  } else if (item.formRender) {
    return item.formRender()
  }
}
