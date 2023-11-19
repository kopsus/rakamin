import React, { useContext, useEffect, useState } from "react"
import Cookies from "js-cookie"

const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = Cookies.get("isLoggedIn")
    setIsLoggedIn(token)
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

  return { isLoggedIn, setIsLoggedIn }
}

export { AuthProvider, useAuth }
