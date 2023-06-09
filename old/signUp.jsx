import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const signUpForm = (props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: '',
    user_name: '',
    email: '',
    password_: '',
    confirmPassword: '',
  });
  const { toggleFormType, setUser, onSignUpSuccess } = props;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const signUpFormData = {
      full_name: formData.full_name,
      user_name: formData.user_name,
      email: formData.email,
      password_: formData.password_,
    };
    if (formData.password_ !== formData.confirmPassword)
      return handleMismatchedPasswords();
    if (formData.password_ === formData.confirmPassword)
      console.log('signing up....');

    try {
      const response = await fetch('/', {
        //Add the path of where we're posting our new user info
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify([signUpFormData]), //May need to change data type depending on what the backend is expecting
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
        onSignUpSuccess();
      } else {
        console.log('Sign up failed');
      }
    } catch (error) {
      console.error(error);
      console.log('Unable to sign-up at this time: ');
    }
  };

  const handleMismatchedPasswords = () => {
    console.log('passwords do not match');
    const passwordInput = document.getElementById('confirmPassword');
    passwordInput.style.border = '2px solid red';
  };

  return (
    <div className='form-container'>
      <h1>SIGN UP</h1>

      <form onSubmit={handleSubmit}>
        <label>
          <br />
          First / Last name
          <input
            type='name'
            name='full_name'
            value={formData.full_name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          <br />
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
          <br />
          Email
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          <br />
          Password
          <input
            type='password'
            name='password_'
            value={formData.password_}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          <br />
          Confirm Password
          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <div className='button-flex-wrapper'>
          <button type='submit' className='primary-button'>
            Sign Up
          </button>
          <button onClick={() => navigate('/')} className='secondary-button'>
            Click here to Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default signUpForm;
