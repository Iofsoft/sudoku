import React, { useState, useEffect } from 'react';
import './App.css';

const SudokuGame = ({time, setTime, setIsRunning}) => {
        const [board, setBoard] = useState([
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '']
          ]);

        useEffect(() =>{
          fetch('http://localhost:3000/game')
          .then(response=>response.json())
          .then(data => setBoard(data));
        }, []);

  const handleInputChange = (e, row, col) => {
    const value = e.target.value;
    const newBoard = [...board];
    newBoard[row][col] = value;
    setBoard(newBoard);
  };

  const isValidMove = (row, col, num) => {
    num = num.toString();
    // Verifica linha
    for (let i = 0; i < 9; i++) {
      if (board[row][i].toString() === num) {
        return false;
      }
    }
    // Verifica coluna
    for (let i = 0; i < 9; i++) {
      if (board[i][col].toString() === num) {
        return false;
      }
    }
    // Verifica quadrante
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
              board[row][col] = '';
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const solveSudoku = () => {
    const boardCopy = [...board];
    if (solveHelper(boardCopy)) {
      setBoard(boardCopy);
      document.querySelector('#msg').innerHTML = "<span style=color:green><b>Sudoku Solved :D !</b><span/>";
      setIsRunning(false);
    } else {
      document.querySelector('#msg').innerHTML = "<span style=color:red><b>Impossible solution :(</b><span/>"
    }
  };
  

  const resetSudoku = () => {
    fetch('http://localhost:3000/game')
    .then(response=>response.json())
    .then(data => setBoard(data));
    document.querySelector('#msg').innerHTML = "";
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
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
  <button onClick={solveSudoku}>Solve</button>
  <button onClick={resetSudoku}>Reset</button>
</div>
  );
};

export default SudokuGame;
