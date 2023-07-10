import { useState } from 'react'
import { Menu } from 'antd'
import BaseView from './base'
import styles from './styles.module.less'
import { ItemType } from 'antd/es/menu/hooks/useItems'

type SettingsStateKeys = 'base' | 'security' | 'binding' | 'notification'
type SettingsState = {
  mode: 'inline' | 'horizontal'
  selectKey: SettingsStateKeys
}

function AccountSettings() {
  const menuItems: ItemType[] = [
    {
      key: 'base',
      label: '基本设置',
    },
    {
      key: 'security',
      label: '安全设置',
    },
  ]

  const [initConfig, setInitConfig] = useState<SettingsState>({
    mode: 'inline',
    selectKey: 'base',
  })
  const [title, setTitle] = useState('基本设置')

  const menuItemClick = (key: string) => {
    setInitConfig({
      ...initConfig,
      selectKey: key as SettingsStateKeys,
    })
    const item = menuItems.find((i) => i?.key === key)
    if (item) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setTitle(item.label)
    }
  }

  const RenderChildren = () => {
    const { selectKey } = initConfig
    switch (selectKey) {
      case 'base':
        return <BaseView />
      default:
        return null
    }
  }

  return (
    <div className={styles.gridContent}>
      <div className={styles.main}>
        <div className={styles.leftMenu}>
          <Menu
            mode={initConfig.mode}
            selectedKeys={[initConfig.selectKey]}
            onClick={({ key }) => {
              menuItemClick(key)
            }}
            items={menuItems}
          ></Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{title}</div>
          {RenderChildren()}
        </div>
      </div>
    </div>
  )
}

export default AccountSettings
