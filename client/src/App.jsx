import React, {useState} from 'react';
import SudokuGame from './SudokuGame';
import Timer from './Timer';
import './App.css'

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  return (
    <>
    <div>
      <SudokuGame time={time} setTime={setTime} setIsRunning={setIsRunning} />
      <Timer time={time} setTime={setTime} isRunning={isRunning} setIsRunning={setIsRunning} />
    </div>
  </>
  );
}

export default App;