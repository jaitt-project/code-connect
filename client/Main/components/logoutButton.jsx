/*
import React from 'react';
import { useCookies } from 'react-cookie';

const LogoutButton = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

  const handleLogout = () => {
    // Delete the 'jwt' cookie
    removeCookie('jwt');

    // TODO: Implement any additional logout logic, such as redirecting to a login page
  };

  return (
    <>
      <button className='logoutButton' onClick={handleLogout}>Logout</button>;
    </>
  );
};

export default LogoutButton;
*/

import React from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const history = useHistory();

  const handleLogout = () => {
    // Delete the 'jwt' cookie
    removeCookie('jwt');

    // Redirect the user to the login page
    history.push('/login');
  };

  return (
    <>
      <button className='logoutButton' onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default LogoutButton;
