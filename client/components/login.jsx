import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const LogInForm = (props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_name: '',
    password_: '',
  });
  const { setLoggedIn, user, setUser } = props;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // will add user data to state
  const handleSubmit = async (event) => {
    event.preventDefault();
    const signInFormData = {
      user_name: formData.user_name,
      password_: formData.password_,
    };

    try {
      const response = await fetch(`/api/${formData.user_name}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify([signInFormData]),
      });

      if (response.ok) {
        const data = await response.json();
        const { user_name, full_name, email, _id } = data;
        setUser({
          full_name: full_name,
          user_name: user_name,
          email: email,
          _id: _id,
        });
        setLoggedIn(true);
      } else {
        console.log('Invalid password');
        const passwordInput = document.getElementById('password_');
        passwordInput.style.border = '2px solid red';
        passwordInput.value = '';
      }
    } catch (error) {
      console.error('error signing in: ', error);
    }
  };

  useEffect(() => {
    console.log('user has been updated in state');
  }, [user]);

  return (
    <div className='form-container'>
      <h1>SIGN IN</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type='username'
            name='user_name'
            value={formData.user_name}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Password
          <input
            type='password'
            name='password_'
            id='password_'
            value={formData.password_}
            onChange={handleInputChange}
            required
          />
        </label>

        <br />
        <div className='button-flex-wrapper'>
          <button type='submit' className='primary-button'>
            Sign In
          </button>
          <button
            onClick={() => navigate('/signup')}
            className='secondary-button'
          >
            Sign Up Here
          </button>
        </div>
        <br />
      </form>
    </div>
  );
};

export default LogInForm;
