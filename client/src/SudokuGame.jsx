import React, { useState,  useContext } from 'react';
import axios from 'axios';
import './App.css';
import { UserContext } from './UserContext';

const initialBoard =() =>([
  ['', 3, '', 6, 7, '', 9, 1, ''],
  ['', '', 2, 1, '', 5, '', 4, ''],
  [1, 9, '', 3, '', 2, '', '', 7],
  [8, '', '', 7, '', 1, '', 2, 3],
  [4, '', 6, '', '', 3, '', '', 1],
  [7, 1, 3, '', '', 4, '', 5, 6],
  [9, '', '', 5, 3, '', '', '', 4],
  ['', 8, 7, '', 1, '', 6, '', 5],
  [3, '', 5, 2, '', 6, 1, '', 9]
]);

const SudokuGame = ({setTime, setIsRunning}) => {
  const [board, setBoard] = useState(initialBoard());
  const [error, setError] = useState('')
  const { username } = useContext(UserContext);  
  
  const handleInputChange = (e, row, col) => {
    const value = e.target.value;
    const newBoard = [...board];
    newBoard[row][col] = value;
    setBoard(newBoard);
  };
  
  const hasInitialValue = (row, col) => {
    return board[row][col] !== '';
  };
  
  const isValidMove = (row, col, num) => {
    num = num.toString();

    for (let i = 0; i < 9; i++) {
      if (board[row][i].toString() === num) {
        return false;
      }
    }
  
    for (let i = 0; i < 9; i++) {
      if (board[i][col].toString() === num) {
        return false;
      }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (board[i][j].toString() === num) {
          return false;
        }
      }
    }
    return true;
  }; 

 const solveHelper = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === '') {
          for (let num = 1; num <= 9; num++) {
            if (isValidMove(row, col, num)) {
              board[row][col] = num.toString();
              if (solveHelper(board)) {
                return true;
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  };
var numbers = 81
  const solveSudoku = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
          if (hasInitialValue(row, col)) {
              numbers--;
        }
      }
    }
    const boardCopy = [...board];
    if (solveHelper(boardCopy)) {
      setBoard(boardCopy);
      document.querySelector('#msg').innerHTML = "<span style=color:green><b>Sudoku Solved :D !</b><span/>";
      setIsRunning(false);
      saveRecord(numbers)
    } else {
      document.querySelector('#msg').innerHTML = "<span style=color:red><b>Impossible solution :(</b><span/>"
    }
  };

  const saveRecord = async (remainingNumbers) => {
    try{
      console.log(remainingNumbers)
      const response = await axios.post('http://localhost:3000/record',{
        username:username,
        remainingNumbers
      });
      const data = await response.data;
      if(data.error){
        setError(data.error);
      }
    }
    catch(error){
      setError(error.message);
    }
  };
  

  const resetSudoku = () => {
    setBoard(initialBoard());
    setTime(0);
    setIsRunning(true);
  };

  return (
  <div id='game'>
  <h1>Sudoku</h1>
  <p id='msg'></p>
  <table className='sudoku-table'>
    <tbody>
      {board.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, colIndex) => (
            <td key={colIndex} className={[
              (colIndex === 3 || colIndex === 6) ? 'vertical' : '',
              (rowIndex === 3 || rowIndex == 6) ? 'horizontal' : '']
              .filter(Boolean)
              .join(' ')
            }>
              <input type="text" value={cell} onChange={(e) => handleInputChange(e, rowIndex, colIndex)} 
              maxLength="1" style={{ width: '2em', height: '2em', textAlign: 'center' }}
              disabled={hasInitialValue(rowIndex, colIndex)}
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
  <button onClick={solveSudoku}>Solve</button>
  <button onClick={resetSudoku}>Reset</button>
  <button>Records</button>
</div>
  );
};

export default SudokuGame;
