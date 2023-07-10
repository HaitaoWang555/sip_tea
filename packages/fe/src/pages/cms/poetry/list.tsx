import Crud from '@/components/Crud'
import useColumnList from '@/hooks/columnList'
import { columnList } from './data'
import { query, create, update, findOne, remove, count } from './api'
import type { CreatePoetryDto, UpdatePoetryDto, SearchPoetryDtoWithNotPage, Poetry } from './api'
import { useState } from 'react'
import { getFormDefaultValues } from '@/utils/components'
import { Button, Modal, message } from 'antd'
import { ProTableSearchParams } from '@/types/api'

function PoetryCrud() {
  const [list, updateList] = useColumnList(columnList)
  const [queryParam, setQueryParams] = useState<SearchPoetryDtoWithNotPage>(
    formatParams(getFormDefaultValues(columnList))
  )
  const [open, setOpen] = useState(false)
  const [formParams, setFormParams] = useState<Poetry>()
  const [formType, setFormType] = useState('add')
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  function formatParams(values: SearchPoetryDtoWithNotPage) {
    return values
  }

  function onSearch(values: SearchPoetryDtoWithNotPage) {
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

  function loadCount() {
    const requestParameters = Object.assign({}, queryParam)
    return count(requestParameters).then((res) => {
      return res
    })
  }

  function loadInfo() {
    if (!formParams) throw new Error()
    return findOne(formParams.id).then((res) => {
      return res
    })
  }

  function submit(params: (CreatePoetryDto | UpdatePoetryDto) & Poetry) {
    const met = formType === 'add' ? create : update
    return met(params).then((res) => {
      return res
    })
  }

  function del(params: Poetry) {
    return remove(params.id).then((res) => {
      return res
    })
  }

  function batchDel() {
    Modal.confirm({
      title: '再次确认是否删除！',
      onOk() {
        return new Promise((resolve, reject) => {
          remove(selectedRowKeys.join(','))
            .then((res) => {
              message.success(res.data.message)
              setQueryParams(Object.assign({ doNotReset: true }, queryParam))
              resolve(true)
            })
            .catch(() => {
              reject()
            })
        })
      },
    })
  }

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys)
    },
  }

  function OperatorTableChild() {
    return (
      <>
        <Button type="primary" danger onClick={batchDel}>
          批量删除
        </Button>
      </>
    )
  }

  return (
    <Crud<Poetry>
      title="诗词"
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
      loadCount={loadCount}
      info={loadInfo}
      updateColumnList={updateList}
      del={del}
      submit={submit}
      operatorTableChild={() => <OperatorTableChild />}
      tableProps={{
        rowSelection: { ...rowSelection },
      }}
    ></Crud>
  )
}

export default PoetryCrud
