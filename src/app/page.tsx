'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, ShieldCheck, Truck, RefreshCw, Cpu, Layers, Disc3 } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/data/mockData';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';
import { CelestialStar, Constellation } from '@/components/ui/CelestialGraphics';

export default function HomePage() {
  const popularProducts = PRODUCTS.filter((p) => p.isPopular);
  const heroProduct = PRODUCTS[0]; // LUMI Nova 15 Pro флагман

  return (
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '24px 24px 64px' }}>
      {/* POSTER HERO SECTION (LUMI TÉCHNICA — Digital Hardware Archive) */}
      <section
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          backgroundColor: 'rgba(12, 9, 24, 0.88)',
          border: '1px solid var(--border-medium)',
          padding: '52px 48px',
          marginBottom: '54px',
          boxShadow: 'var(--shadow-neon)',
        }}
      >
        {/* Subtle grid matrix */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(167, 155, 242, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(167, 155, 242, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px',
            pointerEvents: 'none',
          }}
        />

        {/* Ambient Halo Glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '20%',
            transform: 'translate(50%, -50%)',
            width: '460px',
            height: '460px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(167, 155, 242, 0.42) 0%, rgba(122, 90, 248, 0.2) 45%, rgba(6, 5, 11, 0) 75%)',
            filter: 'blur(35px)',
            pointerEvents: 'none',
          }}
        />

        {/* Top Badges & Meta */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '36px',
            position: 'relative',
            zIndex: 2,
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span className="y2k-pill">
              <CelestialStar size={13} color="#C4B5FD" />
              <span>DIGITAL HARDWARE // CELESTIAL TECH MARKET</span>
            </span>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: 'var(--text-muted)' }}>
              SERIES 02. / 2026
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Constellation />
            <span
              style={{
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-pill)',
                padding: '4px 14px',
                fontFamily: 'Space Mono, monospace',
                fontSize: '11px',
                color: 'var(--text-secondary)',
              }}
            >
              lumi-store.tech
            </span>
          </div>
        </div>

        {/* Hero Body: Brand Title + Spec + Visual */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: '32px',
            alignItems: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Left Textual Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <CelestialStar size={18} className="star-pulse" color="#FFFFFF" />
              <span
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '12px',
                  letterSpacing: '2px',
                  color: 'var(--accent-glow)',
                  textTransform: 'uppercase',
                }}
              >
                Next-Gen Hardware Matrix
              </span>
            </div>

            {/* Title: LUMI TÉCHNICA with luxury flair & glowing typography */}
            <h1
              style={{
                fontSize: '56px',
                fontWeight: 900,
                lineHeight: 1.05,
                marginBottom: '20px',
              }}
            >
              <span className="poster-title-glow" style={{ display: 'block', letterSpacing: '4px' }}>
                LUMI
              </span>
              <span
                className="poster-title-flair"
                style={{
                  display: 'block',
                  color: '#FFFFFF',
                  fontSize: '50px',
                  letterSpacing: '5px',
                  marginTop: '4px',
                }}
              >
                TÉCHNICA
              </span>
            </h1>

            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                maxWidth: '480px',
                marginBottom: '28px',
              }}
            >
              Премиальный маркет флагманских смартфонов, складных девайсов, OLED ультрабуков и аудиотехники в эстетике глубокого космоса.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <Link href={`/product/${heroProduct.id}`}>
                <Button size="lg">
                  Купить флагман от {heroProduct.price.toLocaleString('ru-RU')} ₽ <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/catalog">
                <Button variant="outline" size="lg">
                  Каталог всей электроники
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Visual Artwork */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'absolute', top: '5px', left: '12%', zIndex: 3 }}>
              <CelestialStar size={24} className="star-pulse" color="#FFFFFF" />
            </div>
            <div style={{ position: 'absolute', bottom: '20px', right: '8%', zIndex: 3 }}>
              <CelestialStar size={16} className="star-pulse" color="#C4B5FD" />
            </div>

            {/* Glowing Circular Art Portal */}
            <div
              style={{
                position: 'relative',
                width: '330px',
                height: '330px',
                borderRadius: '50%',
                padding: '12px',
                background: 'linear-gradient(135deg, rgba(167, 155, 242, 0.45) 0%, rgba(122, 90, 248, 0.12) 100%)',
                boxShadow: '0 0 50px rgba(167, 155, 242, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  backgroundColor: '#0a0815',
                  border: '1px solid var(--border-glow)',
                  position: 'relative',
                }}
              >
                <img
                  src={heroProduct.images[0]}
                  alt={heroProduct.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    mixBlendMode: 'screen',
                    filter: 'contrast(1.1) brightness(0.98) saturate(1.1)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Technical Bottom Strip */}
        <div
          style={{
            marginTop: '40px',
            paddingTop: '18px',
            borderTop: '1px solid var(--border-grid)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11px',
            fontFamily: 'Space Mono, monospace',
            color: 'var(--text-muted)',
            position: 'relative',
            zIndex: 2,
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--accent-glow)' }}>✦</span>
            <span>SYSTEM SPEC: 120HZ LTPO // 3.2K OLED // TI GRADE-5 CHASSIS</span>
          </div>
          <div>LUMI HARDWARE ARCHIVE 2026</div>
          <div>EST. 2026 // EDITION 02.</div>
        </div>
      </section>

      {/* DENSE BENTO HIGHLIGHTS: Fast perks & collections (Filling empty space) */}
      <section style={{ marginBottom: '54px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
          }}
        >
          <div
            className="poster-glass-card"
            style={{ padding: '20px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(167, 155, 242, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-lavender)',
                flexShrink: 0,
              }}
            >
              <Truck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Экспресс-доставка
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Бесплатно от 50 000 ₽ по всей стране
              </div>
            </div>
          </div>

          <div
            className="poster-glass-card"
            style={{ padding: '20px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(167, 155, 242, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-lavender)',
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                100% Оригинал
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Официальная гарантия 2 года
              </div>
            </div>
          </div>

          <div
            className="poster-glass-card"
            style={{ padding: '20px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(167, 155, 242, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-lavender)',
                flexShrink: 0,
              }}
            >
              <RefreshCw size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Trade-In & Возврат
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                14 дней тест-драйва без вопросов
              </div>
            </div>
          </div>

          <div
            className="poster-glass-card"
            style={{ padding: '20px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(167, 155, 242, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-lavender)',
                flexShrink: 0,
              }}
            >
              <Zap size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Скидки на сеты
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                До -25% при покупке комплектов
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION (Compact, Informative & Styled) */}
      <section style={{ marginBottom: '54px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <CelestialStar size={14} color="var(--accent-lavender)" />
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: 'var(--accent-glow)', letterSpacing: '1px' }}>
                CATALOG SECTORS
              </span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.5px' }}>
              Категории электроники
            </h2>
          </div>
          <Link
            href="/catalog"
            style={{
              fontSize: '12px',
              fontFamily: 'Space Mono, monospace',
              color: 'var(--accent-glow)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            Все 6 направлений <ArrowRight size={14} />
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '14px',
          }}
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalog?category=${cat.id}`}
              className="poster-glass-card"
              style={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(167, 155, 242, 0.14)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-lavender)',
                  marginBottom: '12px',
                }}
              >
                <Cpu size={18} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '3px' }}>
                {cat.name}
              </span>
              <span style={{ fontSize: '11px', fontFamily: 'Space Mono, monospace', color: 'var(--text-muted)' }}>
                {cat.count} шт.
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS SHOWCASE */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '22px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <CelestialStar size={14} color="var(--accent-lavender)" />
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: 'var(--accent-glow)', letterSpacing: '1px' }}>
                FEATURED HARDWARE
              </span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.5px' }}>
              Флагманские устройства
            </h2>
          </div>
          <Link
            href="/catalog"
            style={{
              fontSize: '12px',
              fontFamily: 'Space Mono, monospace',
              color: 'var(--accent-glow)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            Смотреть каталог ({PRODUCTS.length}) <ArrowRight size={14} />
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
