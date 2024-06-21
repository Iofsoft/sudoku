import React, { useState } from 'react';
import database from "../../server/db";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


    const handleLogin = async (e) => {
        e.preventDefault();

      try {
        await database.sync();
        const [results, metadata] = await database.query(
          'SELECT * FROM players WHERE name = ? AND password = ?',
          {
            replacements: [username, password],
          }
        );
        if (results.length > 0) {
          console.log('Login successful');
          // Add your login success logic here
        } else {
          console.log('Invalid username or password');
          // Handle invalid login
        }
      } catch (error) {
        console.error(error);
      }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
 
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
        <button type="button" onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
};

export default Login;
