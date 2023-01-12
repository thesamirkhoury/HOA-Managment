import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// react router Browser Router
import { BrowserRouter } from "react-router-dom";

// Bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css";
// RTL Bootstrap
import "bootstrap/dist/css/bootstrap.rtl.min.css";
// styling
import './style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
