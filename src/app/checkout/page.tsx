'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck, CreditCard, Wallet, Banknote } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'courier' | 'pickup'>('courier');
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cash' | 'sbp'>('online');

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingCost = totalPrice > 50000 ? 0 : 500;
  const finalPrice = totalPrice + (deliveryMethod === 'courier' ? shippingCost : 0);

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: '600px', margin: '80px auto', textAlign: 'center', padding: '0 24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>В корзине нет товаров</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          Для оформления заказа добавьте товары из каталога.
        </p>
        <Link href="/catalog">
          <Button>Перейти в каталог</Button>
        </Link>
      </div>
    );
  }

  const validate = () => {
    const err: Record<string, string> = {};
    if (!fullName.trim()) err.fullName = 'Укажите имя и фамилию';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) err.email = 'Укажите корректный email';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) err.phone = 'Укажите номер телефона (не менее 10 цифр)';
    if (deliveryMethod === 'courier' && !address.trim()) err.address = 'Укажите адрес доставки';
    return err;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Generate random order ID & save order summary to LocalStorage
    const orderId = 'LM-' + Math.floor(100000 + Math.random() * 900000);
    const orderData = {
      orderId,
      date: new Date().toISOString(),
      items: cart,
      customer: { fullName, email, phone, address, comment },
      deliveryMethod,
      paymentMethod,
      totalPrice: finalPrice,
      status: 'Принят в обработку',
    };

    try {
      localStorage.setItem(`order_${orderId}`, JSON.stringify(orderData));
      localStorage.setItem('latest_order', JSON.stringify(orderData));
    } catch (e) {
      console.error('Failed to save order to localStorage', e);
    }

    // Clear cart and redirect to success page
    setTimeout(() => {
      clearCart();
      router.push(`/checkout/success?orderId=${orderId}`);
    }, 600);
  };

  return (
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link
          href="/cart"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: 'var(--text-secondary)',
          }}
        >
          <ArrowLeft size={16} /> Назад в корзину
        </Link>
      </div>

      <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '32px' }}>
        Оформление заказа
      </h1>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '36px' }}>
          {/* Main Form Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Step 1: Contacts */}
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-light)',
                padding: '28px',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(169, 155, 255, 0.2)',
                    color: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                  }}
                >
                  1
                </span>
                Контактные данные
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Имя и фамилия *
                  </label>
                  <input
                    type="text"
                    placeholder="Алексей Смирнов"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--bg-surface)',
                      border: `1px solid ${errors.fullName ? 'var(--color-danger)' : 'var(--border-medium)'}`,
                      borderRadius: 'var(--radius-md)',
                      padding: '12px 16px',
                      color: 'var(--text-primary)',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                  {errors.fullName && (
                    <span style={{ fontSize: '12px', color: 'var(--color-danger)', marginTop: '4px', display: 'block' }}>
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Электронная почта *
                  </label>
                  <input
                    type="email"
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--bg-surface)',
                      border: `1px solid ${errors.email ? 'var(--color-danger)' : 'var(--border-medium)'}`,
                      borderRadius: 'var(--radius-md)',
                      padding: '12px 16px',
                      color: 'var(--text-primary)',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                  {errors.email && (
                    <span style={{ fontSize: '12px', color: 'var(--color-danger)', marginTop: '4px', display: 'block' }}>
                      {errors.email}
                    </span>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    placeholder="+7 (999) 000-00-00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--bg-surface)',
                      border: `1px solid ${errors.phone ? 'var(--color-danger)' : 'var(--border-medium)'}`,
                      borderRadius: 'var(--radius-md)',
                      padding: '12px 16px',
                      color: 'var(--text-primary)',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                  {errors.phone && (
                    <span style={{ fontSize: '12px', color: 'var(--color-danger)', marginTop: '4px', display: 'block' }}>
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Delivery */}
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-light)',
                padding: '28px',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(169, 155, 255, 0.2)',
                    color: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                  }}
                >
                  2
                </span>
                Способ доставки
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div
                  onClick={() => setDeliveryMethod('courier')}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${deliveryMethod === 'courier' ? 'var(--accent-primary)' : 'var(--border-medium)'}`,
                    backgroundColor: deliveryMethod === 'courier' ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                  }}
                >
                  <Truck size={20} color={deliveryMethod === 'courier' ? 'var(--accent-primary)' : 'var(--text-muted)'} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Курьерская доставка
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      {shippingCost === 0 ? 'Бесплатно' : '500 ₽'} • 1-2 дня
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setDeliveryMethod('pickup')}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${deliveryMethod === 'pickup' ? 'var(--accent-primary)' : 'var(--border-medium)'}`,
                    backgroundColor: deliveryMethod === 'pickup' ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                  }}
                >
                  <ShieldCheck size={20} color={deliveryMethod === 'pickup' ? 'var(--accent-primary)' : 'var(--text-muted)'} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Самовывоз из шоурума
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Бесплатно • Сегодня
                    </div>
                  </div>
                </div>
              </div>

              {deliveryMethod === 'courier' ? (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Адрес доставки *
                  </label>
                  <input
                    type="text"
                    placeholder="г. Москва, ул. Ленина, д. 10, кв. 25"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--bg-surface)',
                      border: `1px solid ${errors.address ? 'var(--color-danger)' : 'var(--border-medium)'}`,
                      borderRadius: 'var(--radius-md)',
                      padding: '12px 16px',
                      color: 'var(--text-primary)',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                  {errors.address && (
                    <span style={{ fontSize: '12px', color: 'var(--color-danger)', marginTop: '4px', display: 'block' }}>
                      {errors.address}
                    </span>
                  )}
                </div>
              ) : (
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', padding: '12px', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-md)' }}>
                  Пункт выдачи: <strong>г. Москва, Театральный проезд, д. 5 (Флагманский магазин LUMI)</strong>, ежедневно с 10:00 до 22:00.
                </div>
              )}

              <div style={{ marginTop: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Комментарий курьеру / пожелания к заказу
                </label>
                <textarea
                  rows={2}
                  placeholder="Код домофона, удобное время звонка..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px 16px',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>
            </div>

            {/* Step 3: Payment */}
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-light)',
                padding: '28px',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(169, 155, 255, 0.2)',
                    color: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                  }}
                >
                  3
                </span>
                Способ оплаты
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                <div
                  onClick={() => setPaymentMethod('online')}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${paymentMethod === 'online' ? 'var(--accent-primary)' : 'var(--border-medium)'}`,
                    backgroundColor: paymentMethod === 'online' ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <CreditCard size={20} color={paymentMethod === 'online' ? 'var(--accent-primary)' : 'var(--text-muted)'} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>Картой онлайн</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>YooKassa / МИР / Visa</div>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod('sbp')}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${paymentMethod === 'sbp' ? 'var(--accent-primary)' : 'var(--border-medium)'}`,
                    backgroundColor: paymentMethod === 'sbp' ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <Wallet size={20} color={paymentMethod === 'sbp' ? 'var(--accent-primary)' : 'var(--text-muted)'} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>СБП (QR-код)</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Без комиссии</div>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod('cash')}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${paymentMethod === 'cash' ? 'var(--accent-primary)' : 'var(--border-medium)'}`,
                    backgroundColor: paymentMethod === 'cash' ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <Banknote size={20} color={paymentMethod === 'cash' ? 'var(--accent-primary)' : 'var(--text-muted)'} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>При получении</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Картой или наличными</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div>
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-medium)',
                padding: '24px',
                position: 'sticky',
                top: '100px',
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>
                Состав заказа
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px', maxHeight: '240px', overflowY: 'auto' }}>
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {product.name}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {quantity} × {product.price.toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>
                      {(product.price * quantity).toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Товары</span>
                  <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Доставка</span>
                  <span>{deliveryMethod === 'courier' ? (shippingCost === 0 ? 'Бесплатно' : `${shippingCost} ₽`) : '0 ₽'}</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
                <span style={{ fontSize: '16px', fontWeight: 700 }}>К оплате</span>
                <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-primary)' }}>
                  {finalPrice.toLocaleString('ru-RU')} ₽
                </span>
              </div>

              <Button type="submit" fullWidth size="lg" disabled={isSubmitting}>
                {isSubmitting ? 'Оформляем заказ...' : 'Подтвердить заказ'}
              </Button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
                <ShieldCheck size={14} color="var(--accent-primary)" />
                Безопасная оплата и защита персональных данных
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
