import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Context Providers
import { AuthContextProvider } from "./context/AuthContext";
import { ModalsContextProvider } from "./context/ModalsContext";
import { RedirectContextProvider } from "./context/RedirectContext";
import { DataContextProvider } from "./context/DataContext";

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
      <RedirectContextProvider>
        <ModalsContextProvider>
          <BrowserRouter>
            <DataContextProvider>
              <App />
            </DataContextProvider>
          </BrowserRouter>
        </ModalsContextProvider>
      </RedirectContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
