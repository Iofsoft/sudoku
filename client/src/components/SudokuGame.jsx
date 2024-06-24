import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axios from 'axios';
import '../App.css';

const initialBoard = () => {
  return ([
    [5, 3, '', '', 7, '', '', '', ''],
    [6, '', '', 1, 9, 5, '', '', ''],
    ['', 9, 8, '', '', '', '', 6, ''],
    [8, '', '', '', 6, '', '', '', 3],
    [4, '', '', 8, '', 3, '', '', 1],
    [7, '', '', '', 2, '', '', '', 6],
    ['', 6, '', '', '', '', 2, 8, ''],
    ['', '', '', 4, 1, 9, '', '', 5],
    ['', '', '', '', 8, '', '', 7, 9]
    ])
};

const solutionBoard = () => {
  return ([
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
  ])
};

const SudokuGame = () => {
  const [board, setBoard] = useState(initialBoard());
  const [errMsg, setErrMsg] = useState('');
  const [rightNumbers, setRightNumbers] = useState(0);
  const [wrongNumbers, setWrongNumbers] = useState(0);
  const [numbersLeft, setNumbersLeft] = useState(51);
  const [time, setTime] = useState(20000);
  const [timeMsg, setTimeMsg] = useState('');
  const [isRunning, setIsRunningState] = useState(true);
  const {username, setUsername} = useContext(UserContext);  
  const navigate = useNavigate();
    useEffect(() => {
      if (isRunning) {
        const timer = setInterval(() => {
          let timeLeft = time - 10;
          let seconds = Math.floor(timeLeft / 1000);
          let centiseconds = Math.floor((timeLeft % 1000) / 10);
          setTime(timeLeft)
          setTimeMsg(` 00:${seconds.toString().padStart(2, '0')}:${centiseconds.toString().padStart(2, '0')}`);
    
          if (timeLeft <= 0) {
            setIsRunningState(false);
            setTimeMsg('Time\'s up!');
            checkPlay();
            console.log(rightNumbers, wrongNumbers)

          }
        }, 10); // atualizar a cada 10ms para mostrar centésimos de segundos
        return () => clearInterval(timer);
      }
    }, [isRunning, timeMsg]);
  

  const handleInputChange = (e, row, col) => {
    const value = e.target.value;
    const newBoard = [...board];
    newBoard[row][col] = value;
    setBoard(newBoard);
    countNumbersLeft(newBoard);
  };

  const countNumbersLeft = (board) => {
    let numbers = 0;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === '') {
          numbers++;
        }
      }
    }
    setNumbersLeft(numbers);
  };

  const setNumbers = (hits, miss) =>{
    setRightNumbers(hits);
    setWrongNumbers(miss);
  };

  const checkPlay = async ()=>{
    setIsRunningState(false);
    let currentBoard = [...board];
    let initial = initialBoard();
    let solution = solutionBoard();
    let finalBoard = solutionBoard();
    let hits = 0;
    let miss = 0;
    for(let i = 0; i < 9; i ++){
      for(let j = 0; j < 9; j ++){
        if(currentBoard[i][j] != solution[i][j] && currentBoard[i][j] != ''){
            finalBoard[i][j] = currentBoard[i][j];
            document.querySelector(`#cell-${i}-${j}`).classList.add('bad');
            miss++;
            
            
        }
        else if(currentBoard[i][j] == solution[i][j] && currentBoard[i][j] != initial[i][j]){
          document.querySelector(`#cell-${i}-${j}`).classList.add('good');
          hits++;
        }
      }
    }
    console.log('miss' + miss+ 'hits' + hits)
    setNumbers(hits, miss);
    setBoard(finalBoard);
    document.querySelector('#score').style.display='block';
    saveRecord(username, hits, miss);
  };

  // const isValidMove = (board, row, col, num) => {
  //   num = num.toString();
  //   // Verifica linha
  //   for (let i = 0; i < 9; i++) {
  //       if (board[row][i].toString() === num) {
  //           return false;
  //       }
  //   }
  //   // Verifica coluna
  //   for (let i = 0; i < 9; i++) {
  //       if (board[i][col].toString() === num) {
  //           return false;
  //       }
  //   }
  //   // Verifica quadrante
  //   const startRow = Math.floor(row / 3) * 3;
  //   const startCol = Math.floor(col / 3) * 3;
  //   for (let i = startRow; i < startRow + 3; i++) {
  //       for (let j = startCol; j < startCol + 3; j++) {
  //           if (board[i][j].toString() === num) {
  //               return false;
  //           }
  //       }
  //   }
  //   return true;
  // };

  // const solveSudoku = () => {
  //   const finalBoard = [...board];
  //   if (solveHelper(finalBoard)) {
  //       setBoard(finalBoard);
  //       setIsRunningState(false);
  //       document.querySelector('#msg').classList.add('good');
  //       document.querySelector('#msg').classList.remove('bad')
  //       setTimeMsg('Solved :D');
  //   } else {
  //       setIsRunningState(false);
  //       document.querySelector('#msg').classList.add('bad');
  //       setTimeMsg('Impossible Solution');
  //   }
  // };

  // const solveHelper = (board) => {
  //   for (let row = 0; row < 9; row++) {
  //     for (let col = 0; col < 9; col++) {
  //       if (board[row][col] === '') {
  //         for (let num = 1; num <= 9; num++) {
  //           if (isValidMove(board, row, col, num)) {
  //             board[row][col] = num.toString();
  //             if (solveHelper(board)) {
  //                 return true;
  //             }
  //             board[row][col] = '';
  //           }
  //         }
  //         return false;
  //       }
  //     }
  //   }
  //   return true;
  // };

  const resetSudoku = () =>{
    let cells = document.querySelectorAll('input[id^="cell"]');
    cells.forEach(cell => {
      cell.classList.remove('bad');
      cell.classList.remove('good');});
    document.querySelector('#score').style.display = 'none';
    setBoard(initialBoard());
    setIsRunningState(true);
    setTime(20000);
  };

 

  const saveRecord = (username, hits, miss) =>{
    let score = hits - miss;
    axios.post('http://localhost:3000/record', {username, numbersLeft, hits, miss, score})
    .then(response =>{
      if(response.status == 201) setErrMsg('New Record !')

    })
    .catch(error =>{
      console.log(error)
    });
  };

  const gotoRecords = () => navigate('/record');
  const gotoLogout = () => navigate('/logout');
 
  return (
    <div id='sudoku'>
      <h1>{`Sudoku Time! `}</h1>
      <p id='timeMsg'>{`${timeMsg}`}</p>
      <div id='game'>
        <table className='sudoku-table'>
          <tbody>
            {board.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className={[
                    (colIndex === 3 || colIndex === 6)? 'vertical ' : '',
                    (rowIndex === 3 || rowIndex === 6)? ' horizontal' : ''
                  ]}>
                    <input type="text" 
                      id={`cell-${rowIndex}-${colIndex}`}
                      value={cell}  
                      onChange={(e) => handleInputChange(e, rowIndex, colIndex)} 
                      maxLength="1" 
                      style={{ width: '2em', height: '2em', textAlign: 'center' }}
                    />
                  </td>
                ))}
              </tr>
            ))}
            </tbody>
        </table>
        <div id='score'>
          <table>
            <tbody>
              <tr>
                <td>Numbers Left:</td>
                <td>{numbersLeft}</td>
              </tr>
              <tr>
                <td>Right Numbers:</td>
                <td>{rightNumbers}</td>
              </tr>
              <tr>
                <td>Wrong Numbers:</td>
                <td>{wrongNumbers}</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td>{rightNumbers - wrongNumbers}</td>
              </tr>
              <tr>
                <td className={'good'}>{errMsg}</td>
              </tr>
            </tbody>
          </table>        
        </div>
      </div>      
      <div id ='buttons'>
      <button onClick={checkPlay}>Solve🗝️</button>
      <button onClick={resetSudoku}>Reset🔄️</button>
      <button onClick={gotoRecords}>Records🔝</button>
      <button onClick={gotoLogout}>Logout❌</button>
      </div>
    </div>
  );
};

export default SudokuGame;