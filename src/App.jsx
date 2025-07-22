"use client"

import { useState, useEffect } from "react"
import AdminLogin from "./Components/AdminLogin"
import AdminDashboard from "./Components/AdminDashboard"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const session = localStorage.getItem("adminSession")
    if (session) {
      try {
        const parsedSession = JSON.parse(session)
        const now = Date.now()

        // Check if session is still valid (24 hours)
        if (parsedSession.isAuthenticated && now - parsedSession.timestamp < parsedSession.expiresIn) {
          setIsAuthenticated(true)
        } else {
          // Session expired, remove it
          localStorage.removeItem("adminSession")
        }
      } catch (error) {
        console.error("Error parsing session:", error)
        localStorage.removeItem("adminSession")
      }
    }
    setIsLoading(false)
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="App">
      {isAuthenticated ? <AdminDashboard onLogout={handleLogout} /> : <AdminLogin onLogin={handleLogin} />}
    </div>
  )
}

export default App
