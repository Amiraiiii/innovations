import type { Metadata } from 'next';
import './globals.css';
import { StoreShell } from '@/components/layout/StoreShell';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'LUMI TÉCHNICA — Celestial Digital Hardware',
  description: 'Космическая эстетика, флагманские смартфоны, ультрабуки и электроника.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="poster-background">
        <AuthProvider>
          <CartProvider>
            <StoreShell>{children}</StoreShell>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
