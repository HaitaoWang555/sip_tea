// import usePermission from './hooks/permission'
import { useRoutes } from 'react-router-dom'
import { routes } from '@/routes'
import { ApiContext, api } from '@/context/api-context'

export default function App() {
  // const element = usePermission()
  const element = useRoutes(routes)

  return (
    <ApiContext.Provider value={api}>
      <div className="app">{element}</div>
    </ApiContext.Provider>
  )
}
