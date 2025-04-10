import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter} from 'react-router-dom';
import Houses from './Houses';
import Scarezones from './Scarezones';
import Shows from './Shows';
import Account from './Account';
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter([
  {
    path: "/houses",
    element: <Houses />
  },
  {
    path: "/scarezones",
    element: <Scarezones />
  },
  {
    path: "/shows",
    element: <Shows />
  },
  {
    path: "/account",
    element: <Account />
  },
])


const CLIENT_ID = "86969941053-f573cluqadh996efdsg8h3j7d40e4tgi.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();