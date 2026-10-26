'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CreditCard, CheckCircle2, AlertCircle, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

function StripeMockContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'LM-TEST';
  const amount = searchParams.get('amount') || '0';

  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('123');
  const [cardHolder, setCardHolder] = useState('TEST CUSTOMER');
  const [selectedPreset, setSelectedPreset] = useState<'success' | 'declined'>('success');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePreset = (type: 'success' | 'declined') => {
    setSelectedPreset(type);
    if (type === 'success') {
      setCardNumber('4242 •••• •••• 4242');
    } else {
      setCardNumber('4000 •••• •••• 0002');
    }
  };

  const handlePay = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      if (selectedPreset === 'declined') {
        alert('Stripe Test Simulator: Ваша карта была отклонена (Card Declined: 4000 0000 0000 0002). Попробуйте успешную тестовую карту 4242.');
        return;
      }

      // Обновляем заказ в localStorage как оплаченный
      try {
        const key = `order_${orderId}`;
        const existing = localStorage.getItem(key);
        if (existing) {
          const parsed = JSON.parse(existing);
          parsed.status = 'Оплачен (Stripe)';
          parsed.paymentMethod = 'stripe_test';
          parsed.paidAt = new Date().toISOString();
          localStorage.setItem(key, JSON.stringify(parsed));
          localStorage.setItem('latest_order', JSON.stringify(parsed));
        }
      } catch (e) {
        console.error(e);
      }

      router.push(`/checkout/success?orderId=${encodeURIComponent(orderId)}&stripe_paid=true`);
    }, 1200);
  };

  return (
    <div style={{ maxWidth: '640px', margin: '48px auto', padding: '0 20px' }}>
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-medium)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-glow)',
        }}
      >
        {/* Stripe Header */}
        <div
          style={{
            backgroundColor: '#635BFF',
            padding: '24px 28px',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', opacity: 0.9 }}>
              <Shield size={16} /> <strong>Stripe Test Environment</strong>
            </div>
            <h1 style={{ fontSize: '20px', fontWeight: 700, marginTop: '6px' }}>
              Тестовый шлюз оплаты Stripe
            </h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', opacity: 0.85 }}>К оплате</div>
            <div style={{ fontSize: '22px', fontWeight: 800 }}>{Number(amount).toLocaleString('ru-RU')} сум</div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '28px' }}>
          <div
            style={{
              backgroundColor: 'rgba(99, 91, 255, 0.08)',
              border: '1px solid rgba(99, 91, 255, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 18px',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              marginBottom: '24px',
              lineHeight: 1.5,
            }}
          >
            <strong>Тестовый режим (Sandbox):</strong> Выберите сценарий тестирования ниже. Настоящие деньги списаны не будут.
          </div>

          {/* Preset Buttons */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Выберите тестовую карту Stripe:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button
                type="button"
                onClick={() => handlePreset('success')}
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${selectedPreset === 'success' ? '#635BFF' : 'var(--border-medium)'}`,
                  backgroundColor: selectedPreset === 'success' ? 'rgba(99, 91, 255, 0.1)' : 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <CheckCircle2 size={18} color="#10B981" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px' }}>4242 Успешная оплата</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Одобрение платежа</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handlePreset('declined')}
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${selectedPreset === 'declined' ? '#EF4444' : 'var(--border-medium)'}`,
                  backgroundColor: selectedPreset === 'declined' ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <AlertCircle size={18} color="#EF4444" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px' }}>4000 Отказ банка</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Card Declined</div>
                </div>
              </button>
            </div>
          </div>

          {/* Card Mock Box */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              marginBottom: '24px',
            }}
          >
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Номер карты
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'var(--bg-card)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                  fontFamily: 'monospace',
                  fontSize: '15px',
                  fontWeight: 600,
                }}
              >
                <CreditCard size={18} color="#635BFF" />
                <span>{cardNumber}</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Срок действия
                </label>
                <div
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                  }}
                >
                  {expiry}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  CVC / CVV
                </label>
                <div
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                  }}
                >
                  {cvc}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={handlePay}
              disabled={isProcessing}
              style={{
                width: '100%',
                backgroundColor: '#635BFF',
                color: '#ffffff',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                padding: '14px 20px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                opacity: isProcessing ? 0.8 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'all 0.2s',
              }}
            >
              {isProcessing ? 'Обработка платежа в Stripe...' : `Оплатить ${Number(amount).toLocaleString('ru-RU')} сум через Stripe`}
            </button>

            <button
              onClick={() => router.push(`/checkout?orderId=${encodeURIComponent(orderId)}`)}
              disabled={isProcessing}
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                padding: '10px',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <ArrowLeft size={14} /> Отменить и вернуться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StripeMockPage() {
  return (
    <Suspense fallback={<div style={{ padding: '80px', textAlign: 'center' }}>Загрузка Stripe шлюза...</div>}>
      <StripeMockContent />
    </Suspense>
  );
}
