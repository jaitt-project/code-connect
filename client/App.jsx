import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cookies from 'js-cookie'; // Library for reading cookies and what not
import Main from './Main/Main.jsx';
import Auth from './components/auth.jsx';
import './stylesheets/styles.scss';

const App = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

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

  return (
    <div className='router'>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              loggedIn ? (
                <Main loggedIn={loggedIn} user={user} setUser={setUser} />
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
