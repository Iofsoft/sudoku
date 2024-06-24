import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import '../App.css'

function Records() {
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const gotoGame = () => navigate('/game');
  const gotoRecords = () => navigate('/record')
  const gotoLogout = () => navigate('/logout')

  return (
    <>
      <h1>Sudoku Time !</h1>
      <div className="">
        
      </div>
        <button onClick={gotoGame}>Start Game</button>
        <button onClick={gotoRecords}>Records🔝</button>
        <button onClick={gotoLogout}>Logout❌</button>
        <p id='errMsg'>
          {errMsg}
        </p>
    </>
  )
}

export default Records
