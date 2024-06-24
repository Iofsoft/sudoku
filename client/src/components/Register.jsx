import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import '../App.css'

function Register() {
  const [errMsg, setErrMsg] = useState('');
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rptPassword, setRptPassword] = useState('')
  const navigate = useNavigate();

  const gotoLogin = () => navigate('/login')

  const handleUsername = (e) =>{
    setUsername(e.target.value)
  }
  const handleEmail = (e) =>{
    setEmail(e.target.value)
  }
  const handlePassword = (e) =>{
    setPassword(e.target.value)
  }
  const handleRptPassword = (e) =>{
    setRptPassword(e.target.value)
  }

  const handleRegister = () => {
    if(password !== rptPassword) setErrMsg('Passwords don\'t Match !')
    else if(email == '') setErrMsg('Invalid Email')
    else{
      axios.post('http://localhost:3000/register', {username, password, email})
      .then(response =>{
        console.log(reponse.data);
      })
      .catch(error =>{
        console.error(error);
        setErrMsg('Invalid username or password')
      })
    }
  }


  return (
    <>
      <h1>Register</h1>
      <div className="card">
        <label htmlFor="username">User: </label>
        <input type='text' id='username' onChange={handleUsername} required></input>
        <label htmlFor="email">Email: </label>
        <input type='text' id='email'onChange={handleEmail}></input>
        <label htmlFor="password">Pass: </label>
        <input type='password' id='password'onChange={handlePassword} required></input>
        <label htmlFor="rptPassword">Repeat Password: </label>
        <input type='password' id='rptPassword'onChange={handleRptPassword}required></input>
      </div>
        <button type='submit' onClick={handleRegister}>Register</button>
        <a onClick={gotoLogin}>Back to Login</a>
        <p id='errMsg'>
          {errMsg}
        </p>
    </>
  )
}

export default Register
