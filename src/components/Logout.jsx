// src/components/Logout.js
import React from 'react';
import { Amplify } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

const Logout = () => {
  const history = useNavigate();
  const { user, signOut } = useAuthenticator();

  const handleLogout = async () => {
    try {
     signOut();
      console.log('User signed out');
      history('/login'); // Çıkış yaptıktan sonra login sayfasına yönlendir
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
