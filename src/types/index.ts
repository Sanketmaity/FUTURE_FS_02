export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  description: string;
  inStock: number;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  orderDate: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface Newsletter {
  email: string;
  subscribedAt: string;
}