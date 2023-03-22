import React from 'react';
import MonacoEditor from './components/Editor';
import { Router, Routes, Route } from 'react-router-dom';

const MainPage = () => {
  return (
    <>
      {/* <BrowserRouter> */}
      <MonacoEditor />
      {/* </BrowserRouter> */}
    </>
  );
};

export default MainPage;
