import React from 'react';
import { useLocation } from 'react-router-dom';

import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import EditProfile from '../EditProfile/EditProfile';

const Forms = () => {
  const location = useLocation();

  if (location.pathname === '/sign-up') {
    return <SignUp />;
  } else if (location.pathname === '/sign-in') {
    return <SignIn />;
  } else if (location.pathname === '/profile') {
    return <EditProfile />;
  }
};

export default Forms;
