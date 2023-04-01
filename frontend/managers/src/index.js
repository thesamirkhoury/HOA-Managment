import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Context Providers
import { AuthContextProvider } from "./context/AuthContext";
import { ModalsContextProvider } from "./context/ModalsContext";
import {ContextComposer} from "./context/ContextComposer"; //Combines all the data related context in one context provider

// react router Browser Router
import { BrowserRouter } from "react-router-dom";

// Bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css";
// RTL Bootstrap
import "bootstrap/dist/css/bootstrap.rtl.min.css";
// styling
import "./style.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ModalsContextProvider>
        <BrowserRouter>
          <ContextComposer components={[]}>
            <App />
          </ContextComposer>
        </BrowserRouter>
      </ModalsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
