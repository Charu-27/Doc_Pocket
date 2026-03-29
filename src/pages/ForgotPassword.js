import { useRef, useState } from "react"
import { Form, Button, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./auth.css"

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("If that email is registered, you will get reset instructions shortly.")
    } catch {
      setError("Something went wrong. Try again in a moment.")
    }
    setLoading(false)
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Reset password</h1>
        {error && (
          <Alert variant="danger" className="py-2">
            {error}
          </Alert>
        )}
        {message && (
          <Alert variant="success" className="py-2">
            {message}
          </Alert>
        )}
        <Form onSubmit={handleSubmit} className="auth-form">
          <Form.Group className="auth-group" controlId="reset-email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required autoComplete="email" />
          </Form.Group>
          <Button disabled={loading} type="submit" variant="primary" className="auth-submit">
            {loading ? "Sending…" : "Send reset link"}
          </Button>
        </Form>
        <div className="auth-links">
          <Link to="/login">Back to sign in</Link>
          <Link to="/signup">Create account</Link>
        </div>
      </div>
    </div>
  )
}
