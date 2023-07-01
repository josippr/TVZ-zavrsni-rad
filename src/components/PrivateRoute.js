import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
//import Spinner from './Spinner'
import { toast } from 'react-toastify'

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus()

  if (checkingStatus) {
    return (toast.info('You have to be logged in first before accessing your profile page!'))
  }

  return loggedIn ? <Outlet /> : <Navigate to='/signIn' />
}

export default PrivateRoute