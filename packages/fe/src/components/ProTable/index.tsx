import Table, { TablePaginationConfig } from 'antd/es/table'
import { FilterValue, SorterResult } from 'antd/es/table/interface'
import { CSSProperties, useContext, useEffect, useRef, useState } from 'react'
import { AxiosPromise } from 'axios'
import { equalObject, findObjValByDeepKey, initTableWidth } from '@/utils/components'
import styles from './styles.module.less'
import { Card } from 'antd'
import Setting from './setting'
import TooltipTitle from './tooltipTitle'
import { ApiContext, TREEDATAKEY, DATAKEY } from '@/context/api-context'
import { TableProps } from 'antd/lib/table/InternalTable'

export type Props<RecordType> = {
  columnList: any
  loadData: (tableParams: any) => AxiosPromise | Promise<any>
  style?: CSSProperties
  queryParams?: any
  searchDataCallBack?: (val?: boolean) => void
  operatorRender?: () => JSX.Element
  tableProps?: TableProps<RecordType>
}

type MyTablePaginationConfig = {
  pageNum?: number
} & TablePaginationConfig

let TableFilters: Record<string, FilterValue | null> = {},
  TableSorter: SorterResult<any> | SorterResult<any>[] = {}
export default function ProTable<RecordType extends object>(props: Props<RecordType>) {
  const Api = useContext(ApiContext)

  const defaultPaginationParams: MyTablePaginationConfig = {
    current: 1,
    pageSize: Api.tablePageKey.pageSizeVal,
    position: ['bottomCenter'],
    size: 'small',
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total) => {
      return `共${total}条数据`
    },
  }

  const [data, setData] = useState<any[]>()
  const [loading, setLoading] = useState(false)
  const [paginationParams, setPaginationParams] = useState<MyTablePaginationConfig>(defaultPaginationParams)
  const [tableWidth, setTableWidth] = useState<number | string>(window.innerWidth - 350)

  function initColumns(columnList: any) {
    setTableWidth(initTableWidth(columnList))
    columnList.forEach((i: any) => {
      if (i.tableAttrs) {
        Object.assign(i, i.tableAttrs)
      }
      if (i.formItemAttrs && i.formItemAttrs.tooltip) {
        i.tableTitle = <TooltipTitle title={i.title} tooltip={i.formItemAttrs.tooltip} />
      }
    })
  }

  function getDate(pageParams?: MyTablePaginationConfig) {
    setLoading(true)
    const params = Object.assign(
      {},
      {
        [Api.tablePageKey.page]: pageParams ? pageParams.current : paginationParams.current,
        [Api.tablePageKey.pageSize]: pageParams ? pageParams.pageSize : paginationParams.pageSize,
        filters: TableFilters,
        sorter: TableSorter,
      }
    )
    if (props.searchDataCallBack) props.searchDataCallBack(true)
    props
      .loadData(params)
      .then((res) => {
        const list = findObjValByDeepKey(res, Api.tablePageKey.data)
        setPaginationParams((p) => {
          return Object.assign({}, p, {
            current: params[Api.tablePageKey.page],
            pageSize: params[Api.tablePageKey.pageSize],
            total: findObjValByDeepKey(res, Api.tablePageKey.totalData),
          })
        })
        setData(list)
      })
      .catch((err) => {
        setData([])
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
        if (props.searchDataCallBack) props.searchDataCallBack(false)
      })
  }

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[]
  ) => {
    if (!equalObject(TableFilters, filters) || !equalObject(TableSorter, sorter)) {
      pagination.current = 1
    }
    TableFilters = filters
    TableSorter = sorter
    setData([])
    setPaginationParams((p) => {
      return Object.assign({}, p, pagination)
    })
    getDate(Object.assign({}, pagination))
    if (pagination.pageSize !== paginationParams.pageSize) {
      setData([])
    }
  }

  useEffect(() => {
    setData([])
    if (props.queryParams && !props.queryParams.doNotReset) {
      getDate(defaultPaginationParams)
    } else {
      getDate()
    }
  }, [props.queryParams])

  useEffect(() => {
    if (props.tableProps && props.tableProps.pagination === false) {
      // 不分页
      Api.tablePageKey.data = TREEDATAKEY
    } else {
      Api.tablePageKey.data = DATAKEY
    }
    initColumns(props.columnList)
  }, [props.columnList])

  return (
    <div className={styles['pro-table'] + ' pro-table-wrap'} style={props.style}>
      <Card>
        <div className={styles['table-operator']}>
          <div>{props.operatorRender && props.operatorRender()}</div>
          <Setting></Setting>
        </div>
        <Table
          sticky
          bordered
          columns={props.columnList
            .filter((item: any) => !item.noTable)
            .map((i: any) => {
              const obj = Object.assign({}, i)
              obj.render = obj.tableRender
              if (obj.tableTitle) {
                obj.title = obj.tableTitle
                delete obj.tableTitle
              }
              return obj
            })}
          scroll={{ x: tableWidth }}
          rowKey={(record: any) => String(record.id)}
          dataSource={data}
          pagination={paginationParams}
          loading={loading}
          onChange={handleTableChange}
          {...props.tableProps}
        />
      </Card>
    </div>
  )
}
