'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  role: 'USER' | 'ADMIN';
  savedAddress?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string, role?: 'USER' | 'ADMIN', avatarUrl?: string) => void;
  loginWithGoogle: (email: string, name: string, avatarUrl?: string) => void;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    try {
      const isLoggedOut = localStorage.getItem('lumi_logged_out');
      if (isLoggedOut === 'true') {
        setUser(null);
        return;
      }

      const saved = localStorage.getItem('lumi_user');
      if (saved) {
        setUser(JSON.parse(saved));
      } else {
        // By default: guest is not logged in unless they explicitly authorize
        setUser(null);
      }
    } catch (e) {
      console.error('Failed to load user from localStorage', e);
    }
  }, []);

  const login = (
    email: string,
    name = 'Пользователь',
    role: 'USER' | 'ADMIN' = 'USER',
    avatarUrl?: string
  ) => {
    const newUser: UserProfile = {
      id: 'usr-' + Math.floor(1000 + Math.random() * 9000),
      name,
      email,
      phone: '+7 (999) 000-00-00',
      avatarUrl: avatarUrl || '',
      role,
    };
    setUser(newUser);
    localStorage.removeItem('lumi_logged_out');
    localStorage.setItem('lumi_user', JSON.stringify(newUser));
  };

  const loginWithGoogle = (email: string, name: string, avatarUrl?: string) => {
    if (!email || !name) {
      console.warn('Google login aborted: no verified email or name provided');
      return;
    }

    const googleUser: UserProfile = {
      id: 'usr-google-' + Date.now(),
      name,
      email,
      phone: '',
      avatarUrl: avatarUrl || '',
      role: 'USER',
    };
    setUser(googleUser);
    localStorage.removeItem('lumi_logged_out');
    localStorage.setItem('lumi_user', JSON.stringify(googleUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lumi_user');
    localStorage.setItem('lumi_logged_out', 'true');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!user) return;
    const merged = { ...user, ...updated };
    setUser(merged);
    localStorage.setItem('lumi_user', JSON.stringify(merged));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
