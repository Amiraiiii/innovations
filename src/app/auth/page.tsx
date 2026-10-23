'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { CelestialStar } from '@/components/ui/CelestialGraphics';

export default function AuthPage() {
  const router = useRouter();
  const { login, loginWithGoogle } = useAuth();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
      setMessage('Инструкция по восстановлению пароля отправлена на указанную почту.');
      return;
    }
    // Simulate login / register
    login(email || 'alex.smirnov@lumistore.com', name || 'Алексей Смирнов', 'ADMIN');
    router.push('/profile');
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      loginWithGoogle('alex.tech@gmail.com', 'Александр Волков (Google)');
      router.push('/profile');
    }, 700);
  };

  return (
    <div style={{ maxWidth: '480px', margin: '48px auto', padding: '0 24px' }}>
      <div
        className="poster-glass-card"
        style={{
          padding: '40px 32px',
          boxShadow: 'var(--shadow-neon)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <CelestialStar size={18} color="var(--accent-lavender)" />
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: 'var(--accent-glow)' }}>
              LUMI ID ACCESS
            </span>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 800 }}>
            {mode === 'login' ? 'Вход в аккаунт' : mode === 'register' ? 'Создать аккаунт' : 'Восстановление доступа'}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px' }}>
            {mode === 'login'
              ? 'Управляйте своими заказами и персональными скидками'
              : mode === 'register'
              ? 'Присоединяйтесь к закрытому клубу LUMI TÉCHNICA'
              : 'Введите ваш Email для получения ссылки сброса'}
          </p>
        </div>

        {message && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: 'var(--color-success)',
              fontSize: '13px',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {mode === 'register' && (
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Ваше имя
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Алексей"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px 16px 12px 42px',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Электронная почта
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 16px 12px 42px',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Пароль
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    style={{ fontSize: '12px', color: 'var(--accent-glow)', cursor: 'pointer' }}
                  >
                    Забыли пароль?
                  </button>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px 16px 12px 42px',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
          )}

          <Button type="submit" fullWidth size="lg">
            {mode === 'login' ? 'Войти' : mode === 'register' ? 'Зарегистрироваться' : 'Сбросить пароль'}
            <ArrowRight size={16} />
          </Button>

          {/* Google Auth Button */}
          {mode !== 'forgot' && (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  margin: '4px 0',
                }}
              >
                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-light)' }} />
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'Space Mono, monospace' }}>
                  ИЛИ
                </span>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-light)' }} />
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: isGoogleLoading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  transition: 'background-color var(--transition-fast), border-color var(--transition-fast)',
                  opacity: isGoogleLoading ? 0.7 : 1,
                }}
              >
                {isGoogleLoading ? (
                  <span style={{ fontSize: '13px', color: 'var(--accent-glow)' }}>
                    Синхронизация с Google аккаунтом...
                  </span>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    Войти с помощью Google
                  </>
                )}
              </button>
            </>
          )}

          {/* Mode Switchers */}
          <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '13px', color: 'var(--text-muted)' }}>
            {mode === 'login' ? (
              <>
                Нет аккаунта?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  style={{ color: 'var(--accent-glow)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Зарегистрироваться
                </button>
              </>
            ) : (
              <>
                Уже зарегистрированы?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  style={{ color: 'var(--accent-glow)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Войти
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
