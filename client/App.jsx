import React, { useState, useEffect } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
  Link,
} from 'react-router-dom';
import MainPage from './Main/MainPage.jsx';
import Auth from './components/auth.jsx';
import './stylesheets/styles.scss';

const App = (props) => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [user, setUser] = useState({});
  // const navigate = useNavigate();

  // Log user in and fetch data if JWT is present
  useEffect(() => {
    // const checkAuth = async () => {
    // try {
    //   // const response = await fetch('/', {
    //   //   credentials: 'include', //includes the cookie
    //   // });
    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log('data ', data);
    //     console.log('jwt fetch ok', data);
    //     // const { user_name, email, _id } = data[0];
    //     // setUser({
    //     //   user_name: user_name,
    //     //   email: email,
    //     //   _id: _id,
    //     // });
    //     setLoggedIn(true);
    //   } else {
    //     console.error('Unable to authenticate jwt');
    //     setLoggedIn(false);
    //   }
    // } catch (error) {
    //   console.error('JWT', error);
    //   setLoggedIn(false);
    // }
    // };
    // checkAuth();
    console.log('document.cookie-> ', window.document.cookie);
    const jwt = document.cookie
      .split('; ')
      .find((row) => row.startsWith('jwt='))
      .split('=')[1];
    if (jwt) {
      // JWT is available in the cookies
      console.log('JWT found:', jwt);
    } else {
      // JWT is not available in the cookies
      console.log('JWT not found');
    }
    console.log(document.cookie);
  }, []);

  // useEffect(() => {
  //   // If user is logged in, redirect to the main page
  //   if (loggedIn) {
  //     navigate('/');
  //   }
  // }, [loggedIn]);
  // const test = {
  //   username: 'ted',
  //   password: '123',
  // };
  return (
    <div className='router'>
      <Router>
        <Routes>
          {/* <MainPage /> */}
          <Route
            path='/'
            element={
              loggedIn ? (
                <MainPage loggedIn={loggedIn} user={user} setUser={setUser} />
              ) : (
                <Auth
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  user={user}
                  setUser={setUser}
                />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
