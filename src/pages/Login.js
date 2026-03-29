import { useState, useRef, useEffect } from "react"
import { Form, Button, Alert } from "react-bootstrap"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./auth.css"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/dashboard"

  useEffect(() => {
    if (currentUser) navigate("/dashboard", { replace: true })
  }, [currentUser, navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate(from, { replace: true })
    } catch {
      setError("Could not sign in. Check your email and password.")
    }
    setLoading(false)
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Sign in</h1>
        {error && (
          <Alert variant="danger" className="py-2">
            {error}
          </Alert>
        )}
        <Form onSubmit={handleSubmit} className="auth-form">
          <Form.Group className="auth-group" controlId="login-email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required autoComplete="email" />
          </Form.Group>
          <Form.Group className="auth-group" controlId="login-password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              ref={passwordRef}
              required
              autoComplete="current-password"
            />
          </Form.Group>
          <Button disabled={loading} type="submit" variant="primary" className="auth-submit">
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </Form>
        <div className="auth-links">
          <Link to="/forgot-password">Forgot password</Link>
          <Link to="/signup">Create an account</Link>
        </div>
      </div>
    </div>
  )
}
