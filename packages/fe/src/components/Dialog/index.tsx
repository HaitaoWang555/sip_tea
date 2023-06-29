import { Modal, ModalProps } from 'antd'

export type Props = ModalProps & {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProDialog(props: Props) {
  function handleCancel() {
    props.setOpen && props.setOpen(false)
  }

  return <Modal onCancel={handleCancel} destroyOnClose={true} maskClosable={false} {...props}></Modal>
}
