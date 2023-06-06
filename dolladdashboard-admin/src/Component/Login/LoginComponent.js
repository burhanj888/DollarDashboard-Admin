import React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Col, Row, Container, Alert } from 'react-bootstrap';
//import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
// import { login, reset } from '../../features/auth/authSlice'
//import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
//import { protect1} from '../../../../Backend/backend/middleware/authMiddleware'
//import authService from './authService'
import './Login.css';



const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [clientID, setClientID] = useState('495016874659-ovv7sk179v4btf1e7pig37napq6kfu1u.apps.googleusercontent.com')



  console.log("loginForm")
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    // Client-side validation
    const validationErrors = [];
    if (!email.trim()) {
      validationErrors.push('Email is required');
    }
    if (!password.trim()) {
      validationErrors.push('Password is required');
    }
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // API integration using Fetch
    try {
      const response = await axios.post('http://localhost:8000/api/user/login', {
        email,
        password
      });
      console.log(response.data);
      if(response.data.isAdmin){
        setAuthenticated(true);
      //   const data = await response.json();
      //   console.log(data)
      localStorage.setItem('username', response.data.name);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('isAdmin', response.data.isAdmin); // Store JWT in localStorage
      navigate('/user'); // Redirect to dashboard after successful login
      }
      else{
        alert("You are not admin");
      }
      


    } catch (error) {
      setShowAlert(true)
    }
  };



  const handleGoogleLogin = async (e) => {
    //e.preventDefault();
    setErrors([]);
    console.log("Testing");
    console.log(e);

    // API integration using Fetch
    try {
      const response = await axios.post('http://localhost:8000/api/user/createUsingGoogle', {
        e
      });
      {
        console.log(response.data);
        setAuthenticated(true);
        //   const data = await response.json();
        //   console.log(data)
        localStorage.setItem('username', response.data.name);
        localStorage.setItem('token', response.data.token); // Store JWT in localStorage
        localStorage.setItem('googleLogIn', true)
        navigate('/dashboard'); // Redirect to dashboard after successful login
      }
    } catch (error) {
      setShowAlert(true)
    }
  };
  return (
    // <div className='loginForm'>
    <Container >
      <Row className="justify-content-center mt-5">
        <Col md={6} >
          <div className="p-4 border rounded">
            <h2 className="text-center mb-4">Admin Login</h2>
            {showAlert && (
              <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                Invalid credentials!
              </Alert>
            )}
            <Form onSubmit={handleSubmit} >
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-with-line"
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-with-line"
                />
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button variant="primary" type="submit" style={{width:'80%'}}>
                  Login
                </Button>
              </div>
              <div className="d-flex justify-content-between" style={{ marginLeft: '20%',marginTop:'10  px'}}>

       
                </div>
                

            </Form>
            <div className="already-member-login">
              <span>New User?</span>
              <a href="/register">
                <Button variant="link">Register</Button>
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    // </div>


  );

};

export default LoginForm;
