import Crud from '@/components/Crud'
import useColumnList from '@/hooks/columnList'
import { columnList } from './data'
import { query, create, update, findOne, remove } from './api'
import type { CreatePositionDto, UpdatePositionDto, SearchPositionDtoWithNotPage, Position } from './api'
import { useState } from 'react'
import { getFormDefaultValues } from '@/utils/components'
import { Button } from 'antd'
import { ActionRenderProps } from '@/components/Crud/actionRender'
import { ProTableSearchParams } from '@/types/api'

function PositionCrud() {
  const [list, updateList] = useColumnList(columnList)
  const [queryParam, setQueryParams] = useState<SearchPositionDtoWithNotPage>(
    formatParams(getFormDefaultValues(columnList))
  )
  const [open, setOpen] = useState(false)
  const [formParams, setFormParams] = useState<Position>()
  const [formType, setFormType] = useState('add')

  function formatParams(values: SearchPositionDtoWithNotPage) {
    return values
  }

  function onSearch(values: SearchPositionDtoWithNotPage) {
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

  function submit(params: (CreatePositionDto | UpdatePositionDto) & Position) {
    const met = formType === 'add' ? create : update
    return met(params).then((res) => {
      return res
    })
  }

  function del(params: Position) {
    return remove(params.id).then((res) => {
      return res
    })
  }

  function OperatorTableChild() {
    return (
      <>
        <Button type="primary">其它</Button>
      </>
    )
  }
  function TableActionChild(props: ActionRenderProps<Position>) {
    function otherMethod() {
      console.log(props)
    }

    return (
      <>
        <Button type="link" onClick={otherMethod}>
          其它
        </Button>
      </>
    )
  }

  return (
    <Crud<Position>
      title="职位"
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
      del={del}
      submit={submit}
      operatorTableChild={() => <OperatorTableChild />}
      tableActionChild={(props: ActionRenderProps<Position>) => {
        return <TableActionChild {...props} />
      }}
    ></Crud>
  )
}

export default PositionCrud
