import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import '../App.css'

function Login() {
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const gotoRegister = () => navigate('/register');

  return (
    <>
      <h1>Login</h1>
      <div className="card">
        <label htmlFor="username">User: </label>
        <input type='text' id='username'></input>
        <label htmlFor="password">Pass: </label>
        <input type='password' id='password'></input>
      </div>
        <button>Login</button>
        <button onClick={gotoRegister}>Register</button>
        <p id='errMsg'>
          {errMsg}
        </p>
    </>
  )
}

export default Login
