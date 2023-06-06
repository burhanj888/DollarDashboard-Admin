import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { useSelector, useDispatch } from 'react-redux'
//import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'



const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [isAdmin, setAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    // Client-side validation
    const validationErrors = [];
    if (!name) {
        validationErrors.push('Name is required');
      } else if (!name.match(/^[a-zA-Z]+ [a-zA-Z]+$/)) {
        validationErrors.push('Name should contain first name and last name only');
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for validating email
        // const northeasternRegex = /@northeastern\.edu$/; // Regular expression for validating Northeastern University domain
      if (!email) {
        validationErrors.push('Email is required');
      } //else if (!(emailRegex.test(email) && northeasternRegex.test(email))) {
        else if (!(emailRegex.test(email))) {
        validationErrors.push('Enter vaild email');
      }
  
      if (!password) {
        validationErrors.push('Password is required');
      } else if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
        validationErrors.push('Password should contain at least 8 characters, one lowercase letter, one uppercase letter, and one number');
      }
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = {
        name,
        email,
        password
    }
    console.log(data)
    // API integration using Fetch
    try {
        const response = await axios.post('http://localhost:8000/api/user/create', {
            name,
            email,
            password,
            isAdmin
          });
          console.log(response.data);
          alert("User Registration Successful!!! Login to access portal.");
          navigate('/');
        } catch (error) {
            alert(error.response.data.message);
            console.log(errors)
            console.log(error.response)
        }
  };

  return (
    <div className="registration-form-container">
      <h2>Admin Registration Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formIsAdmin">
  <Form.Check type="checkbox" label="Is Admin" checked={isAdmin} onChange={(e) => setAdmin(e.target.checked)} />
</Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>

        {errors.length > 0 && (
          <Alert variant="danger">
            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </Alert>
        )}
      </Form>

      <div className="already-member-login">
        <span>Already a member?</span>
        <a href="/">
            <Button variant="link">Log in</Button>
        </a>
      </div>
    </div>
  );
};

export default RegisterForm;
