import ProTable from '@/components/ProTable'
import Info from '@/components/Info'
import useColumnList from '@/hooks/columnList'
import { ProItem } from '@/types/components-utils'
import { findAllPrefixKeys, findAllGroupKeys, getValue, removeGroup, removeSingle } from './api'
import { useState } from 'react'
import styles from './style.module.less'
import { Button, Modal, message } from 'antd'

const height = window.innerHeight - 190
const temp = {
  prefixRecord: {} as PrefixRecord,
}
type PrefixRecord = {
  id: number
  value: string
  label: string
  type: string
}

type CacheValue = {
  key: string
  name: string
  value: any
}

function CacheList() {
  const prefixList: ProItem[] = [
    {
      width: '50px',
      dataIndex: 'id',
      title: '序号',
    },
    {
      dataIndex: 'value',
      title: '缓存名称',
    },
    {
      title: '备注',
      dataIndex: 'label',
    },
    {
      width: '60px',
      title: '操作',
      dataIndex: 'delete',
      tableRender: (val: undefined, record: any) => {
        return (
          <div className="tableAction">
            <Button
              type="link"
              danger
              onClick={(e) => {
                e.stopPropagation()
                return del(record, 'prefix')
              }}
            >
              删除
            </Button>
          </div>
        )
      },
    },
  ]
  const keyList: ProItem[] = [
    {
      width: '40px',
      dataIndex: 'id',
      title: '序号',
    },
    {
      dataIndex: 'value',
      title: '完整键名',
    },
    {
      width: '60px',
      title: '操作',
      dataIndex: 'delete',
      tableRender: (val: undefined, record: any) => {
        return (
          <div className="tableAction">
            <Button
              type="link"
              danger
              onClick={(e) => {
                e.stopPropagation()
                return del(record, 'key')
              }}
            >
              删除
            </Button>
          </div>
        )
      },
    },
  ]
  const valueList: ProItem[] = [
    {
      dataIndex: 'name',
      title: '缓存类别',
    },
    {
      dataIndex: 'key',
      title: '完整键名',
    },
    {
      dataIndex: 'value',
      title: '缓存内容',
    },
  ]

  const [listPrefix] = useColumnList(prefixList)
  const [refresh, setRefresh] = useState({})
  const [prefixRecord, setPrefixRecord] = useState<PrefixRecord>()
  const [listKey] = useColumnList(keyList)
  const [listValue] = useColumnList(valueList)
  const [value, setValue] = useState<CacheValue>({
    name: '',
    key: '',
    value: '',
  })

  function loadDataPrefix() {
    return findAllPrefixKeys().then((res) => {
      res.data.data = res.data.data.map((i: PrefixRecord, index: number) => {
        return {
          ...i,
          id: index + 1,
        }
      })
      return res
    })
  }
  function loadDataKey() {
    if (!prefixRecord || !prefixRecord.value) {
      return new Promise<void>((resolve) => {
        resolve()
      })
    }
    return findAllGroupKeys(prefixRecord.value).then((res) => {
      res.data.data = res.data.data.map((i: string, index: number) => {
        return {
          value: i,
          id: index + 1,
        }
      })
      return res
    })
  }

  function getCacheValue(record: PrefixRecord) {
    if (prefixRecord && prefixRecord.type) {
      if (value.key === record.value) return
      getValue(record.value, prefixRecord.type).then((res) => {
        setValue({
          name: prefixRecord.label,
          key: record.value,
          value: res.data.data,
        })
      })
    }
  }

  function del(record: any, type: string) {
    let met: typeof removeGroup, key: string
    if (type === 'prefix') {
      met = removeGroup
      key = record.value
    } else if (type === 'key') {
      met = removeSingle
      key = record.value
    } else {
      return
    }

    Modal.confirm({
      title: '再次确认是否删除！',
      onOk() {
        return new Promise((resolve, reject) => {
          met(key)
            .then((res) => {
              message.success(res.data.message)
              if (type === 'prefix') {
                setRefresh({})
                setPrefixRecord(undefined)
              }
              if (type === 'key') {
                setPrefixRecord({ ...temp.prefixRecord })
              }
              setValue({
                name: '',
                key: '',
                value: '',
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

  function OperatorTableChild1() {
    return <>缓存列表</>
  }
  function OperatorTableChild2() {
    return <>键名列表</>
  }

  return (
    <div className={styles.cacheWrap}>
      <ProTable
        columnList={listPrefix}
        loadData={loadDataPrefix}
        queryParams={refresh}
        operatorRender={() => <OperatorTableChild1 />}
        tableProps={{
          pagination: false,
          style: { minHeight: height },
          onRow: (record: PrefixRecord) => {
            return {
              onClick: () => {
                setPrefixRecord(record)
                temp.prefixRecord = record
                setValue({
                  name: record.label,
                  key: '',
                  value: '',
                })
              },
            }
          },
        }}
      />
      <ProTable
        columnList={listKey}
        loadData={loadDataKey}
        queryParams={prefixRecord}
        operatorRender={() => <OperatorTableChild2 />}
        tableProps={{
          pagination: false,
          style: { minHeight: height },
          onRow: (record: PrefixRecord) => {
            return {
              onClick: () => {
                getCacheValue(record)
              },
            }
          },
        }}
      />
      <Info title="缓存内容" column={1} columnList={listValue} formValues={value} layout="vertical"></Info>
    </div>
  )
}
export default CacheList
