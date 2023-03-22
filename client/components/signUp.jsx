import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInput = (e) => {
    switch (e.target.name) {
      case 'first-name':
        setFirstName(e.target.value);
        break;
      case 'last-name':
        setLastName(e.target.value);
        break;
      case 'username':
        setUsername(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    const validateEmail = (email) =>
      !!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/);

    const validateUsername = (username) =>
      !!username.match(/^[a-zA-Z0-9._-]{3,25}$/);

    const validatePassword = (password) =>
      !!password.match(/^[a-zA-Z0-9._-]{8,}$/);

    const emailvalidity = validateEmail(email);
    const usernamevalidity = validateUsername(username);
    const passwordvalidity = validatePassword(password);

    if (emailvalidity && usernamevalidity && passwordvalidity) {
      try {
        const response = await fetch('/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            username,
            email,
            password,
            avatar,
          }),
        });

        if (response.status === 200) {
          window.location = '/';
        } else {
          const error = response.json();
          throw new Error(error.message);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      window.alert('Please enter valid credentials');
    }
  };

  return (
    <div className='signup-container'>
      <div className='signup'>
        <h2>
          <strong>Sign-Up Today!</strong>
        </h2>
        <Form>
          <h6>Used by Will, Phil, and millions more</h6>
          <Form.Group className='mb-3'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter first name'
              name='first-name'
              value={firstName}
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter last name'
              name='last-name'
              value={lastName}
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Username'
              name='username'
              value={username}
              onChange={handleInput}
            />
            <Form.Text className='text-muted'>
              Username must be between 3 and 25 characters
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              name='email'
              value={email}
              onChange={handleInput}
            />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              id='passwordInput'
              name='password'
              value={password}
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Check
              type='checkbox'
              label='I agree to the terms and conditions!'
            />
          </Form.Group>
          <Button variant='dark' onClick={handleSubmit}>
            Submit
          </Button>
        </Form>

        <p>
          Already a user? <Link to='/login'>Login</Link>
        </p>
      </div>
    </div>
  );
}
