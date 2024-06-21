import React, { useState } from 'react';
const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Handle register logic here
  };

  return (
    <div className='login-box'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
        <button onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
};

export default LoginScreen;