import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from './Main/Main.jsx';
import Auth from './components/auth.jsx';
import './stylesheets/styles.scss';

const App = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // Log user in and fetch data if JWT is present
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('//', {
          credentials: 'include', //includes the cookie
        });
        if (response.ok) {
          const data = await response.json();
          console.log('jwt fetch ok', data[0]);
          const { user_name, email, _id } = data[0];
          setUser({
            user_name: user_name,
            email: email,
            _id: _id,
          });
          setLoggedIn(true);
        } else {
          console.error('Unable to authenticate jwt');
          setLoggedIn(false);
        }
      } catch (error) {
        console.error('JWT', error);
        setLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    // If user is logged in, redirect to the main page
    if (loggedIn) {
      navigate('/main');
    }
  }, [loggedIn, navigate]);

  return (
    <div className='router'>
      <Routes>
        <Route
          exact
          path='/main'
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
    </div>
  );
};

export default App;
