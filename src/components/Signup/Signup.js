import React,{useState,useRef} from 'react'
import {Form,Button, Container,Alert} from 'react-bootstrap'
import "./Signup.css"
import { useAuth } from '../../Contexts/Authcontext'
import { useNavigate} from "react-router-dom"

function Signup()
{  const emailRef=useRef();
    const passwordRef=useRef();
    const ConfirmpasswordRef=useRef();
    const {signup}=useAuth();
    const [error,setError]=useState(" ")
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()


  async function handleSubmit(e)
  {e.preventDefault()

    if(passwordRef.current.value!==ConfirmpasswordRef.current.value)
       {return setError("passwords do not match")}

       try{
        setError('')
        setLoading(true)
  await signup(emailRef.current.value,passwordRef.current.value)
  navigate("/")
  }catch
  {setError('Failed to create account')}
  setLoading(false)
}

  return(
    <>
     <div className='container'>
      <Container className="Signup">
        <h2 className="header">Signup</h2>
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
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label> Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" ref={ConfirmpasswordRef} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button disabled={loading} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <a href="/Login">Back to Login</a>
    </Container>
    </div>
    </>
)

  }

export default Signup;
