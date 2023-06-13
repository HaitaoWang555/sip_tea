import { upload } from '@/api/public'
import { ResponseBodyType } from '@/types/api'
import { UploadOutlined } from '@ant-design/icons'
import { Upload, Button, UploadProps, UploadFile, message } from 'antd'
import { RcFile, UploadChangeParam } from 'antd/es/upload'
import { AxiosPromise } from 'axios'
import { useEffect, useState } from 'react'

type Props = UploadProps & {
  value?: string
  bizType?: string
  onChange?: (value: string) => void
  uploadChange?: (value: string) => void
  actionMethod?: (file: RcFile) => AxiosPromise<ResponseBodyType<string>>
}

function MyUpload(props: Props) {
  const [fileList, setFileList] = useState<Array<UploadFile>>([])

  function onChange(info: UploadChangeParam<UploadFile<string>>) {
    const key = info.file.status
    switch (key) {
      case 'removed':
        setFileList(info.fileList)
        emitChange(info.fileList.map((i) => i.url as string).join(','))
        break
      case 'done':
        break

      default:
        break
    }
  }

  function emitChange(value: string) {
    props.onChange?.(value)
    props.uploadChange?.(value)
  }

  function handleUpload(options: any) {
    const { file } = options
    const oldFileList = [...fileList]
    setFileList([...oldFileList, { ...file, status: 'uploading' }])
    const method = props.actionMethod ? props.actionMethod : upload
    method(file, props.bizType)
      .then((res) => {
        const finalList = [
          ...oldFileList,
          {
            uid: file.uid,
            name: file.name,
            size: file.size,
            type: file.type,
            status: 'done',
            url: res.data.data,
          },
        ] as Array<UploadFile>
        setFileList(finalList)
        emitChange(finalList.map((i) => i.url as string).join(','))
        message.success('上传成功！')
      })
      .catch((e) => {
        console.error(e)
        setFileList([...oldFileList])
        message.error('上传失败！')
      })
  }

  useEffect(() => {
    if (props.value && props.value.length > 0) {
      setFileList([])
    }
  }, [props.value])

  return (
    <div style={{ ...props.style }}>
      <Upload {...props} fileList={fileList} onChange={onChange} customRequest={handleUpload}>
        <Button icon={<UploadOutlined />}>上传</Button>
      </Upload>
    </div>
  )
}

export default MyUpload
