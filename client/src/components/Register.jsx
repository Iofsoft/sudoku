import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import '../App.css'

function Register() {
  const [errMsg, setErrMsg] = useState('User already registered');
  const navigate = useNavigate();

  const gotoLogin = () => navigate('/login')
  return (
    <>
      <h1>Register</h1>
      <div className="card">
        <label htmlFor="username">User: </label>
        <input type='text' id='username'></input>
        <label htmlFor="email">Email: </label>
        <input type='text' id='email'></input>
        <label htmlFor="password">Pass: </label>
        <input type='password' id='password'></input>
        <label htmlFor="rptPassword">Repeat Password: </label>
        <input type='password' id='rptPassword'></input>
      </div>
        <button>Register</button>
        <a onClick={gotoLogin}>Back to Login</a>
        <p id='errMsg'>
          {errMsg}
        </p>
    </>
  )
}

export default Register
