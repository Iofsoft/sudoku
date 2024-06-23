import { useState } from 'react'
import './App.css'

function Login() {
  const [errMsg, setErrMsg] = useState('');

  return (
    <>
      <h1>Login</h1>
      <div className="card">
        <label htmlFor="username">User: </label>
        <input type='text' id='username'></input>
        <br />
        <label htmlFor="password">Pass: </label>
        <input type='text' id='password'></input>
        <br />
        <button>Login</button>
        <button>Register</button>
        <p id='errMsg'>
          {errMsg}
        </p>
      </div>
    </>
  )
}

export default Login
