import {createContext, useState, useEffect} from 'react';

const UserContext = createContext();

const UserProvider = ({children}) =>{
    const [username, setUsername] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token' || null));

    useEffect(() => {
        if (token) {
          localStorage.setItem('token', token);
        } else {
          localStorage.removeItem('token');
        }
      }, [token]);
    
      const login = (userData) => {
        setUsername(userData.username);
        setToken(userData.accessToken);
      };
    
      const logout = () => {
        setUsername(null);
        setToken(null);
      };
    
      return (
        <UserContext.Provider value={{ username, token, login, logout, setUsername }}>
          {children}
        </UserContext.Provider>
      );
    };

export {UserProvider, UserContext}
