import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, clearToken } from '@/lib/jwt';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface ProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: ProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCurrentUser = async (token: string) => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        clearToken();
        setUser(null);
        router.push('/login');
      }
    } catch (e) {
      console.error('Failed to fetch current user', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchCurrentUser(token);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (token: string) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('nexaui_jwt_token', token);
    }
    fetchCurrentUser(token);
  };

  const logout = () => {
    clearToken();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
