import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx'; // assuming you have a Register component
import SudokuGame from './components/SudokuGame.jsx';
import Start from './components/Start.jsx'
import Records from './components/Records.jsx';
import './App.css'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/start" element={<Start />} />
        <Route path="/game" element={<SudokuGame />} />
        <Route path="/record" element={<Records />} />
        <Route path="/logout" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;