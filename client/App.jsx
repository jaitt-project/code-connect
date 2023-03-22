import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cookies from 'js-cookie'; // Library for reading cookies and what not
import Main from './Main/Main.jsx';
import Error from './components/errorPage.jsx';
import Home from './components/Home.jsx';
import Login from './components/login.jsx';
import SignUp from './components/signUp.jsx';

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
  }, []);

  const handleSignUpSuccess = () => {
    setLoggedIn(true);
    navigate('/');
  };

  return (
    <div className="router">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Main loggedIn={loggedIn} user={user} setUser={setUser} />
              ) : (
                // <Auth
                //   loggedIn={loggedIn}
                //   setLoggedIn={setLoggedIn}
                //   user={user}
                //   setUser={setUser}
                // />
                <Home
                  // toggleFormType={toggleFormType}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  // user={user}
                  // setUser={setUser}
                  // onSignUpSuccess={handleSignUpSuccess}
                />
                // <p>Hello World</p>
              )
            }
          />

          {/* <Route path='*' element={<Error />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
