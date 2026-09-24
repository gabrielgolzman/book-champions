import { Navigate, Outlet } from 'react-router'

const Protected = ({ isSignedIn }) => {
  if (!isSignedIn)
    return <Navigate to="/login" replace />

  return <Outlet />
}

export default Protected
