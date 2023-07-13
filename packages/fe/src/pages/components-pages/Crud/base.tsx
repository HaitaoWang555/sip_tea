import Crud from '@/components/Crud'
import useColumnList from '@/hooks/columnList'
import { columnList } from './data'
import { UserEntity, userList, UserParams, addUser, editUser, userInfo, delUser } from '@/pages/components-pages/api'
import { useContext, useEffect, useState } from 'react'
import { getFormDefaultValues } from '@/utils/components'
import { Button } from 'antd'
import { ActionRenderProps } from '@/components/Crud/actionRender'
import { ApiContext, DATAKEY } from '@/context/api-context'

function BaseCrud() {
  const [list, updateList] = useColumnList(columnList)
  const [queryParam, setQueryParams] = useState<UserParams>(formatParams(getFormDefaultValues(columnList)))
  const [open, setOpen] = useState(false)
  const [formParams, setFormParams] = useState<UserEntity>()
  const [formType, setFormType] = useState('add')
  const Api = useContext(ApiContext)

  function formatParams(values: UserParams) {
    if (values.createAt && values.createAt instanceof Array) values.createAt = values.createAt.join(',')
    return values
  }

  function onSearch(values: UserParams) {
    setQueryParams(formatParams(values))
  }

  function loadData(tableParams: any) {
    if (Object.keys(tableParams.sorter).length > 0) {
      tableParams.sorter = tableParams.sorter.field + ',' + tableParams.sorter.order
    }
    const requestParameters = Object.assign({}, tableParams, queryParam)
    return userList(requestParameters).then((res) => {
      return res
    })
  }

  function loadInfo() {
    return userInfo(formParams).then((res) => {
      return res
    })
  }

  function submit(params: UserEntity) {
    const met = formType === 'add' ? addUser : editUser
    return met(params).then((res) => {
      return res
    })
  }

  function del() {
    return delUser(formParams).then((res) => {
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
  function TableActionChild(props: ActionRenderProps<UserEntity>) {
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

  useEffect(() => {
    Api.tablePageKey.data = 'data.data.records'
    return () => {
      Api.tablePageKey.data = DATAKEY
    }
  }, [])

  return (
    <Crud<UserEntity>
      title="用户"
      formType={formType}
      columnList={list}
      queryParams={queryParam}
      formParams={formParams}
      open={open}
      setOpen={setOpen}
      setFormType={setFormType}
      setFormParams={setFormParams}
      onSearch={onSearch}
      loadData={loadData}
      info={loadInfo}
      updateColumnList={updateList}
      del={del}
      submit={submit}
      operatorTableChild={() => <OperatorTableChild />}
      tableActionChild={(props: ActionRenderProps<UserEntity>) => {
        return <TableActionChild {...props} />
      }}
      freezeApi={true}
    ></Crud>
  )
}

export default BaseCrud
