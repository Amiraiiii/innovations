'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, MapPin, Package, Shield, LogOut, Camera, Check, LogIn, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CelestialStar } from '@/components/ui/CelestialGraphics';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.savedAddress || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/auth');
  };

  // If user is not logged in, show sleek login gateway
  if (!user) {
    return (
      <div style={{ maxWidth: '520px', margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
        <div className="poster-glass-card" style={{ padding: '48px 32px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(167, 155, 242, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              border: '1px solid var(--border-glow)',
            }}
          >
            <User size={30} color="var(--accent-lavender)" />
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <CelestialStar size={14} color="var(--accent-lavender)" />
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: 'var(--accent-glow)' }}>
              LUMI ID REQUIRED
            </span>
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>
            Вы вышли из аккаунта
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '28px' }}>
            Авторизуйтесь через Google или Email, чтобы получить доступ к профилю, скидкам и истории заказов.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href="/auth">
              <Button fullWidth size="lg">
                <LogIn size={18} /> Войти в аккаунт
              </Button>
            </Link>
            <Link href="/catalog">
              <Button variant="ghost" fullWidth size="md">
                Продолжить покупки в каталоге <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Mock order history
  const orderHistory = [
    {
      id: 'LM-829140',
      date: '18 октября 2026',
      totalPrice: 89990,
      status: 'Доставляется',
      itemsCount: 1,
      badge: 'info',
      title: 'LUMI Nova 15 Pro 256GB Cosmic Violet',
    },
    {
      id: 'LM-730129',
      date: '12 сентября 2026',
      totalPrice: 24990,
      status: 'Доставлен',
      itemsCount: 1,
      badge: 'success',
      title: 'Беспроводные наушники LUMI Pods Max ANC',
    },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone, savedAddress: address });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert uploaded image to Data URL for instant local persistence
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateProfile({ avatarUrl: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '32px 24px 64px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 800 }}>Личный кабинет</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Управление профилем и история покупок
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {user?.role === 'ADMIN' && (
            <Link href="/admin">
              <Button variant="outline" size="sm">
                <Shield size={16} /> Перейти в админку
              </Button>
            </Link>
          )}
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut size={16} /> Выйти
          </Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '32px' }}>
        {/* Profile Card & Edit Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="poster-glass-card" style={{ padding: '28px', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '108px', height: '108px', margin: '0 auto 16px' }}>
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name || 'Аватар'}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--accent-lavender)',
                    boxShadow: 'var(--shadow-neon)',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(167, 155, 242, 0.15)',
                    border: '2px dashed var(--border-glow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-glow)',
                    fontSize: '36px',
                    fontWeight: 800,
                    fontFamily: 'Space Mono, monospace',
                  }}
                >
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}

              {/* Upload custom avatar trigger */}
              <label
                htmlFor="avatar-upload-input"
                title="Загрузить свой аватар"
                style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  backgroundColor: 'var(--accent-lavender)',
                  color: 'var(--text-inverse)',
                  borderRadius: '50%',
                  width: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-neon)',
                  transition: 'transform var(--transition-fast)',
                }}
              >
                <Camera size={17} />
                <input
                  id="avatar-upload-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{user?.name}</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>{user?.email}</p>
            <p style={{ fontSize: '11px', color: 'var(--accent-glow)', marginTop: '6px' }}>
              {user?.avatarUrl ? '✓ Ваш персональный аватар установлен' : 'Нажмите на камеру, чтобы загрузить фото'}
            </p>

            <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
              <Badge variant="new">Клубный статус: VIP</Badge>
              {user?.role === 'ADMIN' && <Badge variant="hit">Администратор</Badge>}
            </div>
          </div>

          {/* Edit contacts form */}
          <div className="poster-glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>
              Контактная информация
            </h3>

            {savedSuccess && (
              <div
                style={{
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  color: 'var(--color-success)',
                  fontSize: '12px',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Check size={14} /> Данные успешно сохранены
              </div>
            )}

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Имя и фамилия
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '8px 12px',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Телефон
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '8px 12px',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Основной адрес доставки
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '8px 12px',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
              </div>

              <Button type="submit" size="sm" fullWidth>
                Сохранить изменения
              </Button>
            </form>
          </div>
        </div>

        {/* Orders History & Order details */}
        <div>
          <div className="poster-glass-card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Package size={20} color="var(--accent-lavender)" />
              <h2 style={{ fontSize: '20px', fontWeight: 800 }}>История заказов</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {orderHistory.map((order) => (
                <div
                  key={order.id}
                  style={{
                    backgroundColor: 'rgba(20, 16, 38, 0.7)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    padding: '20px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700, color: 'var(--accent-glow)' }}>
                          {order.id}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>• {order.date}</span>
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '4px' }}>
                        {order.title}
                      </div>
                    </div>

                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '12px',
                        fontWeight: 600,
                        backgroundColor: order.badge === 'info' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                        color: order.badge === 'info' ? '#60A5FA' : 'var(--color-success)',
                        border: '1px solid rgba(167, 155, 242, 0.2)',
                      }}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '12px',
                      borderTop: '1px solid var(--border-grid)',
                      fontSize: '13px',
                    }}
                  >
                    <span style={{ color: 'var(--text-muted)' }}>Сумма покупки:</span>
                    <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {order.totalPrice.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
