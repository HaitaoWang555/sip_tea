import type { ProItem } from '@/types/components-utils'
export const columnList: ProItem[] = [
  {
    dataIndex: 'tableName',
    title: '表名称',
    valueType: 'input',
    isSearch: true,
    isForm: true,
    formItemAttrs: {
      rules: [{ required: true }],
    },
  },
  {
    dataIndex: 'tableComment',
    title: '表描述',
    valueType: 'input',
    isSearch: true,
    isForm: true,
  },
  {
    dataIndex: 'package',
    title: '生成文件包名',
    valueType: 'input',
    isForm: true,
  },
  {
    dataIndex: 'isHaveBase',
    title: '是否包含基础字段',
    valueType: 'switch',
    renderType: 'dict',
    option: [
      {
        label: '包含',
        value: 1,
      },
      {
        label: '不包含',
        value: 0,
      },
    ],
    isForm: true,
  },
  {
    dataIndex: 'isTree',
    title: '是否树形结构',
    valueType: 'switch',
    renderType: 'dict',
    option: [
      {
        label: '是',
        value: 1,
      },
      {
        label: '否',
        value: 0,
      },
    ],
    isForm: true,
  },
  {
    dataIndex: 'templeteFiles',
    formItemAttrs: {
      tooltip: '不保存数据库中',
    },
    title: '需要生成的模版',
    valueType: 'checkbox',
    option: [
      {
        label: 'create-{}.dto.dot',
        value: '/dto/create-{}.dto.dot',
      },
      {
        label: 'search-{}.dto.dot',
        value: '/dto/search-{}.dto.dot',
      },
      {
        label: 'tree-{}.dot',
        value: '/dto/tree-{}.dot',
      },
      {
        label: 'update-{}.dto.dot',
        value: '/dto/update-{}.dto.dot',
      },
      {
        label: '{}.entity.dot',
        value: '/entities/dto/{}.entity.dot',
      },
      {
        label: 'type.dot',
        value: '/type.dot',
      },
      {
        label: '{}.controller.dot',
        value: '/{}.controller.dot',
      },
      {
        label: '{}.module.dot',
        value: '/{}.module.dot',
      },
      {
        label: '{}.service.dot',
        value: '/{}.service.dot',
      },
      {
        label: 'api.dot',
        value: '/api.dot',
      },
      {
        label: 'data.dot',
        value: '/data.dot',
      },
      {
        label: 'list.dot',
        value: '/list.dot',
      },
    ],
    isForm: true,
    noTable: true,
  },
  {
    dataIndex: 'createdAt',
    title: '创建时间',
    renderType: 'date',
  },
  {
    dataIndex: 'updatedAt',
    title: '更新时间',
    renderType: 'date',
  },
  {
    width: '200px',
    dataIndex: 'action',
    fixed: 'right',
    title: '操作',
    noInfo: true,
  },
]
