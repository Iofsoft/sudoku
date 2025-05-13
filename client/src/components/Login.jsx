import { useState, useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import '../App.css'
import { UserContext } from '../UserContext';
import apiConfig from '../config/api';


function Login() {
  const [errMsg, setErrMsg] = useState('');
  const [username, setUsername] = useState('');
  const {login} = useContext(UserContext);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const gotoRegister = () => navigate('/register');


  const handleUsername = (e) =>{
    setUsername(e.target.value)
  }
  const handlePassword = (e) =>{
    setPassword(e.target.value)
  }
  const handleLogin = (e) => {
    e.preventDefault()
    axios.post(`${apiConfig.baseURL}${apiConfig.endpoints.login}`, {username, password})
    .then(response => {
      if(response.status == 200){
        login(response.data)
        navigate('/start')
      }
    })
    .catch(error => {
      console.log(error)
      setErrMsg('Invalid username or password');
    });
  }

  return (
    <>
      <h1>Login</h1>
      <div className="card">
        <form className='card'>
          <label htmlFor="username">User: </label>
          <input type='text' id='username' onChange={handleUsername}></input>
          <label htmlFor="password" >Pass: </label>
          <input type='password' id='password' onChange={handlePassword}></input>
          <div>
            <button type='button' onClick={handleLogin} onKeyDown={handleLogin}>Login</button>
            <button onClick={gotoRegister}>Register</button>
          </div>
        </form>
      </div>
        <p id='errMsg'>
          {errMsg}
        </p>
    </>
  )
}

export default Login
