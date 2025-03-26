import { createContext, useEffect, useState } from 'react';
import { Token, User } from '../interfaces/interfaces';

//1 - Define the context type structure
interface AuthContextType {
  token: Token;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  loading: boolean;
}

//2 - Create the context
export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
  loading: false,
});

//3 - Create the context provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken) {
      setToken(savedToken);
      if (savedUser) setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  //when token changes, save it to local storage
  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  //when user changes, save it to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (token: string, user: User) => {
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
