import { useStore } from '@/stores/index'

type Props = {
  urls: string[]
  children?: React.ReactNode
}

function hasPermission(userPermission: string[], paramsPermission: string[]) {
  return userPermission.some((u) => paramsPermission.includes(u))
}

export function PermissionWrap(props: Props) {
  const user = useStore((state) => state.user)

  return (
    <>
      {hasPermission(
        user.menus?.map((i) => i.url),
        props.urls
      ) && props.children}
    </>
  )
}
