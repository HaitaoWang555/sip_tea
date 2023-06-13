import { useEffect } from 'react'
import { useRoutes, useLocation, useNavigate } from 'react-router-dom'
import { routes, constantRoutesPath } from '@/routes'
import { Modal } from 'antd'
import { getToken } from '@/utils/auth'
import { useStore } from '@/stores/index'

function usePermission(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | null {
  const element = useRoutes(routes)
  const location = useLocation()
  const navigate = useNavigate()
  const getInfo = useStore((state) => state.getInfo)
  const user = useStore((state) => state.user)

  useEffect(() => {
    const hasToken = getToken()

    if (!hasToken) {
      if (location.pathname !== '/w/login') {
        navigate('/w/login')
      }
    } else {
      if (location.pathname !== '/w/login' && user && !user.id) {
        getInfo()
      } else {
        if (user && user.menus) {
          if (
            !user.menus
              .map((i) => i.name)
              .concat(constantRoutesPath)
              .includes(location.pathname)
          ) {
            if (location.pathname !== '/404') {
              navigate('/404')
            }
          }
        }
      }
    }
    Modal.destroyAll()
  }, [location, navigate, getInfo])

  return element
}

export default usePermission
