'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Users,
  Plus,
  Trash2,
  Edit2,
  Search,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Lock,
  LogOut,
  ShieldAlert,
  Percent,
  Settings,
  Bell,
  BarChart3,
  Check,
  Eye,
  KeyRound,
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/data/mockData';
import { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CelestialStar } from '@/components/ui/CelestialGraphics';

export default function AdminPage() {
  // Admin Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(true);
  const [loginEmail, setLoginEmail] = useState('admin@lumistore.com');
  const [loginPassword, setLoginPassword] = useState('admin2026');
  const [loginError, setLoginError] = useState('');

  // Tabs: dashboard, products, orders, categories, customers, discounts, settings
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'products' | 'orders' | 'categories' | 'customers' | 'discounts' | 'settings'
  >('dashboard');

  const [productList, setProductList] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Form states for new product
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('smartphones');
  const [newPrice, setNewPrice] = useState('');
  const [newOldPrice, setNewOldPrice] = useState('');
  const [newStock, setNewStock] = useState('10');
  const [newBadge, setNewBadge] = useState<'new' | 'sale' | 'hit'>('new');
  const [newDescription, setNewDescription] = useState('');

  // Orders state
  const [orders, setOrders] = useState([
    {
      id: 'LM-829140',
      customer: 'Алексей Смирнов',
      email: 'alex@example.com',
      total: 89990,
      status: 'В пути',
      date: 'Сегодня, 14:20',
      items: 'LUMI Nova 15 Pro (1 шт)',
    },
    {
      id: 'LM-829139',
      customer: 'Мария Кузнецова',
      email: 'maria.k@gmail.com',
      total: 24990,
      status: 'Оплачен',
      date: 'Сегодня, 11:05',
      items: 'LUMI Pods Max ANC (1 шт)',
    },
    {
      id: 'LM-829135',
      customer: 'Иван Денисов',
      email: 'denisov@mail.ru',
      total: 134990,
      status: 'Доставлен',
      date: 'Вчера, 19:40',
      items: 'LUMI Blade 16 OLED (1 шт)',
    },
    {
      id: 'LM-829132',
      customer: 'Елена Васильева',
      email: 'elena.v@ya.ru',
      total: 149990,
      status: 'Оплачен',
      date: 'Вчера, 16:15',
      items: 'LUMI Neo Fold Dual Screen (1 шт)',
    },
    {
      id: 'LM-829128',
      customer: 'Дмитрий Соколов',
      email: 'sokolov.d@corp.ru',
      total: 89990,
      status: 'Доставлен',
      date: '21 окт, 12:10',
      items: 'LUMI Horizon 34 Curved OLED (1 шт)',
    },
  ]);

  // Customers mock data
  const [customers, setCustomers] = useState([
    { id: 'c-1', name: 'Алексей Смирнов', email: 'alex@example.com', ordersCount: 4, spent: 234970, status: 'VIP' },
    { id: 'c-2', name: 'Мария Кузнецова', email: 'maria.k@gmail.com', ordersCount: 2, spent: 61980, status: 'Активен' },
    { id: 'c-3', name: 'Иван Денисов', email: 'denisov@mail.ru', ordersCount: 1, spent: 134990, status: 'Новый' },
    { id: 'c-4', name: 'Елена Васильева', email: 'elena.v@ya.ru', ordersCount: 3, spent: 184470, status: 'VIP' },
    { id: 'c-5', name: 'Дмитрий Соколов', email: 'sokolov.d@corp.ru', ordersCount: 2, spent: 101980, status: 'Активен' },
  ]);

  // Promo codes / discounts state
  const [promos, setPromos] = useState([
    { code: 'LUMI2026', discount: '10%', type: 'Процентная', usages: 42, active: true },
    { code: 'CELESTIAL', discount: '5 000 ₽', type: 'Фиксированная', usages: 19, active: true },
    { code: 'PROMO15', discount: '15%', type: 'Процентная', usages: 88, active: false },
  ]);
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newPromoDiscount, setNewPromoDiscount] = useState('');

  // Store settings state
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'LUMI TÉCHNICA // STORE',
    supportEmail: 'support@lumistore.com',
    minOrderFreeDelivery: 5000,
    maintenanceMode: false,
    autoAcceptOrders: true,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Введите email и пароль');
      return;
    }
    // Demo check
    if (loginPassword.length < 4) {
      setLoginError('Пароль должен быть не менее 4 символов');
      return;
    }
    setLoginError('');
    setIsAdminLoggedIn(true);
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
  };

  const handleDeleteProduct = (id: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrice) return;

    const prod: Product = {
      id: 'prod-' + Date.now(),
      name: newTitle,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category: CATEGORIES.find((c) => c.id === newCategory)?.name || 'Электроника',
      categoryId: newCategory,
      price: Number(newPrice),
      oldPrice: newOldPrice ? Number(newOldPrice) : undefined,
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      stockCount: Number(newStock) || 10,
      description: newDescription.trim() || 'Новое флагманское устройство в каталоге LUMI TÉCHNICA.',
      specs: { 'Гарантия': '2 года', 'Состояние': 'Оригинал, запечатан' },
      images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80'],
      badge: newBadge,
    };

    setProductList([prod, ...productList]);
    setIsAddingProduct(false);
    setNewTitle('');
    setNewPrice('');
    setNewOldPrice('');
    setNewDescription('');
  };

  const handleChangeOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleAddPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoCode.trim() || !newPromoDiscount.trim()) return;
    setPromos([
      ...promos,
      {
        code: newPromoCode.trim().toUpperCase(),
        discount: newPromoDiscount.trim(),
        type: newPromoDiscount.includes('%') ? 'Процентная' : 'Фиксированная',
        usages: 0,
        active: true,
      },
    ]);
    setNewPromoCode('');
    setNewPromoDiscount('');
  };

  const filteredProducts = productList.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If not logged in: show dedicated Admin Login Gateway
  if (!isAdminLoggedIn) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          background: 'radial-gradient(ellipse at top, rgba(167, 155, 242, 0.12) 0%, rgba(9, 9, 16, 0.98) 70%)',
        }}
      >
        <div
          className="poster-glass-card"
          style={{
            maxWidth: '440px',
            width: '100%',
            padding: '36px',
            border: '1px solid var(--border-glow)',
            boxShadow: 'var(--shadow-neon)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                backgroundColor: 'rgba(167, 155, 242, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                border: '1px solid var(--border-glow)',
              }}
            >
              <Lock size={26} color="var(--accent-lavender)" />
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <CelestialStar size={14} color="var(--accent-lavender)" />
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: 'var(--accent-glow)' }}>
                SECURITY GATEWAY // LEVEL 4
              </span>
            </div>

            <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Вход в панель управления</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '6px' }}>
              Доступ разрешён только сотрудникам и администраторам системы
            </p>
          </div>

          {loginError && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 14px',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 'var(--radius-md)',
                color: '#F87171',
                fontSize: '13px',
                marginBottom: '20px',
              }}
            >
              <AlertCircle size={16} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Email администратора
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="y2k-input"
                style={{ width: '100%' }}
                placeholder="admin@lumistore.com"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Мастер-пароль
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="y2k-input"
                style={{ width: '100%' }}
                placeholder="••••••••"
              />
            </div>

            <div
              style={{
                padding: '10px 14px',
                backgroundColor: 'rgba(167, 155, 242, 0.06)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                fontFamily: 'Space Mono, monospace',
                fontSize: '11px',
                color: 'var(--text-secondary)',
              }}
            >
              ⚡ Демо-доступ: пароль <strong style={{ color: 'var(--accent-lavender)' }}>admin2026</strong>
            </div>

            <Button type="submit" variant="primary" size="lg" style={{ marginTop: '8px' }}>
              <KeyRound size={18} /> Авторизоваться в матрице
            </Button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <Link href="/" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              ← Вернуться на витрину магазина
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard Interface
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Dedicated Admin Header */}
      <header
        style={{
          borderBottom: '1px solid var(--border-medium)',
          backgroundColor: 'rgba(10, 8, 18, 0.95)',
          backdropFilter: 'blur(16px)',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '14px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CelestialStar size={20} color="var(--accent-lavender)" />
              <span style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                LUMI <span style={{ color: 'var(--accent-glow)' }}>ADMIN MATRIX</span>
              </span>
            </div>
            <span
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '11px',
                color: 'var(--text-muted)',
                backgroundColor: 'rgba(167, 155, 242, 0.08)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--border-light)',
              }}
            >
              AUTH: {loginEmail}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="sm">
                Витрина магазина ↗
              </Button>
            </Link>

            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut size={16} /> Выйти
            </Button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <div style={{ maxWidth: '1440px', width: '100%', margin: '0 auto', padding: '28px 24px 64px', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 800 }}>Центр управления магазином</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>
              Автономная панель: каталог ({productList.length} товаров), заказы, клиенты и промо-акции
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                color: 'var(--color-success)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: 'var(--radius-pill)',
                fontSize: '12px',
                fontWeight: 600,
                fontFamily: 'Space Mono, monospace',
              }}
            >
              ● СИСТЕМА ОНЛАЙН
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '24px' }}>
          {/* Admin Navigation Sidebar */}
          <aside
            className="poster-glass-card"
            style={{ padding: '16px', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '4px' }}
          >
            <button
              onClick={() => setActiveTab('dashboard')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '14px',
                fontWeight: 600,
                backgroundColor: activeTab === 'dashboard' ? 'rgba(167, 155, 242, 0.18)' : 'transparent',
                color: activeTab === 'dashboard' ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: activeTab === 'dashboard' ? '1px solid var(--border-glow)' : '1px solid transparent',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              <LayoutDashboard size={18} color="var(--accent-lavender)" />
              Дашборд
            </button>

            <button
              onClick={() => setActiveTab('products')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '14px',
                fontWeight: 600,
                backgroundColor: activeTab === 'products' ? 'rgba(167, 155, 242, 0.18)' : 'transparent',
                color: activeTab === 'products' ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: activeTab === 'products' ? '1px solid var(--border-glow)' : '1px solid transparent',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              <Package size={18} color="var(--accent-lavender)" />
              Товары ({productList.length})
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '14px',
                fontWeight: 600,
                backgroundColor: activeTab === 'orders' ? 'rgba(167, 155, 242, 0.18)' : 'transparent',
                color: activeTab === 'orders' ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: activeTab === 'orders' ? '1px solid var(--border-glow)' : '1px solid transparent',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              <ShoppingBag size={18} color="var(--accent-lavender)" />
              Заказы ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '14px',
                fontWeight: 600,
                backgroundColor: activeTab === 'customers' ? 'rgba(167, 155, 242, 0.18)' : 'transparent',
                color: activeTab === 'customers' ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: activeTab === 'customers' ? '1px solid var(--border-glow)' : '1px solid transparent',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              <Users size={18} color="var(--accent-lavender)" />
              Клиенты ({customers.length})
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '14px',
                fontWeight: 600,
                backgroundColor: activeTab === 'categories' ? 'rgba(167, 155, 242, 0.18)' : 'transparent',
                color: activeTab === 'categories' ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: activeTab === 'categories' ? '1px solid var(--border-glow)' : '1px solid transparent',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              <FolderTree size={18} color="var(--accent-lavender)" />
              Категории ({CATEGORIES.length})
            </button>

            <button
              onClick={() => setActiveTab('discounts')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '14px',
                fontWeight: 600,
                backgroundColor: activeTab === 'discounts' ? 'rgba(167, 155, 242, 0.18)' : 'transparent',
                color: activeTab === 'discounts' ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: activeTab === 'discounts' ? '1px solid var(--border-glow)' : '1px solid transparent',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              <Percent size={18} color="var(--accent-lavender)" />
              Промокоды ({promos.length})
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '14px',
                fontWeight: 600,
                backgroundColor: activeTab === 'settings' ? 'rgba(167, 155, 242, 0.18)' : 'transparent',
                color: activeTab === 'settings' ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: activeTab === 'settings' ? '1px solid var(--border-glow)' : '1px solid transparent',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              <Settings size={18} color="var(--accent-lavender)" />
              Настройки магазина
            </button>
          </aside>

          {/* Tab Content Panels */}
          <div>
            {/* TAB 1: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  <div className="poster-glass-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px' }}>Выручка за месяц</span>
                      <DollarSign size={18} color="var(--accent-lavender)" />
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 800 }}>2 489 900 ₽</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-success)', marginTop: '4px' }}>
                      +22.4% к прошлому месяцу
                    </div>
                  </div>

                  <div className="poster-glass-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px' }}>Всего заказов</span>
                      <TrendingUp size={18} color="#FBBF24" />
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 800 }}>184</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      98% успешных доставок
                    </div>
                  </div>

                  <div className="poster-glass-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px' }}>Номенклатура</span>
                      <Package size={18} color="var(--accent-primary)" />
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 800 }}>{productList.length} SKU</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      Все товары в наличии
                    </div>
                  </div>

                  <div className="poster-glass-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px' }}>Активные клиенты</span>
                      <Users size={18} color="var(--accent-glow)" />
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 800 }}>{customers.length * 142}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-success)', marginTop: '4px' }}>
                      +48 регистраций за неделю
                    </div>
                  </div>
                </div>

                {/* Quick actions & Recent activity */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="poster-glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px' }}>Быстрые действия</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => {
                          setActiveTab('products');
                          setIsAddingProduct(true);
                        }}
                      >
                        <Plus size={16} /> Добавить товар
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setActiveTab('discounts')}>
                        <Percent size={16} /> Создать промокод
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setActiveTab('orders')}>
                        <ShoppingBag size={16} /> Обработать заказы
                      </Button>
                    </div>
                  </div>

                  <div className="poster-glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px' }}>Последние заказы</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {orders.slice(0, 3).map((o) => (
                        <div
                          key={o.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '13px',
                            padding: '8px 0',
                            borderBottom: '1px solid var(--border-light)',
                          }}
                        >
                          <div>
                            <span style={{ fontFamily: 'Space Mono, monospace', color: 'var(--accent-glow)', marginRight: '8px' }}>
                              {o.id}
                            </span>
                            <span>{o.customer}</span>
                          </div>
                          <span style={{ fontWeight: 700 }}>{o.total.toLocaleString('ru-RU')} ₽</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PRODUCTS MANAGEMENT */}
            {activeTab === 'products' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ position: 'relative', width: '320px' }}>
                    <Search
                      size={18}
                      style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                    />
                    <input
                      type="text"
                      placeholder="Поиск по названию товара..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="y2k-input"
                      style={{ width: '100%', paddingLeft: '40px' }}
                    />
                  </div>

                  <Button variant="primary" onClick={() => setIsAddingProduct(!isAddingProduct)}>
                    <Plus size={18} /> {isAddingProduct ? 'Закрыть форму' : 'Добавить товар'}
                  </Button>
                </div>

                {/* Form to add product */}
                {isAddingProduct && (
                  <form
                    onSubmit={handleCreateProduct}
                    className="poster-glass-card"
                    style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}
                  >
                    <h3 style={{ fontSize: '17px', fontWeight: 700 }}>Новый товар в каталоге</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>Название устройства</label>
                        <input
                          type="text"
                          required
                          placeholder="Например: LUMI Watch Ultra Pro Titanium"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="y2k-input"
                          style={{ width: '100%' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>Категория</label>
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className="y2k-input"
                          style={{ width: '100%', backgroundColor: 'var(--bg-surface)' }}
                        >
                          {CATEGORIES.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>Цена (₽)</label>
                        <input
                          type="number"
                          required
                          placeholder="89990"
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                          className="y2k-input"
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>Старая цена (₽)</label>
                        <input
                          type="number"
                          placeholder="99990"
                          value={newOldPrice}
                          onChange={(e) => setNewOldPrice(e.target.value)}
                          className="y2k-input"
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>Остаток (шт)</label>
                        <input
                          type="number"
                          value={newStock}
                          onChange={(e) => setNewStock(e.target.value)}
                          className="y2k-input"
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>Бейдж</label>
                        <select
                          value={newBadge}
                          onChange={(e) => setNewBadge(e.target.value as any)}
                          className="y2k-input"
                          style={{ width: '100%', backgroundColor: 'var(--bg-surface)' }}
                        >
                          <option value="new">NEW</option>
                          <option value="hit">HIT</option>
                          <option value="sale">SALE</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>Краткое описание</label>
                      <input
                        type="text"
                        placeholder="Основные фичи, материал корпуса или характеристики..."
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="y2k-input"
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                      <Button type="button" variant="ghost" onClick={() => setIsAddingProduct(false)}>
                        Отмена
                      </Button>
                      <Button type="submit" variant="primary">
                        Сохранить и опубликовать
                      </Button>
                    </div>
                  </form>
                )}

                {/* Table of products */}
                <div className="poster-glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '70px 2.5fr 1.5fr 1fr 1fr 100px',
                      padding: '14px 20px',
                      backgroundColor: 'rgba(21, 20, 33, 0.8)',
                      borderBottom: '1px solid var(--border-light)',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      fontFamily: 'Space Mono, monospace',
                    }}
                  >
                    <div>Фото</div>
                    <div>Наименование</div>
                    <div>Категория</div>
                    <div>Цена</div>
                    <div>Остаток</div>
                    <div style={{ textAlign: 'right' }}>Действия</div>
                  </div>

                  <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    {filteredProducts.map((p) => (
                      <div
                        key={p.id}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '70px 2.5fr 1.5fr 1fr 1fr 100px',
                          padding: '14px 20px',
                          alignItems: 'center',
                          borderBottom: '1px solid var(--border-light)',
                          fontSize: '14px',
                        }}
                      >
                        <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                          <img
                            src={p.images[0] || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200'}
                            alt=""
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'Space Mono, monospace' }}>
                            ID: {p.id}
                          </div>
                        </div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{p.category}</div>
                        <div style={{ fontWeight: 700, color: 'var(--accent-glow)' }}>{p.price.toLocaleString('ru-RU')} ₽</div>
                        <div>
                          <span
                            style={{
                              padding: '4px 10px',
                              borderRadius: 'var(--radius-pill)',
                              backgroundColor: p.stockCount > 10 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                              color: p.stockCount > 10 ? 'var(--color-success)' : '#F59E0B',
                              fontSize: '12px',
                              fontWeight: 600,
                            }}
                          >
                            {p.stockCount} шт
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: 'var(--color-danger)',
                              cursor: 'pointer',
                              padding: '6px',
                            }}
                            title="Удалить товар"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ORDERS */}
            {activeTab === 'orders' && (
              <div className="poster-glass-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Управление заказами</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {orders.map((o) => (
                    <div
                      key={o.id}
                      style={{
                        padding: '16px',
                        backgroundColor: 'rgba(20, 16, 38, 0.7)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-light)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                          <span style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700, color: 'var(--accent-glow)' }}>
                            {o.id}
                          </span>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{o.date}</span>
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: 600 }}>
                          {o.customer} ({o.email})
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          Состав: {o.items}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ fontSize: '16px', fontWeight: 800 }}>{o.total.toLocaleString('ru-RU')} ₽</span>
                        <select
                          value={o.status}
                          onChange={(e) => handleChangeOrderStatus(o.id, e.target.value)}
                          style={{
                            backgroundColor: 'var(--bg-surface)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border-medium)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '6px 12px',
                            fontSize: '13px',
                            outline: 'none',
                          }}
                        >
                          <option value="Оплачен">Оплачен</option>
                          <option value="В пути">В пути</option>
                          <option value="Доставлен">Доставлен</option>
                          <option value="Отменён">Отменён</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: CUSTOMERS */}
            {activeTab === 'customers' && (
              <div className="poster-glass-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Клиентская база</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {customers.map((c) => (
                    <div
                      key={c.id}
                      style={{
                        padding: '16px 20px',
                        backgroundColor: 'rgba(20, 16, 38, 0.6)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-light)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: 600 }}>{c.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{c.email}</div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Заказов: {c.ordersCount}</div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent-glow)' }}>
                            {c.spent.toLocaleString('ru-RU')} ₽
                          </div>
                        </div>

                        <span
                          style={{
                            padding: '4px 12px',
                            borderRadius: 'var(--radius-pill)',
                            backgroundColor: c.status === 'VIP' ? 'rgba(167, 155, 242, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                            color: c.status === 'VIP' ? 'var(--accent-lavender)' : 'var(--text-secondary)',
                            border: '1px solid var(--border-light)',
                            fontSize: '12px',
                            fontWeight: 600,
                          }}
                        >
                          {c.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: CATEGORIES */}
            {activeTab === 'categories' && (
              <div className="poster-glass-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>
                  Категории и структура каталога ({CATEGORIES.length})
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                  {CATEGORIES.map((c) => (
                    <div
                      key={c.id}
                      style={{
                        padding: '16px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'rgba(20, 16, 38, 0.6)',
                        border: '1px solid var(--border-light)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: 600 }}>{c.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'Space Mono, monospace' }}>
                          Слаг: /{c.slug}
                        </div>
                      </div>
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: 'var(--accent-glow)' }}>
                        {productList.filter((p) => p.categoryId === c.id).length} моделей
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: DISCOUNTS & PROMO CODES */}
            {activeTab === 'discounts' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="poster-glass-card" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Создать новый промокод</h3>
                  <form onSubmit={handleAddPromo} style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>Код промокода</label>
                      <input
                        type="text"
                        placeholder="SUMMER2026"
                        value={newPromoCode}
                        onChange={(e) => setNewPromoCode(e.target.value)}
                        className="y2k-input"
                        style={{ width: '100%', textTransform: 'uppercase' }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>Скидка (например 10% или 3000 ₽)</label>
                      <input
                        type="text"
                        placeholder="10%"
                        value={newPromoDiscount}
                        onChange={(e) => setNewPromoDiscount(e.target.value)}
                        className="y2k-input"
                        style={{ width: '100%' }}
                      />
                    </div>
                    <Button type="submit" variant="primary">
                      <Plus size={16} /> Добавить промокод
                    </Button>
                  </form>
                </div>

                <div className="poster-glass-card" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Действующие промокоды</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {promos.map((p) => (
                      <div
                        key={p.code}
                        style={{
                          padding: '16px',
                          backgroundColor: 'rgba(20, 16, 38, 0.6)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-light)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <span
                            style={{
                              fontFamily: 'Space Mono, monospace',
                              fontSize: '15px',
                              fontWeight: 700,
                              color: 'var(--accent-glow)',
                              padding: '4px 10px',
                              borderRadius: 'var(--radius-sm)',
                              backgroundColor: 'rgba(167, 155, 242, 0.1)',
                            }}
                          >
                            {p.code}
                          </span>
                          <span style={{ fontSize: '14px', fontWeight: 600 }}>{p.discount}</span>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>({p.type})</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Применений: {p.usages}</span>
                          <span
                            style={{
                              padding: '4px 10px',
                              borderRadius: 'var(--radius-pill)',
                              backgroundColor: p.active ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                              color: p.active ? 'var(--color-success)' : '#EF4444',
                              fontSize: '11px',
                              fontWeight: 600,
                            }}
                          >
                            {p.active ? 'АКТИВЕН' : 'ОТКЛЮЧЁН'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 7: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="poster-glass-card" style={{ padding: '28px', maxWidth: '640px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Конфигурация магазина</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Название магазина
                    </label>
                    <input
                      type="text"
                      value={storeSettings.storeName}
                      onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                      className="y2k-input"
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Email службы поддержки
                    </label>
                    <input
                      type="email"
                      value={storeSettings.supportEmail}
                      onChange={(e) => setStoreSettings({ ...storeSettings, supportEmail: e.target.value })}
                      className="y2k-input"
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Порог бесплатной доставки (₽)
                    </label>
                    <input
                      type="number"
                      value={storeSettings.minOrderFreeDelivery}
                      onChange={(e) => setStoreSettings({ ...storeSettings, minOrderFreeDelivery: Number(e.target.value) })}
                      className="y2k-input"
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                    <input
                      type="checkbox"
                      id="autoAccept"
                      checked={storeSettings.autoAcceptOrders}
                      onChange={(e) => setStoreSettings({ ...storeSettings, autoAcceptOrders: e.target.checked })}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}
                    />
                    <label htmlFor="autoAccept" style={{ fontSize: '14px', cursor: 'pointer' }}>
                      Автоматически подтверждать новые заказы
                    </label>
                  </div>

                  <Button
                    variant="primary"
                    style={{ marginTop: '12px' }}
                    onClick={() => alert('Настройки магазина успешно сохранены!')}
                  >
                    Сохранить изменения
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
