import { Link } from 'react-router-dom';
import React from 'react';

import Button from 'react-bootstrap/Button';

export default function Home() {
  return (
    <div className='homePage'>
      <h1>
        <st>Welcome to Code-Connect!</st>
      </h1>
      <p>Challenge your friends to a coding duel to the death!</p>
      <div className='homebuttondiv'>
        <Link to='/signup'>
          <Button variant='dark'>Sign up</Button>
        </Link>
        <Link to='/login'>
          <Button variant='dark'>Login</Button>
        </Link>
      </div>
    </div>
  );
}
