import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

import { RootState } from '../redux/store'
import { ROLES } from '../constants/constants'

const PrivateRoutes = () => {
  const state = useSelector((state: RootState) => state.logedinUser.decodedUser)
  let auth = { 'token': state?.role === ROLES.ADMIN }
  return auth.token ? <Outlet /> : <Navigate to="/home" />
}

export default PrivateRoutes