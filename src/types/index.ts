export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryId: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  badge?: 'new' | 'hit' | 'sale';
  description: string;
  specs: Record<string, string>;
  images: string[];
  isPopular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  count: number;
  description?: string;
  popular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
