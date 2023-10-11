import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../Contexts/Authcontext"
import { Link } from "react-router-dom"
import "./ForgetPassword.css"

 function ForgetPassword() {
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
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <>
      <Card className="container">
        <Card.Body>
          <h1 className="text-center mb-4">Password Reset</h1>
         
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <div className="form-conatiner">
          <Form onSubmit={handleSubmit}>
            <div className="input-container">
            <Form.Group ControlId="formBasicEmail">
              <Form.Label id="input-text">Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" ref={emailRef} required />
            </Form.Group>
            </div>
            <Button disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
          </div>
        </Card.Body>
      </Card>
          <div className="links">
            <Link to="/login">Login</Link>
         <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}

export default ForgetPassword