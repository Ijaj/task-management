/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from 'react';
import { ttk } from '../../utils/constants';
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (user) => {
    const _ttk = ttk;
    const userWithTTK = { ...user, ttk: _ttk };
    setUser(userWithTTK);
    localStorage.setItem('user', JSON.stringify(userWithTTK));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  function getUser() {
    const activeUser = user || JSON.parse(localStorage.getItem('user'));
    if (user) {
      if (activeUser.ttk < new Date().getTime()) {
        console.log('login expired');
        logout();
        return null;
      }
      else return activeUser;
    }
    else return null
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);