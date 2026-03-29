import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import PrivateRoute from "./components/PrivateRoute"
import SplashScreen from "./pages/SplashScreen"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword"
import Dashboard from "./components/drive/Dashboard"

function HomeRoute() {
  const { currentUser } = useAuth()
  if (currentUser) return <Navigate to="/dashboard" replace />
  return <SplashScreen />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/folder/:folderId"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
