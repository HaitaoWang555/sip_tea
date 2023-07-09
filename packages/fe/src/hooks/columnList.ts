import { ApiContext } from '@/context/api-context'
import { ProItem } from '@/types/components-utils'
import { equalColumnList, formatColumnList, formatOPtions } from '@/utils/components'
import { useContext, useEffect, useRef } from 'react'
import { useList } from 'react-use'

function useColumnList(list: ProItem[]): [ProItem[], (element?: ProItem | undefined | ProItem[]) => void] {
  const Api = useContext(ApiContext)
  const runUpdateOptions = useRef(false)

  const [columnList, { set, updateAt }] = useList(formatColumnList(list, Api.responseKey))
  function updateColumn(element?: ProItem | undefined | ProItem[]) {
    if (element instanceof Array) {
      set(formatColumnList(element, Api.responseKey))
      runUpdateOptions.current = false
    } else {
      if (!element) return
      const index = columnList.findIndex((i) => i.dataIndex === element.dataIndex)
      updateAt(index, Object.assign(columnList[index], element))
    }
  }

  function updateOptions() {
    columnList
      .filter((i) => i.optionMth)
      .forEach((c, index) => {
        formatOPtions(Api.responseKey, c, index, updateColumn)
      })
    runUpdateOptions.current = true
  }

  useEffect(() => {
    if (runUpdateOptions.current) return
    updateOptions()
  }, [columnList])

  useEffect(() => {
    // 开发 热更新使用
    if (import.meta.env.DEV && import.meta.hot && list.length && !equalColumnList(list, columnList)) {
      set(formatColumnList(list, Api.responseKey, updateColumn))
    }
  }, [JSON.stringify(list)])

  return [columnList, updateColumn]
}

export default useColumnList
