import { createContext, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Hey! You forgot to wrap your component tree in the AuthProvider!, useAuth must be used within AuthProvider');
  }
  return context;
};