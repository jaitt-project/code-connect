import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const LogInForm = (props) => {
  const navigate = useNavigate();

  const { setLoggedIn, user, setUser } = props;

  const handleClick = () => {
    window.location.href = '/github';
  };

  return (
    <div className='form-container'>
      <h1>SIGN IN</h1>

      <br />
      <div className='button-flex-wrapper'>
        <button onClick={handleClick}>Sign in with GitHub</button>
      </div>
      <br />
    </div>
  );
};

export default LogInForm;
