// src/Auth/Register.js
import { useState } from "react";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", address: "", password: "", role: "user" });
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [showErrMsg, setShowErrMsg] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [registerMsg, setRegisterMsg] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    console.log(formData)
    let url = 'http://localhost:5000/api/auth/register'

    if (formData.password === confirmPassword) {
      const options = {
        method: "POST",
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      }
      const response = await fetch(url, options)
      const data = await response.json() 

      console.log(response)
      console.log(data)

      setIsLoading(false)
  
      if (response.ok) {
        toast.success(data.message)
        setIsRegister(true)
        setRegisterMsg(data.message)
        setFormData({name: "", email: "", address: "", password: "", role: "user" })
        setConfirmPassword('')
      } else {
        toast.error(data.message)
        setErrMsg(data.message)
        setShowErrMsg(true)
      }
    } else {
      toast.error("Password doesn't match")
      setErrMsg("Password doesn't match")
      setShowErrMsg(true)
    }
  }

  return (
    <Container className="mt-5">
      <Card className="p-4">
        <h2 className="text-center">Register</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>ConfirmPassword</Form.Label>
            <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </Form.Group>
          <Form.Group  className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select value={formData.role} name="role" onChange={handleChange} required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="store_owner">Store Owner</option>
          </Form.Select>
        </Form.Group>
          <Button type="submit" variant="success" className="w-100">{isLoading ? 'Loading...' : 'Register'}</Button>
        
        {showErrMsg && <p className='register-form-err-msg'>* {errMsg}</p>}
        {isRegister && <p className='register-form-isregister-msg'>* {registerMsg}</p>}
        <p>Default Login Credentials: aa@gmail.com - aa@123</p>
        <p className='register-form-login-here-para'>If you have an account ? <Link to='/login'>Login Here</Link></p>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;