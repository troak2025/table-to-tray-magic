export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
  modifiers?: Modifier[];
}

export interface Modifier {
  id: string;
  name: string;
  price: number;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  itemCount: number;
}

export interface Order {
  id: string;
  tableNumber?: number;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  createdAt: Date;
  customerName?: string;
  type: 'dine-in' | 'takeout' | 'online';
}

export interface OrderItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  modifiers?: Modifier[];
  notes?: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled';

export interface Table {
  id: string;
  number: number;
  seats: number;
  status: TableStatus;
  currentOrder?: Order;
}

export type TableStatus = 'available' | 'occupied' | 'reserved' | 'cleaning';

export interface DashboardStats {
  totalRevenue: number;
  ordersToday: number;
  activeOrders: number;
  averageOrderValue: number;
  revenueChange: number;
  ordersChange: number;
}
