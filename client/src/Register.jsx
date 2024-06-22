import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      try{
        const response = await axios.post('http://localhost:3000/register', {
          username,
          password,
          email,
        });
        const data = await response.data;

        if(data.error){
          console.log("###################################")
          setError(data.error);
        }
        else{
          alert('Registered Sucessfully')
          navigate('/login');
        }
      }
      catch (error){
        if(error.response.status === 409){
          setMsg('Username already exists')
        }
      }
    }
  };

  const backToLogin = ()=>{
    navigate('/login')
  }

  return (
    <div className="register-box">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <label>
          Name:
          <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          Confirm Password:
          <input type="password" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} required />
        </label>
        <div>
          <span id='unauthorized'>{msg}</span>
        </div>
        <button type="submit" onClick={handleRegister}>Register</button>
        <a onClick={backToLogin}>Back to login</a>
      </form>
    </div>
  );
};

export default Register;