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
      <div className="body">
        <div className="image"></div>
      <Container className="container1" >
        <h1 className="heading1">Login</h1>
        {error && <Alert variant="danger">{error}</Alert>}
     
        <div className="form-container1">
    <Form  onSubmit={handleSubmit}>
      <div className="input-container">
      <Form.Group  controlId="formBasicEmail">
        <Form.Label id="input-text">Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" ref={emailRef} required/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      </div>
<div className="input-container">
      <Form.Group  controlId="formBasicPassword">
        <Form.Label id="input-text">Password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={passwordRef} required/>
      </Form.Group>
      </div>
      
      <Button disabled={loading} variant="primary" type="submit">
        Submit
      </Button>
         </Form>
      <br></br>
      <br></br>
      <div className="links1">
        <a href="ForgetPassword">Forget Password </a>
        <a href="Signup">Back to Signup </a>
      </div>
 
    </div>
    </Container>
    </div>
    
    </>
)

  }

export default Login;
