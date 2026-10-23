'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Phone, MapPin, Package, Shield, LogOut, Camera, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function ProfilePage() {
  const { user, logout, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.savedAddress || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

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

  const handleAvatarChange = () => {
    const avatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    ];
    const next = avatars[(avatars.indexOf(user?.avatarUrl || '') + 1) % avatars.length];
    updateProfile({ avatarUrl: next });
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
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut size={16} /> Выйти
          </Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '32px' }}>
        {/* Profile Card & Edit Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="poster-glass-card" style={{ padding: '28px', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 16px' }}>
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--border-glow)',
                }}
              />
              <button
                onClick={handleAvatarChange}
                title="Сменить аватарку"
                style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  backgroundColor: 'var(--accent-lavender)',
                  color: 'var(--text-inverse)',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-neon)',
                }}
              >
                <Camera size={16} />
              </button>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{user?.name}</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>{user?.email}</p>

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
