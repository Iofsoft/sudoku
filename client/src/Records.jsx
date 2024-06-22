import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Records = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://localhost:3000/record');
        setRecords(response.data);
      } catch (error) {
        setError('Failed to fetch records');
      }
    };

    fetchRecords();
  }, []);

  return (
    <div className="records-page">
      <h1>Records Ranking</h1>
      <table className="records-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Numbers Left</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={record.id}>
              <td>{index + 1}</td>
              <td>{record.user.username}</td>
              <td>{record.remainingNumbers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Records;
