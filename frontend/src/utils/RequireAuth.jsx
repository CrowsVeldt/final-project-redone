import { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Spinner } from '@chakra-ui/react';

const RequireAuth = () => {
  const { user } = useContext(AuthContext);
  
  return user?.user ? <Outlet /> : <Navigate to='/' replace />;
};

export default RequireAuth;