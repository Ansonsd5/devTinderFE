// NoAuthRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const NoAuthRoute = () => {
  const user = useSelector((store) => store.user);
  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default NoAuthRoute;
