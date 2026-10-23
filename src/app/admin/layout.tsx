import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LUMI TÉCHNICA — Панель администратора',
  description: 'Панель управления товарами, заказами и каталогом',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  );
}
