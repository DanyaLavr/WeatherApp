import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);


  const handleLogOut = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ isAuth, setIsAuth, user, setUser, handleLogOut }}>
      {children}
    </UserContext.Provider>
  );
};
