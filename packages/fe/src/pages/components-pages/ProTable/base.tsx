import ProTable from '@/components/ProTable'
import useColumnList from '@/hooks/columnList'
import { userList, UserParams } from '@/pages/components-pages/api'
import { ProItem } from '@/types/components-utils'
import { getOptions } from '../api'
import { useContext, useEffect, useState } from 'react'
import { ApiContext, DATAKEY } from '@/context/api-context'

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
  const Api = useContext(ApiContext)

  function loadData(tableParams: any) {
    if (Object.assign(tableParams.sorter)) {
      tableParams.sorter = tableParams.sorter.field + ',' + tableParams.sorter.order
    }
    const requestParameters = Object.assign({}, tableParams, queryParam)
    return userList(requestParameters).then((res) => {
      return res
    })
  }

  useEffect(() => {
    Api.tablePageKey.data = 'data.data.records'
    return () => {
      Api.tablePageKey.data = DATAKEY
    }
  }, [])

  return <ProTable columnList={list} loadData={loadData} freezeApi={true} />
}
