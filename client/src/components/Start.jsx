import { useState, useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import '../App.css'

function Start() {
  const [errMsg] = useState('');
  const navigate = useNavigate();
  const gotoGame = () => navigate('/game');
  const gotoRecords = () => navigate('/record')
  const gotoLogout = () => navigate('/logout')

  return (
    <>
      <h1>Sudoku Time !</h1>
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
