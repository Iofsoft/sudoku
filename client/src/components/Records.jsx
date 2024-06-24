import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import '../App.css'

function Records() {
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const gotoGame = () => navigate('/start');

  return (
    <>
      <h1>Records</h1>
      <div className="tableRecords">
        
      </div>
        <button onClick={gotoGame}>Back to Game</button>
        <p id='errMsg'>
          {errMsg}
        </p>
    </>
  )
}

export default Records
