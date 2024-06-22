import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const { username, setUsername } = useContext(UserContext);
  const navigate = useNavigate();
 
    const handleLogin = async (e) => {
      e.preventDefault();
        try{
          const response = await axios.post('http://localhost:3000/login', {
            username,
            password
          });
          const data = await response.data;
          if(data.error){
            setError(data.error);
          }
          else{
            navigate('/game');

          }
        }
        catch (error){
          setMsg('User not Found or wrong password')
          setError(error.message)
        }
  };

  const handleRegister = async (e) => {
        navigate('/register')
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
        <div>
          <span id='unauthorized'>{msg}</span>
        </div>
        <button type="submit" onClick={handleLogin}>Login</button>
        <button type="button" onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
};

export default Login;
