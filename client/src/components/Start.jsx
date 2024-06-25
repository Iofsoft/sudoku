import { useState, useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../UserContext'
import '../App.css'

function Start() {
  const {time, setTime} = useContext(UserContext);
  const [errMsg] = useState('');
  const navigate = useNavigate();
  const gotoGame = () => navigate('/game');
  const gotoRecords = () => navigate('/record')
  const gotoLogout = () => navigate('/logout')

  const handleInputChange = (e) =>{
    setTime(e.target.value * 1000);
  }

  return (
    <>
      <h1>Sudoku Time !</h1>
      <div id='timeStart'>
      <h2>Time:</h2>
      <input type='number' onChange={handleInputChange}></input>
      </div>
      <div className="buttonsStart">
        <button onClick={gotoGame}>Start Game</button>
        <button onClick={gotoRecords}>Records🔝</button>
        <button onClick={gotoLogout}>Logout❌</button>
      </div>
        <p id='errMsg'>
          {errMsg}
        </p>
    </>
  )
}

export default Start
