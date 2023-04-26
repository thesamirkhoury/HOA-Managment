import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// RTL Bootstrap
import "bootstrap/dist/css/bootstrap.rtl.min.css";
// styling
import "./style.scss";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
