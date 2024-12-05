// src/components/Login.js
import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();  // Sayfa yönlendirmesi için

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await Amplify.Auth.signIn(email, password);
      console.log('User signed in:', user);
      history('/'); // Giriş yaptıktan sonra başka bir sayfaya yönlendir
    } catch (error) {
      console.error('Error signing in', error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
