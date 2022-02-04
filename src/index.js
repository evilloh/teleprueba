import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Posts from './pages/Posts';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {useAuth, AuthProvider} from './context/auth.context'

const ProtectedRoute = ({component: Component, ...rest }) => {
  let { user } = useAuth();

  if (!user || user.token === "") {
    return (
      <Navigate to="/login" />
    );
  }
  return <Component {...rest} user={user}/>;
};


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<ProtectedRoute component={Posts} ></ProtectedRoute>} />
        <Route path="posts" element={<ProtectedRoute component={Posts} ></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute component={Profile} ></ProtectedRoute>} />
        <Route path="login" element={<Login />} />
      </Routes>
    </AuthProvider>
    </BrowserRouter>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
