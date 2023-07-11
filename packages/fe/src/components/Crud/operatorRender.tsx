/* eslint-disable react/prop-types */
import { ResponseBodyType } from '@/types/api'
import { ConvertInterfaceToDict } from '@/types/components-utils'
import { Button } from 'antd'
import { AxiosPromise } from 'axios'

export type Props<RecordType> = {
  setFormType?: React.Dispatch<React.SetStateAction<string>>
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  setFormParams?: React.Dispatch<React.SetStateAction<RecordType | undefined>>
  operatorTableChild?: () => JSX.Element
  submit?: (params: ConvertInterfaceToDict<RecordType>) => AxiosPromise<ResponseBodyType<unknown>>
}

export default function OperatorTableRender<RecordType extends object>(props: Props<RecordType>) {
  function add() {
    if (props.setFormType && props.setOpen && props.setFormParams) {
      props.setFormType('add')
      props.setFormParams(undefined)
      props.setOpen(true)
    }
  }

  return function OperatorRender() {
    return (
      <>
        {props.submit && (
          <Button type="primary" onClick={add}>
            新增
          </Button>
        )}

        {props.operatorTableChild && props.operatorTableChild()}
      </>
    )
  }
}
