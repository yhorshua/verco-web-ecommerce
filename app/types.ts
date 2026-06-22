export interface Product {
  id: string;
  name: string;
  brand: 'Nike' | 'Adidas' | 'Puma';
  category: 'Calzado' | 'Ropa' | 'Accesorios';
  gender: 'Hombre' | 'Mujer' | 'Unisex';
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  sizes: string[];
  colors: { name: string; class: string; hex: string }[];
  isNew?: boolean;
  isFeatured?: boolean;
  discount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: { name: string; class: string; hex: string };
}

export interface CartState {
  items: CartItem[];
}
