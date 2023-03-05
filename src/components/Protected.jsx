import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider'

const Protected = ({children}) => {
  const {user} = useAuth();
  if(user === null){
    return <Navigate to={'/signup'}/>
  }
  return children
}

export default Protected