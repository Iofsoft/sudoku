import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Records from './Records.jsx';
import './App.css'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/game" element={<App />} />
        <Route path="/record" element={<Records />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;