import {createContext, useState, useEffect} from 'react';

const UserContext = createContext();

const UserProvider = ({children}) =>{
    const [username, setUsername] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token' || null));
    const [isSignedIn, setIsSignedIn] = useState(null);
    const [time, setTime] = useState('');
    
    useEffect(() => {
        if (token) {
          localStorage.setItem('token', token);
        } else {
          localStorage.removeItem('token');
        }
      }, [token]);
    
      const login = async (userData) => {
        setUsername(userData.username);
        setToken(userData.accessToken);
        setIsSignedIn(true);
      };
    
      const logout = () => {
        setUsername(null);
        setToken(null);
        setIsSignedIn(false);
      };
    
      return (
        <UserContext.Provider value={{ username, token, isSignedIn, time, login, logout, setUsername, setTime }}>
          {children}
        </UserContext.Provider>
      );
    };

export {UserProvider, UserContext}
