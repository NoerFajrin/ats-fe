import React, { ReactNode } from 'react'
import { useAppSelector } from '../redux/Hook'
import { Navigate, useLocation } from 'react-router-dom'

interface AuthProtectorProps {
    children: any
}
const AuthProtector = ({children}:AuthProtectorProps) => {
    const {isLoggedIn} = useAppSelector(state => state.auth)
  const location = useLocation()

  if(!isLoggedIn){
    return <Navigate to={'/login'} />
  }

  if(location.pathname === '/'){
    return <Navigate to={'/surat-tugas'}/>
  }

  return children
}

export default AuthProtector