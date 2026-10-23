'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, ShieldCheck, Truck, RefreshCw, ShoppingBag, Check, ArrowLeft } from 'lucide-react';
import { PRODUCTS } from '@/data/mockData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/ui/ProductCard';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { cart, addToCart } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const product = PRODUCTS.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div style={{ maxWidth: 'var(--max-width)', margin: '80px auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Товар не найден</h2>
        <Link href="/catalog">
          <Button variant="secondary">Вернуться в каталог</Button>
        </Link>
      </div>
    );
  }

  const isInCart = cart.some((item) => item.product.id === product.id);
  const relatedProducts = PRODUCTS.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id
  ).slice(0, 3);

  return (
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '32px 24px' }}>
      {/* Breadcrumb back */}
      <div style={{ marginBottom: '24px' }}>
        <Link
          href="/catalog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: 'var(--text-secondary)',
          }}
        >
          <ArrowLeft size={16} /> Назад в каталог
        </Link>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          marginBottom: '64px',
        }}
      >
        {/* Left: Gallery */}
        <div>
          <div
            style={{
              width: '100%',
              height: '420px',
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-light)',
              overflow: 'hidden',
              marginBottom: '16px',
            }}
          >
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '12px' }}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: activeImageIndex === idx ? '2px solid var(--accent-primary)' : '1px solid var(--border-light)',
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info, Price, Specs */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            {product.badge && <Badge variant={product.badge}>{product.badge.toUpperCase()}</Badge>}
            <span style={{ fontSize: '13px', color: 'var(--accent-light)' }}>{product.category}</span>
          </div>

          <h1 style={{ fontSize: '28px', fontWeight: 800, lineHeight: 1.3, marginBottom: '16px' }}>
            {product.name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#FBBF24', fontSize: '14px' }}>
              <Star size={16} fill="#FBBF24" />
              <span>{product.rating}</span>
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              {product.reviewsCount} отзывов
            </span>
            <span
              style={{
                fontSize: '13px',
                color: product.inStock ? 'var(--color-success)' : 'var(--color-danger)',
                fontWeight: 600,
              }}
            >
              {product.inStock ? `В наличии (${product.stockCount} шт.)` : 'Нет в наличии'}
            </span>
          </div>

          {/* Price Box */}
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              marginBottom: '32px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {product.price.toLocaleString('ru-RU')} ₽
              </span>
              {product.oldPrice && (
                <span
                  style={{
                    fontSize: '18px',
                    color: 'var(--text-muted)',
                    textDecoration: 'line-through',
                  }}
                >
                  {product.oldPrice.toLocaleString('ru-RU')} ₽
                </span>
              )}
            </div>

            <Button
              size="lg"
              fullWidth
              variant={isInCart ? 'secondary' : 'primary'}
              onClick={() => addToCart(product, 1)}
            >
              {isInCart ? (
                <>
                  <Check size={20} /> Товар добавлен в корзину
                </>
              ) : (
                <>
                  <ShoppingBag size={20} /> Добавить в корзину
                </>
              )}
            </Button>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Описание</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {product.description}
            </p>
          </div>

          {/* Specs */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Характеристики</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {Object.entries(product.specs).map(([key, value]) => (
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--border-light)',
                    fontSize: '13px',
                  }}
                >
                  <span style={{ color: 'var(--text-muted)' }}>{key}</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section style={{ marginTop: '64px', borderTop: '1px solid var(--border-light)', paddingTop: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px' }}>
            Похожие товары
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
