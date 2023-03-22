import React from 'react';
import MonacoEditor from './components/Editor';
import LogoutButton from './components/logoutButton';
import { Router, Routes, Route } from 'react-router-dom';

const MainPage = () => {
  return (
    <>
      {/* <BrowserRouter> */}
      <MonacoEditor />
      {/* <LogoutButton /> */}
      {/* </BrowserRouter> */}
    </>
  );
};

export default MainPage;
