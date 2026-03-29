import { useState, useRef, useEffect } from "react"
import { Form, Button, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./auth.css"

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmRef = useRef()
  const { signup, currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) navigate("/dashboard", { replace: true })
  }, [currentUser, navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== confirmRef.current.value) {
      setError("Passwords do not match.")
      return
    }
    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate("/dashboard", { replace: true })
    } catch {
      setError("Could not create your account. Try a different email.")
    }
    setLoading(false)
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Create account</h1>
        {error && (
          <Alert variant="danger" className="py-2">
            {error}
          </Alert>
        )}
        <Form onSubmit={handleSubmit} className="auth-form">
          <Form.Group className="auth-group" controlId="signup-email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required autoComplete="email" />
          </Form.Group>
          <Form.Group className="auth-group" controlId="signup-password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              ref={passwordRef}
              required
              autoComplete="new-password"
            />
          </Form.Group>
          <Form.Group className="auth-group" controlId="signup-confirm">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              ref={confirmRef}
              required
              autoComplete="new-password"
            />
          </Form.Group>
          <Button disabled={loading} type="submit" variant="primary" className="auth-submit">
            {loading ? "Creating…" : "Sign up"}
          </Button>
        </Form>
        <div className="auth-links">
          <Link to="/login">Already have an account? Sign in</Link>
        </div>
      </div>
    </div>
  )
}
