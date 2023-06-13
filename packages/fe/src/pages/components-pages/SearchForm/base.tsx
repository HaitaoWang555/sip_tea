import SearchForm from '@/components/SearchForm'
import { Button, Divider } from 'antd'
import useColumnList from '@/hooks/columnList'
import { columnList } from './data'
import AdvanceSearchForm from '@/components/SearchForm/advanced'
import { useState } from 'react'
import { AdvancedFormItem } from '@/types/components-utils'

export default function SearchFormBase() {
  const [list, updateList] = useColumnList([])
  const [searchList] = useState<AdvancedFormItem[]>([])
  function onSearch(values: Record<string, unknown>) {
    console.log(values)
  }

  function clickFn() {
    updateList({ dataIndex: 'email', title: '电子邮件' })
  }
  function init() {
    updateList(columnList)
  }

  return (
    <>
      <SearchForm columnList={list} onSearch={onSearch} />
      <Button onClick={init} style={{ margin: '24px 24px 0 0' }}>
        初始化
      </Button>
      <Button onClick={clickFn} style={{ marginTop: '24px' }}>
        切换标题
      </Button>
      <Divider>分割线</Divider>
      <AdvanceSearchForm columnList={list} onSearch={onSearch} searchList={searchList} />
    </>
  )
}
