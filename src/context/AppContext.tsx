import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Product, CartItem, User, Order } from '../types';
import { mockProducts } from '../data/mockData';

interface AppState {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  orders: Order[];
  searchQuery: string;
  selectedCategory: string;
  selectedBrand: string;
  priceRange: [number, number];
}

type AppAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_BRAND'; payload: string }
  | { type: 'SET_PRICE_RANGE'; payload: [number, number] };

const initialState: AppState = {
  products: mockProducts,
  cart: [],
  user: null,
  orders: [],
  searchQuery: '',
  selectedCategory: '',
  selectedBrand: '',
  priceRange: [0, 5000],
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload),
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, action.payload] };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'SET_BRAND':
      return { ...state, selectedBrand: action.payload };
    case 'SET_PRICE_RANGE':
      return { ...state, priceRange: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { user: clerkUser, isLoaded } = useUser();

  // Convert Clerk user to our User type
  const user: User | null = clerkUser ? {
    id: clerkUser.id,
    email: clerkUser.primaryEmailAddress?.emailAddress || '',
    name: clerkUser.fullName || clerkUser.firstName || 'User',
    firstName: clerkUser.firstName || undefined,
    lastName: clerkUser.lastName || undefined,
    imageUrl: clerkUser.imageUrl || undefined,
  } : null;

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('musicStore_cart');
    const savedOrders = localStorage.getItem('musicStore_orders');

    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      cartItems.forEach((item: CartItem) => {
        dispatch({ type: 'ADD_TO_CART', payload: item.product });
        if (item.quantity > 1) {
          dispatch({
            type: 'UPDATE_CART_QUANTITY',
            payload: { productId: item.product.id, quantity: item.quantity },
          });
        }
      });
    }

    if (savedOrders) {
      const orders = JSON.parse(savedOrders);
      orders.forEach((order: Order) => {
        dispatch({ type: 'ADD_ORDER', payload: order });
      });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('musicStore_cart', JSON.stringify(state.cart));
  }, [state.cart]);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('musicStore_orders', JSON.stringify(state.orders));
  }, [state.orders]);

  return (
    <AppContext.Provider value={{ state: { ...state, user }, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}