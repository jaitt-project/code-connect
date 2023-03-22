import React from 'react';
import App from './App.jsx';
import { BrowserRouter, Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './styles/application.scss';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
  <Router>
    <App />
  </Router>
);
