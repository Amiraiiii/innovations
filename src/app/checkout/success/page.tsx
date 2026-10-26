'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, PackageCheck, ArrowRight, Home, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'LM-782194';
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`order_${orderId}`) || localStorage.getItem('latest_order');
      if (saved) {
        setOrderData(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to parse order from localStorage', e);
    }
  }, [orderId]);

  return (
    <div style={{ maxWidth: '640px', margin: '48px auto', padding: '0 24px' }}>
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-medium)',
          padding: '40px 32px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-glow)',
        }}
      >
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            color: 'var(--color-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
          }}
        >
          <CheckCircle2 size={40} />
        </div>

        <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '8px' }}>
          Заказ успешно оформлен!
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '24px' }}>
          Номер вашего заказа:{' '}
          <strong style={{ color: 'var(--accent-primary)', letterSpacing: '0.5px' }}>
            {orderId}
          </strong>
        </p>

        {/* Order Details Preview */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            padding: '20px',
            textAlign: 'left',
            marginBottom: '32px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '13px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Статус:</span>
            <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>
              {orderData?.status || 'Принят в обработку'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '13px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Получатель:</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
              {orderData?.customer?.fullName || 'Покупатель'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '13px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Способ доставки:</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
              {orderData?.deliveryMethod === 'courier' ? 'Курьерская доставка' : 'Самовывоз'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '13px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Способ оплаты:</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
              {orderData?.paymentMethod === 'stripe' || orderData?.paymentMethod === 'stripe_test'
                ? 'Stripe (Тестовая оплата)'
                : orderData?.paymentMethod === 'online'
                ? 'Онлайн картой (YooKassa)'
                : orderData?.paymentMethod === 'sbp'
                ? 'СБП (QR-код)'
                : 'При получении'}
            </span>
          </div>

          {orderData?.totalPrice && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '12px',
                borderTop: '1px solid var(--border-light)',
                fontSize: '15px',
                fontWeight: 700,
              }}
            >
              <span>Итого:</span>
              <span style={{ color: 'var(--accent-primary)' }}>
                {orderData.totalPrice.toLocaleString('ru-RU')} ₽
              </span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
          <Link href="/">
            <Button variant="secondary" size="md">
              <Home size={16} /> На главную
            </Button>
          </Link>
          <Link href="/catalog">
            <Button size="md">
              <ShoppingBag size={16} /> Продолжить покупки
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '60px' }}>Загрузка...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
