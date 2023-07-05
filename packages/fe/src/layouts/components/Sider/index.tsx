import { createElement, useEffect, useState } from 'react'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import cloneDeep from 'lodash-es/cloneDeep'
import { Layout, Menu } from 'antd'
const { Sider } = Layout
import { useNavigate, useLocation, RouteObject } from 'react-router-dom'
import { routes } from '@/routes'
import styles from './styles.module.less'
import { ItemType } from 'antd/es/menu/hooks/useItems'
import { useStore } from '@/stores/index'

type Props = {
  top: number
  width: number
  collapsedWidth: number
  triggerClick: (collapsed: boolean) => void
}

const MySider = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([''])
  const [menuItems, setMenuItems] = useState<ItemType[]>([])
  const user = useStore((state) => state.user)

  const navigate = useNavigate()
  const location = useLocation()

  function selectMenu({ key }: { key: string; keyPath: string[] }) {
    navigate(key)
  }

  function triggerClick() {
    setCollapsed(!collapsed)
    props.triggerClick(!collapsed)
  }

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys)
  }

  function initDefaultOpenKeys() {
    const arr = location.pathname.split('/').map((i) => '/' + i)
    arr.splice(0, 1)
    arr.splice(-1)
    const keys: string[] = []
    let key = ''
    arr.forEach((i) => {
      key = key + i
      keys.push(key)
    })
    setOpenKeys(keys)
  }

  useEffect(() => {
    // if (!user.id) return
    function formatMenu(arr: RouteObject[]) {
      if (!user.menus) {
        if (import.meta.env.VITE_APP_NEED_MOCK === 'true') {
          arr = arr.filter((r) => !r.hidden)
        } else {
          return []
        }
      } else {
        const menusPath = user.menus.map((i) => i.title).concat('/')
        arr = arr.filter((r) => !r.hidden && menusPath.includes(r.path as string))
      }

      arr.forEach((r) => {
        r.key = r.path
        delete r.element
        if (r.children && r.children.length > 0) {
          r.children = formatMenu(r.children)
        }
      })
      return arr
    }
    const menu = formatMenu(cloneDeep(routes))
    const arr = menu.length > 0 ? (menu[0].children as ItemType[]) : []
    setMenuItems(arr)
    if (location.pathname === '/') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const defaultPath = arr[0] ? arr[0].children[0].path : '/403'
      navigate(defaultPath)
    }
  }, [location.pathname, navigate, user])

  useEffect(() => {
    initDefaultOpenKeys()
    setSelectedKeys([location.pathname])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return (
    <Sider
      trigger={createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: styles.trigger,
        onClick: triggerClick,
      })}
      theme="light"
      collapsible
      collapsed={collapsed}
      className={styles.sider}
      style={{ top: props.top + 'px' }}
      width={props.width}
      collapsedWidth={props.collapsedWidth}
    >
      <div className={styles.menu}>
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          items={menuItems}
          onClick={selectMenu}
        />
      </div>
    </Sider>
  )
}

export default MySider
