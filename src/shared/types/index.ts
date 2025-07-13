// Tipos base para a aplicação
export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

// Tipos para stores/tenants
export interface Store extends BaseEntity {
  name: string
  description?: string
  address: string
  phone: string
  isActive: boolean
  merchantId: string
}

// Tipos para pedidos
export interface Order extends BaseEntity {
  customerName: string
  customerPhone: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  storeId: string
  source: 'whatsapp' | 'app' | 'website'
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'

// Tipos para produtos
export interface Product extends BaseEntity {
  name: string
  description?: string
  price: number
  category: string
  isAvailable: boolean
  storeId: string
}

// Tipos para categorias
export interface Category extends BaseEntity {
  name: string
  description?: string
  storeId: string
}

// Tipos para API responses
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
} 