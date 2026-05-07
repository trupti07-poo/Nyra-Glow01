import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginAPI, signup as signupAPI } from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('nyraglow_user');
    const token = localStorage.getItem('nyraglow_token');
    if (stored && token) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await loginAPI({ email, password });
    localStorage.setItem('nyraglow_token', data.token);
    localStorage.setItem('nyraglow_user', JSON.stringify(data));
    setUser(data);
    return data;
  };

  const signup = async (name, email, phone, password) => {
    const { data } = await signupAPI({ name, email, phone, password });
    localStorage.setItem('nyraglow_token', data.token);
    localStorage.setItem('nyraglow_user', JSON.stringify(data));
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('nyraglow_token');
    localStorage.removeItem('nyraglow_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, isAdmin: user?.isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
