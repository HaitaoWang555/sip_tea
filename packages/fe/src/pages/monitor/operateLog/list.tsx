import Crud from '@/components/Crud'
import useColumnList from '@/hooks/columnList'
import { columnList } from './data'
import { query, findOne } from './api'
import type { SearchOperatelogDtoWithNotPage, Operatelog } from './api'
import { useState } from 'react'
import { getFormDefaultValues } from '@/utils/components'
import { ProTableSearchParams } from '@/types/api'

function OperatelogCrud() {
  const [list, updateList] = useColumnList(columnList)
  const [queryParam, setQueryParams] = useState<SearchOperatelogDtoWithNotPage>(
    formatParams(getFormDefaultValues(columnList))
  )
  const [open, setOpen] = useState(false)
  const [formParams, setFormParams] = useState<Operatelog>()
  const [formType, setFormType] = useState('add')

  function formatParams(values: SearchOperatelogDtoWithNotPage) {
    return values
  }

  function onSearch(values: SearchOperatelogDtoWithNotPage) {
    setQueryParams(formatParams(values))
  }

  function loadData(tableParams: ProTableSearchParams) {
    if (tableParams.sorter && Object.keys(tableParams.sorter).length > 0) {
      // 排序与筛选
      delete tableParams.sorter
    }
    const requestParameters = Object.assign({}, tableParams, queryParam)
    return query(requestParameters).then((res) => {
      return res
    })
  }

  function loadInfo() {
    if (!formParams) throw new Error()
    return findOne(formParams.id).then((res) => {
      return res
    })
  }

  return (
    <Crud<Operatelog>
      width="100%"
      title="操作日志"
      formType={formType}
      columnList={list}
      queryParams={queryParam}
      formParams={formParams}
      open={open}
      setOpen={setOpen}
      setFormType={setFormType}
      setFormParams={setFormParams}
      setQueryParams={setQueryParams}
      onSearch={onSearch}
      loadData={loadData}
      info={loadInfo}
      updateColumnList={updateList}
    ></Crud>
  )
}

export default OperatelogCrud
