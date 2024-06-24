import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx'; // assuming you have a Register component
import SudokuGame from './components/SudokuGame.jsx';
import Start from './components/Start.jsx'
import Records from './components/Records.jsx';
import Logout from './components/Logout.jsx';
import './App.css'
const AppRoutes = () => {
  return (

      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/start" element={<Start />} />
            <Route path="/game" element={<SudokuGame />} />
            <Route path="/record" element={<Records />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
  );
};


export default AppRoutes;