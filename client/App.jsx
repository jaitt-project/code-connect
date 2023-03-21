/*
import React from 'react';

const App = () => {
  return <></>;
};

export default App;
*/

import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardContainer from './containers/DashboardContainer.jsx';
import LandingPageContainer from './containers/LandingPageContainer.jsx';
import Auth from './components/Auth.jsx';
import Docs from './components/Docs.jsx';
import SettingsContainer from './containers/SettingsContainer.jsx';
import Navbar from './components/Navbar.jsx';
import './styles/application.scss';

const App = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  // Log user in and fetch data if JWT is present
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('//', {
          //insert the path that we're fetching info from here
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          console.log('jwt fetch ok', data[0]); // need to see how the data will ne returned
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

  return (
    <div className='router'>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} />
      <div className='routerMain' id='content'>
        <Routes>
          <Route
            exact
            path='/'
            element={
              loggedIn ? (
                <DashboardContainer
                  loggedIn={loggedIn}
                  user={user}
                  setUser={setUser}
                />
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
          <Route
            exact
            path='/settings'
            element={
              loggedIn ? (
                <SettingsContainer
                  loggedIn={loggedIn}
                  user={user}
                  setUser={setUser}
                />
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
          <Route
            exact
            path='/auth'
            element={
              loggedIn ? (
                <DashboardContainer loggedIn={loggedIn} user={user} />
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

          <Route exact path='/' element={<LandingPageContainer />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
