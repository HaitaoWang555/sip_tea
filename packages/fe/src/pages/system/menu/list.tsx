import Crud from '@/components/Crud'
import useColumnList from '@/hooks/columnList'
import { columnList } from './data'
import { query, create, update, findOne, remove, tree } from './api'
import type { CreateMenuDto, UpdateMenuDto, SearchMenuDtoWithNotPage, Menu } from './api'
import { useState } from 'react'
import { getFormDefaultValues } from '@/utils/components'
import { Button, Modal, message } from 'antd'
import { ActionRenderProps } from '@/components/Crud/actionRender'
import { ProTableSearchParams } from '@/types/api'

function MenuCrud() {
  const [list, updateList] = useColumnList(columnList)
  const [queryParam, setQueryParams] = useState<SearchMenuDtoWithNotPage>(
    formatParams(getFormDefaultValues(columnList))
  )
  const [open, setOpen] = useState(false)
  const [formParams, setFormParams] = useState<Menu>()
  const [formType, setFormType] = useState('add')
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  function formatParams(values: SearchMenuDtoWithNotPage) {
    return values
  }

  function onSearch(values: SearchMenuDtoWithNotPage) {
    setQueryParams(formatParams(values))
  }

  function loadData(tableParams: ProTableSearchParams) {
    if (tableParams.sorter && Object.keys(tableParams.sorter).length > 0) {
      // 排序与筛选
      delete tableParams.sorter
    }
    const requestParameters = Object.assign({}, tableParams, queryParam)
    return tree(requestParameters).then((res) => {
      return res
    })
  }

  function loadInfo() {
    if (!formParams) throw new Error()
    return findOne(formParams.id).then((res) => {
      return res
    })
  }

  function submit(params: (CreateMenuDto | UpdateMenuDto) & Menu) {
    const met = formType === 'add' ? create : update
    return met(params).then((res) => {
      return res
    })
  }

  function del(params: Menu) {
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
  function TableActionChild(props: ActionRenderProps<Menu>) {
    function addNext() {
      setFormType('add')
      setFormParams({ parentId: props.record.id } as Menu)
      setOpen(true)
    }

    return (
      <>
        <Button type="link" onClick={addNext}>
          添加下级
        </Button>
      </>
    )
  }

  return (
    <Crud<Menu>
      title="菜单"
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
      tableActionChild={(props: ActionRenderProps<Menu>) => {
        return <TableActionChild {...props} />
      }}
      tableProps={{
        rowSelection: { ...rowSelection },
        pagination: false,
      }}
    ></Crud>
  )
}

export default MenuCrud
