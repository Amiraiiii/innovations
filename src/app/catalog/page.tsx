'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS, CATEGORIES } from '@/data/mockData';
import { ProductCard } from '@/components/ui/ProductCard';
import { SlidersHorizontal, ArrowUpDown, Check, Sparkles, Filter, X } from 'lucide-react';
import { CelestialStar } from '@/components/ui/CelestialGraphics';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'popular' | 'price_asc' | 'price_desc'>('popular');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [priceRange, setPriceRange] = useState<number>(250000);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.categoryId !== selectedCategory) {
        return false;
      }
      // Price filter
      if (product.price > priceRange) {
        return false;
      }
      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc) return false;
      }
      // In stock
      if (onlyInStock && !product.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return b.rating - a.rating;
    });
  }, [selectedCategory, searchQuery, onlyInStock, sortBy, priceRange]);

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 28px 64px' }}>
      {/* Catalog Header Banner */}
      <div
        className="poster-glass-card"
        style={{
          padding: '24px 32px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <CelestialStar size={16} color="var(--accent-lavender)" />
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: 'var(--accent-glow)', letterSpacing: '1px' }}>
              HARDWARE ARCHIVE // ALL CATEGORIES
            </span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800 }}>
            {searchQuery ? `Результаты поиска: "${searchQuery}"` : 'Каталог техники и электроники'}
          </h1>
        </div>

        {/* Quick Horizontal Pill Filters for Top Categories */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={() => setSelectedCategory('all')}
            style={{
              padding: '7px 16px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backgroundColor: selectedCategory === 'all' ? 'rgba(167, 155, 242, 0.25)' : 'rgba(20, 16, 38, 0.6)',
              color: selectedCategory === 'all' ? '#FFFFFF' : 'var(--text-secondary)',
              border: selectedCategory === 'all' ? '1px solid var(--border-glow)' : '1px solid var(--border-light)',
            }}
          >
            Все ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '7px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: selectedCategory === cat.id ? 'rgba(167, 155, 242, 0.25)' : 'rgba(20, 16, 38, 0.6)',
                color: selectedCategory === cat.id ? '#FFFFFF' : 'var(--text-secondary)',
                border: selectedCategory === cat.id ? '1px solid var(--border-glow)' : '1px solid var(--border-light)',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Comfortably Sized Filter Sidebar (280px) + Expansive Product Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '28px', alignItems: 'start' }}>
        {/* Filters Sidebar */}
        <aside
          className="poster-glass-card"
          style={{
            padding: '26px 24px',
            position: 'sticky',
            top: '84px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '22px',
              paddingBottom: '14px',
              borderBottom: '1px solid var(--border-grid)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 700 }}>
              <Filter size={18} color="var(--accent-lavender)" />
              Фильтры каталога
            </div>
            {(selectedCategory !== 'all' || onlyInStock || priceRange < 250000) && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setOnlyInStock(false);
                  setPriceRange(250000);
                }}
                style={{
                  fontSize: '12px',
                  color: 'var(--color-danger)',
                  cursor: 'pointer',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                }}
                title="Сбросить все"
              >
                Сброс
              </button>
            )}
          </div>

          {/* Price Range Slider */}
          <div style={{ marginBottom: '26px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '10px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Цена до:</span>
              <span style={{ fontWeight: 800, fontSize: '15px', color: 'var(--accent-glow)' }}>
                {priceRange.toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="250000"
              step="5000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-lavender)', cursor: 'pointer', height: '6px' }}
            />
          </div>

          {/* Category Vertical Filter */}
          <div style={{ marginBottom: '26px', borderTop: '1px solid var(--border-grid)', paddingTop: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Категория
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button
                onClick={() => setSelectedCategory('all')}
                style={{
                  textAlign: 'left',
                  padding: '9px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '14px',
                  backgroundColor: selectedCategory === 'all' ? 'rgba(167, 155, 242, 0.22)' : 'transparent',
                  color: selectedCategory === 'all' ? '#FFFFFF' : 'var(--text-secondary)',
                  fontWeight: selectedCategory === 'all' ? 700 : 500,
                  border: selectedCategory === 'all' ? '1px solid var(--border-glow)' : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>Все категории</span>
                <span style={{ fontSize: '12px', opacity: 0.7 }}>{PRODUCTS.length}</span>
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    textAlign: 'left',
                    padding: '9px 14px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '14px',
                    backgroundColor: selectedCategory === cat.id ? 'rgba(167, 155, 242, 0.22)' : 'transparent',
                    color: selectedCategory === cat.id ? '#FFFFFF' : 'var(--text-secondary)',
                    fontWeight: selectedCategory === cat.id ? 700 : 500,
                    border: selectedCategory === cat.id ? '1px solid var(--border-glow)' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>{cat.name}</span>
                  <span style={{ fontSize: '12px', opacity: 0.7 }}>{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stock Availability */}
          <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-grid)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', color: 'var(--text-secondary)' }}>
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                style={{ accentColor: 'var(--accent-lavender)', width: '16px', height: '16px' }}
              />
              Только в наличии
            </label>
          </div>
        </aside>

        {/* Products Column */}
        <div>
          {/* Sorting & Counter Bar */}
          <div
            className="poster-glass-card"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '18px',
              padding: '12px 20px',
            }}
          >
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Отображено: <strong style={{ color: 'var(--text-primary)' }}>{filteredProducts.length}</strong> из {PRODUCTS.length} позиций
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowUpDown size={15} color="var(--accent-lavender)" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{
                  backgroundColor: 'rgba(20, 16, 38, 0.85)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '6px 12px',
                  fontSize: '13px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="popular">По рейтингу</option>
                <option value="price_asc">Сначала дешевле</option>
                <option value="price_desc">Сначала дороже</option>
              </select>
            </div>
          </div>

          {/* Expanded 4-Column Product Grid */}
          {filteredProducts.length === 0 ? (
            <div
              className="poster-glass-card"
              style={{
                padding: '64px 24px',
                textAlign: 'center',
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
                Товары не найдены
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Попробуйте увеличить ценовой лимит или сбросить категорию
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setOnlyInStock(false);
                  setPriceRange(250000);
                }}
                style={{
                  padding: '8px 20px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(167, 155, 242, 0.2)',
                  color: 'var(--accent-glow)',
                  border: '1px solid var(--border-glow)',
                  cursor: 'pointer',
                  fontSize: '13px',
                }}
              >
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '16px',
              }}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>Загрузка каталога...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
