// src/Auth/Login.js
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from "js-cookie"

import { Form, Button, Container, Card } from "react-bootstrap";

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })
  const [errMsg, setErrMsg] = useState('')
  const [showErrMsg, setShowErrMsg] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate =  useNavigate()

  const handlerChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value})
  }


  const onSubmitSuccess = (token) => {
    Cookies.set('token', token, {expires: 30})
    navigate("/store-management")    
  }

  const onSubmitFailure = (msg) => {
    setErrMsg(msg)
    setShowErrMsg(true)
  }


  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    let url = 'https://roxiler-fullstack-project-backend.onrender.com/api/auth/login'

    const options = {
      method: "POST",
      headers:{ 'Content-Type': 'application/json'},
      body: JSON.stringify(userData),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    setIsLoading(false)

    if (response.ok) {
      toast.success(data.message)
      onSubmitSuccess(data.token)
    } else {
      toast.error(data.message)
      onSubmitFailure(data.message)
    }
  };

  const token = Cookies.get('token')

  if (token !== undefined){
     return navigate('/store-management')
  } else {
     return (
    <Container className="mt-5">
      <Card className="p-4">
        <h2 className="text-center">Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control value={userData.email} onChange={handlerChange} type='email' name='email' placeholder='Enter your email' required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control value={userData.password} onChange={handlerChange} type='password' name='password' placeholder='Enter your password' required />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">{isLoading ? 'Loading...' : 'Login'}</Button>
          {showErrMsg && <p className='login-form-err-msg'>* {errMsg}</p>}
          <p>Default Login Credentials: aa@gmail.com - aa@123</p>
          <p className='login-form-register-here-para'>If you don't have an account ? <Link to='/register'>Register Here</Link></p>
        </Form>
      </Card>
    </Container>
  );
};
}

export default Login;