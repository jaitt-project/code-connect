import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleInput = (e) => {
    if (e.target.name === 'username') setUsername(e.target.value);
    if (e.target.name === 'password') setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
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
  };

  const handleOAuth = async () => {
    // try {
    //   const response = await fetch('/auth/github', {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    //   if (response.status === 200) {
    //     window.location = '/';
    //   } else {
    //     const error = response.json();
    //     throw new Error(error.message);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
    window.location.href = '/github';
  };

  return (
    <div className="login-container">
      <div className="login">
        <h2>
          <strong>Login</strong>
        </h2>
        <Form>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              id="passwordInput"
              name="password"
              value={password}
              onChange={handleInput}
            />
          </Form.Group>
          <Button variant="dark" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
        <hr />
        <p>Sign-in w/ Github</p>
        <Button variant="dark" onClick={handleOAuth}  defaultValue='github'>
          Github &rarr;
          </Button>
        <hr />
        <p>Don't have an account?</p>
        <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default Login;
