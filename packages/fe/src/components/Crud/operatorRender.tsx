import { Button } from 'antd'

export type Props<RecordType> = {
  setFormType?: React.Dispatch<React.SetStateAction<string>>
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  setFormParams?: React.Dispatch<React.SetStateAction<RecordType | undefined>>
  operatorTableChild?: () => JSX.Element
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
        <Button type="primary" onClick={add}>
          新增
        </Button>
        {/* eslint-disable-next-line react/prop-types */}
        {props.operatorTableChild && props.operatorTableChild()}
      </>
    )
  }
}
