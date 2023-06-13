import type { AxiosPromise } from 'axios'

export type radioValType = string | number | boolean
export type selectValType = string | number | boolean | Record<string, any>
type TValueType =
  | 'input'
  | 'text-area'
  | 'input-number'
  | 'switch'
  | 'date-picker'
  | 'range-picker'
  | 'select'
  | 'tree-select'
  | 'tree'
  | 'radio'
  | 'checkbox'
  | 'custom'
  | 'text'
  | 'upload'

type RenderType = 'dict' | 'date' | 'tooltip'

export type optionType = {
  label: string | number | undefined
  value: radioValType | selectValType
  children?: Array<optionType>
}

export type ProItem = {
  dataIndex: string
  valueType?: TValueType
  optionMth?: (params?: any) => AxiosPromise<any>
  noCacheOptionMth?: boolean
  optionMthParams?: Record<string, any>
  optionsKey?: { label: string; value: string }
  option?: Array<optionType>
  defaultOption?: Array<optionType>
  defaultValue?: any
  row?: number
  infoSpan?: number
  noInfo?: boolean
  span?: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  formSpan?: number
  formXs?: number
  formSm?: number
  formMd?: number
  formLg?: number
  formXl?: number
  formSlot?: string
  title?: string
  step?: number
  multiple?: boolean
  pickerFormat?: string
  isSearch?: boolean
  isForm?: boolean
  noTable?: boolean
  formAttrs?: any
  formItemAttrs?: any
  tableAttrs?: any
  infoAttrs?: any
  formRender?: any
  tableRender?: any
  infoRender?: any
  render?: any
  renderType?: RenderType
  renderProps?: any
  fieldVisible?: boolean
  fixed?: boolean | string
  minWidth?: number | string
  width?: number | string | undefined
  align?: string
  selectValType?: '_self'
  formatOption?: (params: any) => void
  sortable?: string | boolean
  isShowFormItem?: (params: any, type?: string) => boolean
}

export type ConvertInterfaceToDict<T> = {
  [K in keyof T]: T[K]
}

export type AdvancedFormItem = {
  searchKey?: string
  matchKey?: string
  condition?: string
  value?: any
}
