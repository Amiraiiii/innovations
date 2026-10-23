'use client';

import React from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: '600px', margin: '80px auto', textAlign: 'center', padding: '0 24px' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
          }}
        >
          <ShoppingBag size={36} />
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '12px' }}>
          Ваша корзина пуста
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '28px' }}>
          Самое время изучить наши новинки и флагманские предложения
        </p>
        <Link href="/catalog">
          <Button size="lg">Перейти к покупкам</Button>
        </Link>
      </div>
    );
  }

  const shippingCost = totalPrice > 50000 ? 0 : 500;
  const finalPrice = totalPrice + shippingCost;

  return (
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800 }}>Корзина</h1>
        <button
          onClick={clearCart}
          style={{
            fontSize: '13px',
            color: 'var(--color-danger)',
            cursor: 'pointer',
            padding: '6px 12px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
          }}
        >
          Очистить корзину
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '32px' }}>
        {/* Cart items list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cart.map(({ product, quantity }) => (
            <div
              key={product.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <div
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  backgroundColor: 'var(--bg-surface)',
                  flexShrink: 0,
                }}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', color: 'var(--accent-light)', marginBottom: '4px' }}>
                  {product.category}
                </div>
                <Link href={`/product/${product.id}`}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    {product.name}
                  </h3>
                </Link>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent-primary)' }}>
                  {product.price.toLocaleString('ru-RU')} ₽
                </div>
              </div>

              {/* Quantity control */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--bg-surface)',
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                }}
              >
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  style={{ color: 'var(--text-secondary)', padding: '4px' }}
                >
                  <Minus size={14} />
                </button>
                <span style={{ fontSize: '14px', fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  style={{ color: 'var(--text-secondary)', padding: '4px' }}
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Remove button */}
              <button
                onClick={() => removeFromCart(product.id)}
                style={{
                  color: 'var(--text-muted)',
                  padding: '8px',
                  cursor: 'pointer',
                  transition: 'color var(--transition-fast)',
                }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary Box */}
        <div>
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-medium)',
              padding: '24px',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>
              Сумма заказа
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Товары ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                <span style={{ fontWeight: 600 }}>{totalPrice.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Доставка</span>
                <span style={{ fontWeight: 600 }}>
                  {shippingCost === 0 ? 'Бесплатно' : `${shippingCost} ₽`}
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-light)',
                marginBottom: '24px',
              }}
            >
              <span style={{ fontSize: '16px', fontWeight: 700 }}>Итого</span>
              <span style={{ fontSize: '22px', fontWeight: 800, color: 'var(--accent-primary)' }}>
                {finalPrice.toLocaleString('ru-RU')} ₽
              </span>
            </div>

            <Link href="/checkout">
              <Button fullWidth size="lg">
                Оформить заказ <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
