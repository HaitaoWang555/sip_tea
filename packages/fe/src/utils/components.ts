import type {
  ProItem,
  radioValType,
  selectValType,
  optionType,
  ConvertInterfaceToDict,
  AdvancedFormItem,
} from '@/types/components-utils'
import dayjs from 'dayjs'
export const inputType = ['input', 'input-number', 'text-area']
export const changeType = ['switch', 'date-picker', 'select', 'tree-select', 'tree', 'radio', 'checkbox']
export const rangeType = ['range-picker']

export function setPlaceholderAndRulesMessage(item: ProItem): ProItem {
  if (!(item.isForm || item.isSearch || item.isShowFormItem)) return item
  if (!item.valueType) return item
  let placeholder: string | undefined = ''
  if (inputType.includes(item.valueType)) {
    placeholder = `请输入${item.title}`
  } else if (changeType.includes(item.valueType)) {
    placeholder = `请选择${item.title}`
  } else if (rangeType.includes(item.valueType)) {
    placeholder = undefined
  }
  if (!item.formAttrs) item.formAttrs = {}
  // RulesMessage
  if (item.formItemAttrs && item.formItemAttrs.rules) {
    item.formItemAttrs.rules.forEach((i: any) => {
      if (!i.message) i.message = placeholder
    })
  }
  Object.assign(item.formAttrs, { placeholder })
  return item
}

export function setRender(item: ProItem) {
  let render
  if (item.renderType === 'dict') {
    if (!item.option || item.option.length === 0) return
    render = (val: any) => {
      return getDictText(val, item.option)
    }
  } else if (item.renderType === 'date') {
    render = (val: any) => {
      return getDateText(val, (item.formAttrs && item.formAttrs.format) || DateFormat.DatePicker)
    }
  }
  if (render) item.tableRender = render
}

export function formatColumnList(
  list: ProItem[],
  responseKey: string,
  callback?: (element?: ProItem, index?: number) => void
): ProItem[] {
  return list.map((item, index) => {
    item.row = item.row ? item.row : 0
    if (!item.width) item.width = item.title ? item.title.length * 40 : 0
    item = setPlaceholderAndRulesMessage(item)
    setRender(item)
    if (item.valueType && ['select', 'tree-select'].includes(item.valueType) && item.optionMth && callback) {
      item.option = []
      formatOPtions(responseKey, item, index, callback)
    }
    return item
  })
}

export function findObjValByDeepKey(obj: any, key: string) {
  if (key === 'null') {
    return null
  }
  let val = Object.assign({}, obj)
  key.split('.').forEach((i) => {
    if (!val) return []
    val = val[i]
  })
  return val
}

/**
 * 格式化表单中下拉框数据
 * @param element: ProItem
 * @returns void
 */
export function formatOPtions(
  responseKey: string,
  element: ProItem,
  index: number,
  callback?: (element?: ProItem, index?: number) => void
) {
  element.optionMth &&
    element
      .optionMth(element.optionMthParams)
      .then((res: any) => {
        if (!res) return
        element.defaultOption = element.defaultOption ? element.defaultOption : []
        const arr = findObjValByDeepKey(res, responseKey)
        element.option = element.defaultOption.concat(formatArr(arr, element))
        setRender(element)
        if (callback) callback(element, index)
      })
      .finally(() => {
        if (!element.noCacheOptionMth) delete element.optionMth
      })
}

function formatArr(arr: Array<any>, element: ProItem) {
  return arr.map((i: any) => {
    const obj = Object.assign({}, i)
    if (element.formatOption) {
      element.formatOption(i)
    }

    if (element.optionsKey) {
      obj.label = i[element.optionsKey.label]
      obj.value = i[element.optionsKey.value]
    } else {
      obj.label = i['label']
      obj.value = i['value']
    }

    if (obj.children && obj.children.length > 0) {
      obj.children = formatArr(obj.children, element)
    }
    return obj
  })
}

export enum DateFormat {
  DatePicker = 'YYYY-MM-DD',
  DatePickerYear = 'YYYY',
  DatePickerQuarter = 'YYYY-QQ',
  DatePickerMonth = 'YYYY-MM',
  DatePickerWeek = 'YYYY-wo',
  RangePicker = 'YYYY-MM-DD HH:mm:ss',
}

