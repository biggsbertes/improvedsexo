import { create } from 'zustand'
import type { Order } from '@/types/order'

interface OrdersState {
  orders: Order[]
  isLoading: boolean
  filter: 'all' | 'pending' | 'approved' | 'cancelled' | 'expired' | 'refunded'
  setOrders: (orders: Order[]) => void
  setIsLoading: (v: boolean) => void
  setFilter: (f: OrdersState['filter']) => void
  filteredOrders: () => Order[]
}

export const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: [],
  isLoading: false,
  filter: 'all',
  setOrders: (orders) => set({ orders }),
  setIsLoading: (v) => set({ isLoading: v }),
  setFilter: (f) => set({ filter: f }),
  filteredOrders: () => {
    const { orders, filter } = get()
    if (filter === 'all') return orders
    return orders.filter(o => o.status === filter)
  }
}))


