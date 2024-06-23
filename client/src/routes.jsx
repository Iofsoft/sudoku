import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx'; // assuming you have a Register component
import SudokuGame from './components/SudokuGame.jsx';
import './App.css'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/game" element={<SudokuGame />} />
        <Route path="/logout" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;