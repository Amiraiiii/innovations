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
  login: (email: string, name?: string, role?: 'USER' | 'ADMIN') => void;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('lumi_user');
      if (saved) {
        setUser(JSON.parse(saved));
      } else {
        // Default guest/demo user for UI demonstration
        const defaultUser: UserProfile = {
          id: 'usr-4819',
          name: 'Алексей Смирнов',
          email: 'alex.smirnov@lumistore.com',
          phone: '+7 (999) 450-20-10',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
          role: 'ADMIN', // Set as ADMIN so user can explore both Profile & Admin Panel
          savedAddress: 'г. Москва, Театральный проезд, д. 5',
        };
        setUser(defaultUser);
        localStorage.setItem('lumi_user', JSON.stringify(defaultUser));
      }
    } catch (e) {
      console.error('Failed to load user from localStorage', e);
    }
  }, []);

  const login = (email: string, name = 'Пользователь', role: 'USER' | 'ADMIN' = 'USER') => {
    const newUser: UserProfile = {
      id: 'usr-' + Math.floor(1000 + Math.random() * 9000),
      name,
      email,
      phone: '+7 (999) 000-00-00',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      role,
    };
    setUser(newUser);
    localStorage.setItem('lumi_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lumi_user');
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
