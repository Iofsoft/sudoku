import { useState } from 'react'
import './App.css'

function App() {
  const [errMsg, setErrMsg] = useState('alow');

  return (
    <>
      <h1>Register</h1>
      <div className="card">
        <label htmlFor="username">User: </label>
        <input type='text' id='username'></input>
        <br />
        <label htmlFor="email">Email </label>
        <input type='text' id='email'></input>
        <br />
        <label htmlFor="password">Pass: </label>
        <input type='text' id='password'></input>
        <br />
        <label htmlFor="rptPassword">Repeat Password: </label>
        <input type='text' id='rptPassword'></input>
        <br />
        <button>Register</button>
        <a>Back to Login</a>
        <p>
          {errMsg}
        </p>
      </div>
    </>
  )
}

export default App
