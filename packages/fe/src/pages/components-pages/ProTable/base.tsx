import ProTable from '@/components/ProTable'
import useColumnList from '@/hooks/columnList'
import { userList, UserParams } from '@/pages/components-pages/api'
import { ProItem } from '@/types/components-utils'
import { useState } from 'react'
import { getOptions } from '../api'

const columnList: ProItem[] = [
  {
    dataIndex: 'name',
    title: '姓名',
    width: '20%',
    tableAttrs: { sorter: true },
  },
  {
    dataIndex: 'status',
    title: '状态',
    width: '20%',
    option: [],
    valueType: 'select',
    optionMth: getOptions,
    renderType: 'dict',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
]

export default function ProTableBase() {
  const [queryParam] = useState<UserParams>()
  const [list] = useColumnList(columnList)

  function loadData(tableParams: any) {
    if (Object.assign(tableParams.sorter)) {
      tableParams.sorter = tableParams.sorter.field + ',' + tableParams.sorter.order
    }
    const requestParameters = Object.assign({}, tableParams, queryParam)
    return userList(requestParameters).then((res) => {
      return res
    })
  }

  return <ProTable columnList={list} loadData={loadData} />
}
