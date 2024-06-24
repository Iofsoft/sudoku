import React, {useState, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import {UserContext} from '../UserContext';

function Records() {
  const [records, setRecords] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const {username, setUsername} = useContext(UserContext);
  const navigate = useNavigate();

  const gotoGame = () => navigate('/start');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://localhost:3000/record');
        setRecords(response.data);
      } catch (error) {
        setErrMsg('Error fetching records');
      }
    };

    fetchRecords();
  }, []);

  return (
    <div>
      <h1>Records</h1>
      {errMsg && <p>{errMsg}</p>}
      <table id='tableRecords'>
        <thead>
          <tr>
            <th>User</th>
            <th>Numbers Left</th>
            <th>Right Numbers</th>
            <th>Wrong Numbers</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record.id}>
              <td>{record.user.username}</td>
              <td>{record.numbersLeft}</td>
              <td>{record.rightNumbers}</td>
              <td>{record.wrongNumbers}</td>
              <td>{record.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={gotoGame}>Go back to game</button>
    </div>
  );
};

export default Records;
