import type { ProItem } from '@/types/components-utils'
import { getOptions, getTree } from '../api'

export const baseData: ProItem[] = [
  {
    dataIndex: 'email',
    title: '邮箱',
    valueType: 'input',
    defaultValue: 'aaa@aaa.com',
    isForm: true,
    formItemAttrs: {
      tooltip: 'This is email',
      rules: [{ required: true }],
    },
  },
  {
    dataIndex: 'name',
    title: '姓名',
    valueType: 'input',
    isForm: true,
  },
  {
    dataIndex: 'status',
    title: '生效状态',
    valueType: 'select',
    defaultValue: 0,
    option: [],
    optionMth: getOptions,
    isForm: true,
  },
  {
    dataIndex: 'tree',
    title: '树形筛选',
    valueType: 'tree-select',
    option: [],
    optionMth: getTree,
    isForm: true,
  },
  {
    dataIndex: 'createAt',
    title: '创建时间',
    valueType: 'range-picker',
    isForm: true,
    defaultValue: ['2023-01-13', '2023-02-13'],
    span: 12,
  },
]

export const linkage: ProItem[] = [
  {
    dataIndex: 'name',
    title: 'Activity name',
    isForm: true,
    valueType: 'input',
    formItemAttrs: {
      rules: [{ required: true, trigger: 'blur' }],
    },
  },
  {
    dataIndex: 'region',
    title: 'Activity zone',
    isForm: true,
    valueType: 'select',
    option: [
      {
        label: 'Zone one',
        value: 'shanghai',
      },
      {
        label: 'Zone two',
        value: 'beijing',
      },
    ],
    formItemAttrs: {
      rules: [{ required: true, trigger: 'change' }],
    },
  },
  {
    dataIndex: 'date',
    title: 'Activity time',
    valueType: 'range-picker',
    isForm: true,
  },
  {
    dataIndex: 'delivery',
    title: 'Instant delivery',
    valueType: 'switch',
    defaultValue: true,
    isForm: true,
  },
  {
    dataIndex: 'type',
    title: 'Activity type',
    valueType: 'checkbox',
    option: [
      {
        label: 'Online activities',
        value: 'Online activities',
      },
      {
        label: 'Promotion activities',
        value: 'Promotion activities',
      },
      {
        label: 'Offline activities',
        value: 'Offline activities',
      },
      {
        label: 'Simple brand exposure',
        value: 'Simple brand exposure',
      },
    ],
    isForm: true,
    isShowFormItem: (formParam) => {
      return formParam && formParam.delivery
    },
  },
  {
    dataIndex: 'resource',
    title: 'Resources',
    valueType: 'radio',
    option: [
      {
        label: 'Sponsor',
        value: 'Sponsor',
      },
      {
        label: 'Venue',
        value: 'Venue',
      },
    ],
    isForm: true,
    isShowFormItem: (formParam) => {
      return formParam && formParam.delivery
    },
  },
  {
    dataIndex: 'desc',
    title: 'Activity form',
    valueType: 'text-area',
    isForm: true,
    isShowFormItem: (formParam) => {
      return formParam && formParam.delivery
    },
  },
]

export const advance: ProItem[] = [
  {
    dataIndex: 'name',
    title: '仓库名',
    isForm: true,
    row: 0,
    span: 8,
    formSpan: 8,
    valueType: 'input',
  },
  {
    dataIndex: 'url',
    title: '仓库域名',
    isForm: true,
    row: 0,
    span: 8,
    formSpan: 8,
    valueType: 'input',
    formAttrs: {
      suffix: '.com',
      prefix: 'http://',
    },
  },
  {
    dataIndex: 'owner',
    title: '仓库管理员',
    isForm: true,
    row: 0,
    span: 8,
    formSpan: 8,
    valueType: 'select',
    option: [
      {
        label: '付晓晓',
        value: 'xiao',
      },
      {
        label: '周毛毛',
        value: 'mao',
      },
    ],
  },
  {
    dataIndex: 'approver',
    title: '审批人',
    isForm: true,
    row: 0,
    span: 8,
    formSpan: 8,
    valueType: 'select',
    option: [
      {
        label: '付晓晓',
        value: 'xiao',
      },
      {
        label: '周毛毛',
        value: 'mao',
      },
    ],
  },
  {
    dataIndex: 'dateRange',
    title: '生效日期',
    valueType: 'range-picker',
    isForm: true,
    row: 0,
    span: 8,
    formSpan: 8,
  },
  {
    dataIndex: 'type',
    title: '仓库类型',
    isForm: true,
    row: 0,
    span: 8,
    formSpan: 8,
    valueType: 'select',
    option: [],
    optionMth: getOptions,
  },
  {
    dataIndex: 'routerText',
    isForm: true,
    row: 0,
    span: 8,
    xl: 6,
    formSpan: 8,
  },
  {
    dataIndex: 'name2',
    title: '任务名',
    isForm: true,
    row: 1,
    span: 8,
    formSpan: 8,
    valueType: 'input',
  },
  {
    dataIndex: 'url2',
    title: '任务描述',
    isForm: true,
    row: 1,
    span: 8,
    formSpan: 8,
    valueType: 'input',
  },
  {
    dataIndex: 'owner2',
    title: '执行人',
    isForm: true,
    row: 1,
    span: 8,
    formSpan: 8,
    valueType: 'select',
    option: [
      {
        label: '付晓晓',
        value: 'xiao',
      },
      {
        label: '周毛毛',
        value: 'mao',
      },
    ],
  },
  {
    dataIndex: 'approver2',
    title: '责任人',
    isForm: true,
    row: 1,
    span: 8,
    formSpan: 8,
    valueType: 'select',
    option: [
      {
        label: '付晓晓',
        value: 'xiao',
      },
      {
        label: '周毛毛',
        value: 'mao',
      },
    ],
  },
  {
    dataIndex: 'dateRange2',
    title: '生效日期',
    valueType: 'range-picker',
    isForm: true,
    row: 1,
    span: 8,
    xl: 6,
    formSpan: 8,
  },
  {
    dataIndex: 'type2',
    title: '任务类型',
    isForm: true,
    row: 1,
    span: 8,
    formSpan: 8,
    valueType: 'select',
    option: [
      {
        label: '私密',
        value: 'private',
      },
      {
        label: '公开',
        value: 'public',
      },
    ],
  },
]
