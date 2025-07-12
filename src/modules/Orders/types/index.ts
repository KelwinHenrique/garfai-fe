import { Order, OrderStatus } from '@shared/types'

export interface OrdersState {
  orders: Order[]
  loading: boolean
  error: string | null
  selectedOrder: Order | null
}

export interface OrdersFilter {
  status?: OrderStatus
  storeId?: string
  dateFrom?: string
  dateTo?: string
}

export interface OrdersPagination {
  page: number
  limit: number
  total: number
} 