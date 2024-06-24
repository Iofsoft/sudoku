import { useState, useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import '../App.css'
import { UserContext } from '../UserContext';

function Login() {
  const [errMsg, setErrMsg] = useState('');
  const {username, setUsername} = useContext(UserContext);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const gotoRegister = () => navigate('/register');

  const handleUsername = (e) =>{
    setUsername(e.target.value)
  }
  const handlePassword = (e) =>{
    setPassword(e.target.value)
  }
  const handleLogin = () => {
    axios.post('http://localhost:3000/login', {username, password})
    .then(response => {
      console.log(response.data)
      if(response.status == 200){
        navigate('/start')
      }
    })
    .catch(error => {
      console.error(error);
      setErrMsg('Invalid username or password');
    });
  }

  return (
    <>
      <h1>Login</h1>
      <div className="card">
        <form action="submit" className='card'>
          <label htmlFor="username">User: </label>
          <input type='text' id='username' onChange={handleUsername}></input>
          <label htmlFor="password" >Pass: </label>
          <input type='password' id='password' onChange={handlePassword}></input>
        </form>
      </div>
        <button type='button' onClick={handleLogin}>Login</button>
        <button onClick={gotoRegister}>Register</button>
        <p id='errMsg'>
          {errMsg}
        </p>
    </>
  )
}

export default Login
