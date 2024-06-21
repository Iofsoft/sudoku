import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx'; // assuming you have a Register component
import './App.css'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/game" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;