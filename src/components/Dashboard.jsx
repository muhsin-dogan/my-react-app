// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react';

const Dashboard = () => {
    const { user, signOut } = useAuthenticator();

  useEffect(() => {
    // Kullanıcı bilgilerini almak için Auth.currentUserInfo() kullanın
    const fetchUser = async () => {
      try {
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <h3>Welcome, {user.username}</h3>
          <p>Email: {user.signInDetails.loginId}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default Dashboard;
