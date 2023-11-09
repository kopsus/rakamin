import React from "react"
import { Navigate } from "react-router-dom"

const isUserAuthenticated = () => {
  return localStorage.getItem("token") !== null
}

function PrivateRoute({ children }) {
  return isUserAuthenticated() ? <>{children}</> : <Navigate to="/" />
}

export default PrivateRoute
