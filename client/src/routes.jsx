import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useContext} from 'react'
import { UserProvider, UserContext } from './UserContext.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import SudokuGame from './components/SudokuGame.jsx';
import Start from './components/Start.jsx'
import Records from './components/Records.jsx';
import Logout from './components/Logout.jsx';
import Protected from './components/Protected.jsx'
import './App.css'

const AppRoutes = () => {
  const {isSignedIn} = useContext(UserContext);

  return (
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/start" element={
              <Protected  isSignedIn={isSignedIn}><Start /></Protected>} />
            <Route path="/game" element={
              <Protected  isSignedIn={isSignedIn}><SudokuGame /></Protected>} />
            <Route path="/record" element={
              <Protected  isSignedIn={isSignedIn}><Records /></Protected>} />
            <Route path="/logout" element={
              <Protected  isSignedIn={isSignedIn}><Logout /></Protected>} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
  );
};

export default AppRoutes;
