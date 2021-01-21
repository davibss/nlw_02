import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// o React.StrictMode injeta html no document.getElementById('root')
ReactDOM.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>,
  document.getElementById('root')
);
