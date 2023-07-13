import Crud from '@/components/Crud'
import useColumnList from '@/hooks/columnList'
import { columnList } from './data'
import { query, create, update, findOne, remove, resetPassword } from './api'
import type { CreateUserDto, UpdateUserDto, SearchUserDtoWithNotPage, User } from './api'
import { useState } from 'react'
import { getFormDefaultValues } from '@/utils/components'
import { Button, Modal, message, notification } from 'antd'
import { ActionRenderProps } from '@/components/Crud/actionRender'
import { ProTableSearchParams } from '@/types/api'
import { PermissionWrap } from '@/components/PermissionWrap'

function UserCrud() {
  const [list, updateList] = useColumnList(columnList)
  const [queryParam, setQueryParams] = useState<SearchUserDtoWithNotPage>(
    formatParams(getFormDefaultValues(columnList))
  )
  const [open, setOpen] = useState(false)
  const [formParams, setFormParams] = useState<User>()
  const [formType, setFormType] = useState('add')
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  function formatParams(values: SearchUserDtoWithNotPage) {
    return values
  }

  function onSearch(values: SearchUserDtoWithNotPage) {
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

  function submit(params: (CreateUserDto | UpdateUserDto) & User) {
    const met = formType === 'add' ? create : update
    if (params.positions) delete params.positions
    if (params.departments) delete params.departments
    if (params.roles) delete params.roles
    return met(params).then((res) => {
      return res
    })
  }

  function del(params: User) {
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
  function TableActionChild(props: ActionRenderProps<User>) {
    function resetPasswordFn() {
      Modal.confirm({
        title: '再次确认是否重置密码！',
        onOk() {
          return new Promise((resolve, reject) => {
            resetPassword(props.record.id)
              .then((res) => {
                notification.info({
                  message: '密码重置成功！',
                  description: res.data.data,
                  placement: 'top',
                })
                resolve(true)
              })
              .catch(() => {
                reject()
              })
          })
        },
      })
    }

    return (
      <>
        <PermissionWrap urls={['/system/user/updatePassword']}>
          <Button type="link" onClick={resetPasswordFn}>
            重置密码
          </Button>
        </PermissionWrap>
      </>
    )
  }

  return (
    <Crud<User>
      title="用户"
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
      tableActionChild={(props: ActionRenderProps<User>) => {
        return <TableActionChild {...props} />
      }}
      tableProps={{
        rowSelection: { ...rowSelection },
      }}
    ></Crud>
  )
}

export default UserCrud
