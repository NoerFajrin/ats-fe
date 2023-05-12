import React from 'react'
import { useAppSelector } from '../redux/Hook'
import { Navigate, useLocation } from 'react-router-dom'

const AuthProtector = ({children}) => {
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