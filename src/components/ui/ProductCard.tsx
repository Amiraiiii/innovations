'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '@/types';
import { Badge } from './Badge';
import { Button } from './Button';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, addToCart } = useCart();
  const isInCart = cart.some((item) => item.product.id === product.id);

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        transition: 'transform var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal)',
      }}
      className="product-card-hover"
    >
      <div>
        {/* Card Header with Badges */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
            position: 'absolute',
            top: '16px',
            left: '16px',
            right: '16px',
            zIndex: 2,
          }}
        >
          {product.badge ? (
            <Badge variant={product.badge}>
              {product.badge === 'hit' ? 'Хит' : product.badge === 'new' ? 'Новинка' : 'Скидка'}
            </Badge>
          ) : <span />}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'rgba(9, 9, 16, 0.7)',
              backdropFilter: 'blur(8px)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              color: '#FBBF24',
              border: '1px solid var(--border-light)',
            }}
          >
            <Star size={12} fill="#FBBF24" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Product Image */}
        <Link href={`/product/${product.id}`} style={{ display: 'block' }}>
          <div
            className="poster-product-img-wrap"
            style={{
              position: 'relative',
              width: '100%',
              height: '210px',
              borderRadius: 'var(--radius-md)',
              marginTop: '10px',
              marginBottom: '16px',
            }}
          >
            {product.images[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="poster-product-img"
              />
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: 'var(--text-muted)',
                  fontSize: '13px',
                }}
              >
                Нет изображения
              </div>
            )}
          </div>
        </Link>

        {/* Category & Title */}
        <div style={{ fontSize: '12px', color: 'var(--accent-light)', marginBottom: '6px' }}>
          {product.category}
        </div>
        <Link href={`/product/${product.id}`}>
          <h3
            style={{
              fontSize: '15px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              lineHeight: 1.4,
              marginBottom: '12px',
              minHeight: '42px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.name}
          </h3>
        </Link>
      </div>

      {/* Pricing & Add to cart */}
      <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
          <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {product.price.toLocaleString('ru-RU')} ₽
          </span>
          {product.oldPrice && (
            <span
              style={{
                fontSize: '13px',
                color: 'var(--text-muted)',
                textDecoration: 'line-through',
              }}
            >
              {product.oldPrice.toLocaleString('ru-RU')} ₽
            </span>
          )}
        </div>

        <Button
          fullWidth
          variant={isInCart ? 'secondary' : 'primary'}
          size="sm"
          onClick={() => addToCart(product, 1)}
        >
          {isInCart ? (
            <>
              <Check size={16} /> В корзине
            </>
          ) : (
            <>
              <ShoppingBag size={16} /> В корзину
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
