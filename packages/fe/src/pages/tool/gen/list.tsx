import Crud from '@/components/Crud'
import useColumnList from '@/hooks/columnList'
import { columnList } from './data'
import { query, create, update, findOne, remove } from './api'
import type {
  CreateGenTableDto,
  UpdateGenTableDto,
  SearchGenTableDtoWithNotPage,
  GenTable,
  GenTableColumn,
} from './api'
import { useState } from 'react'
import { getFormDefaultValues } from '@/utils/components'
import { Button } from 'antd'
import { ActionRenderProps } from '@/components/Crud/actionRender'
import { ProTableSearchParams } from '@/types/api'
import { EdiTable } from './ediTable'

function BaseCrud() {
  const [list, updateList] = useColumnList(columnList)
  const [queryParam, setQueryParams] = useState<SearchGenTableDtoWithNotPage>(
    formatParams(getFormDefaultValues(columnList))
  )
  const [open, setOpen] = useState(false)
  const [formParams, setFormParams] = useState<GenTable>()
  const [formType, setFormType] = useState('add')

  function formatParams(values: SearchGenTableDtoWithNotPage) {
    return values
  }

  function onSearch(values: SearchGenTableDtoWithNotPage) {
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

  function submit(params: (CreateGenTableDto | UpdateGenTableDto) & GenTable) {
    const met = formType === 'add' ? create : update
    if (formParams?.columns) {
      formParams.columns = formParams.columns.map((i) => {
        if (i.id && i.id < 1) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          delete i.id
        }
        return i
      })
    }
    return met(params).then((res) => {
      return res
    })
  }

  function del(params: GenTable) {
    return remove(params.id).then((res) => {
      return res
    })
  }

  function updateFormParamsEdiTableColumns(column: GenTableColumn) {
    if (formParams && formParams.columns) {
      const element = formParams.columns.find((i) => i.id === column.id)
      if (element) {
        Object.assign(element, column)
      } else {
        formParams.columns.push(column)
      }
    }
    if (formParams && !formParams.columns) {
      formParams.columns = [column]
    }
  }

  function OperatorTableChild() {
    return (
      <>
        <Button type="primary">其它</Button>
      </>
    )
  }
  function TableActionChild(props: ActionRenderProps<GenTable>) {
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
    <Crud<GenTable>
      width="100%"
      title="表"
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
      tableActionChild={(props: ActionRenderProps<GenTable>) => {
        return <TableActionChild {...props} />
      }}
      formChild={<EdiTable formParams={formParams} updateColumns={updateFormParamsEdiTableColumns} />}
    ></Crud>
  )
}

export default BaseCrud
