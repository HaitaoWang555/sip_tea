import { ColumnHeightOutlined, ReloadOutlined, SettingOutlined } from '@ant-design/icons'
import styles from './styles.module.less'

export type Props = {
  getDate: (params?: any) => void
}

function TableSetting(props: Props) {
  return (
    <div className={styles['table-setting']}>
      <ReloadOutlined onClick={props.getDate} />
      <ColumnHeightOutlined />
      <SettingOutlined />
    </div>
  )
}

export default TableSetting
