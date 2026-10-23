'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Truck, RefreshCw, Headphones } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-card)',
        borderTop: '1px solid var(--border-light)',
        marginTop: '80px',
        padding: '60px 24px 30px',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
        }}
      >
        {/* Features row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
            paddingBottom: '48px',
            borderBottom: '1px solid var(--border-light)',
            marginBottom: '48px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-primary)',
              }}
            >
              <Truck size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Быстрая доставка
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>По всей стране от 1 дня</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-primary)',
              }}
            >
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Официальная гарантия
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>100% оригинальная техника</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-primary)',
              }}
            >
              <RefreshCw size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Простой возврат
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>14 дней на проверку</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-primary)',
              }}
            >
              <Headphones size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Поддержка 24/7
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Эксперты на связи</p>
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Sparkles size={20} color="var(--accent-primary)" />
              <span style={{ fontSize: '18px', fontWeight: 800 }}>LUMI STORE</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Премиальная цифровая электроника с космической эстетикой и бескомпромиссным качеством.
            </p>
          </div>

          <div>
            <h5 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>
              Каталог
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link href="/catalog?category=smartphones" style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Смартфоны
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=laptops" style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Ноутбуки
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=audio" style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Аудиотехника
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=gaming" style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Гейминг
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>
              Покупателям
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Доставка и оплата</span>
              </li>
              <li>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Гарантия и возврат</span>
              </li>
              <li>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Бонусная программа</span>
              </li>
            </ul>
          </div>

          <div>
            <h5 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>
              Контакты
            </h5>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              +7 (800) 555-35-35
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              support@lumistore.com
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '12px',
            color: 'var(--text-muted)',
          }}
        >
          <div>© {new Date().getFullYear()} LUMI Store. Все права защищены.</div>
          <div>Разработано с заботой о каждой детали</div>
        </div>
      </div>
    </footer>
  );
};
