import React, { useContext, useState, useEffect, createContext } from "react"
import { auth } from "../config/firebase"

const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="app-boot" role="status" aria-live="polite">
          <div className="app-boot-inner">
            <span className="app-boot-spinner" />
            <p className="app-boot-text">Loading</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}
