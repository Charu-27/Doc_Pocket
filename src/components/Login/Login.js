import React,{useState,useRef} from 'react'
import {Form,Button, Container,Alert} from 'react-bootstrap'
import "./Login.css"
import { useAuth } from '../../Contexts/Authcontext'
import {useNavigate} from "react-router-dom"

function Login()
{  const emailRef=useRef();
    const passwordRef=useRef();
    const {login}=useAuth();
    const [error,setError]=useState(" ")
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()


  async function handleSubmit(e)
  {e.preventDefault()


       try{
        setError('')
        setLoading(true)
  await login(emailRef.current.value,passwordRef.current.value)
      navigate("/Dashboard")
  }catch
  {setError('Failed to login')}
  setLoading(false)
}

  return(
    <>
     <div className='container'>
      <Container className="Signup">
        <h2 className="header">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" ref={emailRef} required/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={passwordRef} required/>
      </Form.Group>
      
      <Button disabled={loading} variant="primary" type="submit">
        Submit
      </Button>
      <div>
        <a href="ForgetPassword">Forget Password </a>
        <a href="Signup">Back to Signup </a>
      </div>
    </Form>
    </Container>
    </div>
    </>
)

  }

export default Login;
