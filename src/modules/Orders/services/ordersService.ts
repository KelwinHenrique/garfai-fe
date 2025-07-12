import { apiService } from '@shared/services/api'
import { Order } from '@shared/types'
import { OrdersFilter, OrdersPagination } from '../types'

export const ordersService = {
  async getOrders(
    page = 1,
    limit = 10,
    filters?: OrdersFilter
  ): Promise<{ data: Order[]; pagination: OrdersPagination }> {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(filters?.status && { status: filters.status }),
      ...(filters?.storeId && { storeId: filters.storeId }),
      ...(filters?.dateFrom && { dateFrom: filters.dateFrom }),
      ...(filters?.dateTo && { dateTo: filters.dateTo }),
    })

    const response = await apiService.get<{ data: Order[]; pagination: OrdersPagination }>(
      `/orders?${queryParams}`
    )
    return response.data
  },

  async getOrderById(id: string): Promise<Order> {
    const response = await apiService.get<Order>(`/orders/${id}`)
    return response.data
  },

  async updateOrderStatus(id: string, status: string): Promise<Order> {
    const response = await apiService.patch<Order>(`/orders/${id}/status`, { status })
    return response.data
  },

  async createOrder(orderData: Record<string, unknown>): Promise<Order> {
    const response = await apiService.post<Order>('/orders', orderData)
    return response.data
  },
} 