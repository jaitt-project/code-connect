import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cookies from 'js-cookie'; // Library for reading cookies and what not
import MainPage from './Main/MainPage.jsx';
import Auth from './components/auth.jsx';
// import './stylesheets/styles.scss';
import LogInForm from './components/login.jsx';
import SignUpForm from './components/signUp.jsx';

const App = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  // Cookies.set('JWT', 'testingJWT');
  useLayoutEffect(() => {
    // Check if users
    console.log('ULE Called');
    if (Cookies.get('JWT') !== undefined) setLoggedIn(true);
    else {
      setLoggedIn(false);
    }
    console.log(Cookies.get());
    // For use with HTTP only cookies
    // fetch('/github', {
    //   mode: 'no-cors',
    //   credentials: 'include',
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  }, []);

  const handleSignUpSuccess = () => {
    setLoggedIn(true);
    navigate('/');
  };

  return (
    <div className='router'>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              loggedIn ? (
                <MainPage loggedIn={loggedIn} user={user} setUser={setUser} />
              ) : (
                // <Auth
                //   loggedIn={loggedIn}
                //   setLoggedIn={setLoggedIn}
                //   user={user}
                //   setUser={setUser}
                // />
                <LogInForm
                  // toggleFormType={toggleFormType}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  user={user}
                  setUser={setUser}
                  onSignUpSuccess={handleSignUpSuccess}
                />
                // <p>Hello World</p>
              )
            }
          />
          <Route path='/signup' element={<SignUpForm />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