export function setFormDefaultValues(item: ProItem[]) {
  const form: Record<string, any> = {}
  item.forEach((i) => {
    if (i.defaultValue !== undefined) {
      if (i.valueType === 'date-picker') {
        form[i.dataIndex] = dayjs(i.defaultValue, (i.formAttrs && i.formAttrs.format) || DateFormat.DatePicker)
      } else if (i.valueType === 'range-picker') {
        form[i.dataIndex] =
          i.defaultValue && i.defaultValue.length > 0
            ? i.defaultValue.map((v: string) => dayjs(v, (i.formAttrs && i.formAttrs.format) || DateFormat.DatePicker))
            : []
      } else {
        form[i.dataIndex] = i.defaultValue
      }
    }
  })
  return form
}

export function transformData<RecordType>(values: any, columnList: ProItem[]) {
  const params: Record<string, any> = {}
  for (const key in values) {
    const item = columnList.find((i) => i.dataIndex === key)
    if (!item) continue
    if (item.valueType === 'date-picker') {
      params[key] = values[key].format((item.formAttrs && item.formAttrs.format) || DateFormat.DatePicker)
    } else if (item.valueType === 'range-picker') {
      params[key] =
        values[key] && values[key].length > 0
          ? values[key].map((i: any) => i.format((item.formAttrs && item.formAttrs.format) || DateFormat.DatePicker))
          : []
    } else {
      if (typeof values[key] === 'string') {
        values[key] = values[key].trim()
      }
      params[key] = values[key]
      if (['', undefined, null].includes(values[key])) {
        delete params[key]
      }
    }
  }
  return params as ConvertInterfaceToDict<RecordType>
}

export function changeColumn(column: ProItem, columnList: ProItem[], setList?: any) {
  const index = columnList.findIndex((i) => i.dataIndex === column.dataIndex)
  Object.assign(columnList[index], column)
  if (index > -1) {
    setList && setList(Object.assign([], columnList))
  }
}

export function getDictText(val: radioValType | selectValType, dict?: Array<optionType>): string | number | undefined {
  if (!dict) return
  const index = dict.findIndex((i) => i.value === val)
  if (index > -1) {
    return dict[index].label
  } else {
    return '-'
  }
}

export function getDateText(val: string, type: string) {
  return val ? dayjs(val).format(type) : '-'
}

export function equalObject(obj: any, obj2: any): boolean {
  return JSON.stringify(obj) === JSON.stringify(obj2)
}

export function getFormDefaultValues(columnList: ProItem[]) {
  const obj: Record<string, unknown> = {}
  columnList.forEach((i) => {
    if (i.defaultValue !== undefined) {
      obj[i.dataIndex] = i.defaultValue
    }
  })
  return obj
}

export function formatNullToUndefined(obj: Record<string, any>) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (obj[key] === null) {
        obj[key] = undefined
      } else if (typeof obj[key] === 'object' && !(obj[key] instanceof Array)) {
        formatNullToUndefined(obj[key])
      }
    }
  }
  return obj
}

export function isTextNull(val: unknown) {
  return val === '' || val === undefined || val === null
}

export function equalColumnList(arr1: ProItem[], arr2: ProItem[]) {
  if (arr1.length !== arr2.length) {
    return false
  }
  return arr1.every((element, index) => element === arr2[index])
}

export function initTableWidth(columnList: ProItem[]) {
  if (!columnList || columnList.length === 0) return 'auto'
  const arr = columnList
    .filter((i) => !i.noTable)
    .map((i) => {
      let width = 0
      if (!i.width) {
        width = i.title ? i.title.length * 40 : 0
      } else if (typeof i.width === 'string') {
        width = Number(i.width.replace('px', ''))
      } else if (typeof i.width === 'number') {
        width = i.width
      }
      return width
    })
  return arr.reduce((a, b) => a + b)
}

export function initColumnOptions(columnList: ProItem[], advancedList: AdvancedFormItem[]): (ProItem | undefined)[] {
  return advancedList.map((i) => {
    return columnList.find((c) => c.dataIndex === i.searchKey)
  })
}
