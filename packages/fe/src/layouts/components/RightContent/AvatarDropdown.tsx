import { removeToken } from '@/utils/auth'
import { LogoutOutlined } from '@ant-design/icons'
import { Avatar, Dropdown } from 'antd'
import { useStore } from '@/stores/index'
import styles from './styles.module.less'

const AvatarLogo = ({ src }: { src?: string }) => {
  return (
    <Avatar
      size="small"
      className={styles.avatar}
      src={src || 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'}
      alt="avatar"
    />
  )
}

const AvatarDropdown = () => {
  const user = useStore((state) => state.user)
  const logout = useStore((state) => state.logout)
  const menuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ]

  function onMenuClick({ key }: { key: string; keyPath: string[] }) {
    switch (key) {
      case 'logout':
        logout()
          .then(() => {
            removeToken()
            window.location.href = '/#/w/login'
          })
          .catch((err) => {
            console.log(err)
          })
        break

      default:
        break
    }
  }

  return (
    <Dropdown
      getPopupContainer={() => document.body}
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      <span className={styles.action}>
        <AvatarLogo src={user.icon} />
        <span className={styles.name}>{user.nickName}</span>
      </span>
    </Dropdown>
  )
}
export default AvatarDropdown
