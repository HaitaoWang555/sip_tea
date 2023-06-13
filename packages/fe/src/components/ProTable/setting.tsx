import { ColumnHeightOutlined, ReloadOutlined, SettingOutlined } from '@ant-design/icons'
import styles from './styles.module.less'

function TableSetting() {
  return (
    <div className={styles['table-setting']}>
      <ReloadOutlined />
      <ColumnHeightOutlined />
      <SettingOutlined />
    </div>
  )
}

export default TableSetting
