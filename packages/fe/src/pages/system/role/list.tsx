import Crud from '@/components/Crud'
import useColumnList from '@/hooks/columnList'
import { columnList } from './data'
import { query, create, update, findOne, remove } from './api'
import type { CreateRoleDto, UpdateRoleDto, SearchRoleDtoWithNotPage, Role } from './api'
import { useState } from 'react'
import { getFormDefaultValues } from '@/utils/components'
import { Button, Modal, message } from 'antd'
import { ProTableSearchParams } from '@/types/api'
import { optionType } from '@/types/components-utils'

function RoleCrud() {
  const [list, updateList] = useColumnList(columnList)
  const [queryParam, setQueryParams] = useState<SearchRoleDtoWithNotPage>(
    formatParams(getFormDefaultValues(columnList))
  )
  const [open, setOpen] = useState(false)
  const [formParams, setFormParams] = useState<Role>()
  const [formType, setFormType] = useState('add')
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  function formatParams(values: SearchRoleDtoWithNotPage) {
    return values
  }

  function onSearch(values: SearchRoleDtoWithNotPage) {
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
      if (res.data.data.menuIds) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        res.data.data.menuIds = res.data.data.menuIds.map((i) => {
          return {
            value: i,
          }
        })
      }
      return res
    })
  }

  function submit(params: (CreateRoleDto | UpdateRoleDto) & Role) {
    const met = formType === 'add' ? create : update
    if (params.menuIds && params.menuIds.length > 0) {
      const menuIds = params.menuIds as unknown as optionType[]
      params.menuIds = menuIds.map((i) => i.value as number)
    }
    if (params.menus) delete params.menus
    if (params.resources) delete params.resources
    return met(params).then((res) => {
      return res
    })
  }

  function del(params: Role) {
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
    <Crud<Role>
      title="角色"
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
      tableProps={{
        rowSelection: { ...rowSelection },
      }}
    ></Crud>
  )
}

export default RoleCrud
