import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'



function Protected({ children }) {
    const {isSignedIn} = useContext(UserContext);
  if (!isSignedIn) {
    return <Navigate to="/" replace />
  }
  return children
}

export default Protected