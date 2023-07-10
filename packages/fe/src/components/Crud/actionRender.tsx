import { ResponseBodyType } from '@/types/api'
import { Button, message, Modal } from 'antd'
import { AxiosPromise } from 'axios'

export type Props<RecordType> = {
  setFormType?: React.Dispatch<React.SetStateAction<string>>
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  setFormParams?: React.Dispatch<React.SetStateAction<RecordType | undefined>>
  setQueryParams?: React.Dispatch<React.SetStateAction<Partial<RecordType>>>
  del?: (params: RecordType) => AxiosPromise<ResponseBodyType<void>>
  tableActionChild?: (params: Props<RecordType> & { record: RecordType }) => JSX.Element
}

export type ActionRenderProps<RecordType> = Props<RecordType> & { record: RecordType }

export default function TableColumnActionRender<RecordType extends object>(props: Props<RecordType>) {
  function info(record: RecordType) {
    if (props.setFormType && props.setFormParams && props.setOpen) {
      props.setFormType('info')
      props.setFormParams(record)
      props.setOpen(true)
    }
  }
  function del(record: RecordType) {
    if (props.setFormParams) {
      Modal.confirm({
        title: '再次确认是否删除！',
        onOk() {
          return new Promise((resolve, reject) => {
            props.del &&
              props
                .del(record)
                .then((res) => {
                  props.setQueryParams &&
                    props.setQueryParams((q) => {
                      return Object.assign({ doNotReset: true }, q)
                    })
                  message.success(res.data.message)

                  resolve(res)
                })
                .catch(() => {
                  reject()
                })
          })
        },
      })
    }
  }
  function edit(record: RecordType) {
    if (props.setFormType && props.setFormParams && props.setOpen) {
      props.setFormType('edit')
      props.setFormParams(record)
      props.setOpen(true)
    }
  }

  return function ActionRender(text: string, record: RecordType) {
    return (
      <div className="tableAction">
        <Button
          type="link"
          onClick={() => {
            info(record)
          }}
        >
          详情
        </Button>
        <Button
          type="link"
          onClick={() => {
            edit(record)
          }}
        >
          修改
        </Button>
        <Button
          type="link"
          danger
          onClick={() => {
            del(record)
          }}
        >
          删除
        </Button>
        {/* eslint-disable-next-line react/prop-types */}
        <>{props.tableActionChild && props.tableActionChild({ ...props, record })}</>
      </div>
    )
  }
}
