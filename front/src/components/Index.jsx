import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Add your CSS imports
import App from './App';
import { UserProvider } from './context/UserContext';

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
);

