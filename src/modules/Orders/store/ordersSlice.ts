import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ordersService } from '../services/ordersService'
import { OrdersState, OrdersFilter } from '../types'

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
  selectedOrder: null,
}

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async ({ page, limit, filters }: { page: number; limit: number; filters?: OrdersFilter }) => {
    const response = await ordersService.getOrders(page, limit, filters)
    return response
  }
)

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (id: string) => {
    const order = await ordersService.getOrderById(id)
    return order
  }
)

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, status }: { id: string; status: string }) => {
    const order = await ordersService.updateOrderStatus(id, status)
    return order
  }
)

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload.data
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Erro ao carregar pedidos'
      })
      // fetchOrderById
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedOrder = action.payload
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Erro ao carregar pedido'
      })
      // updateOrderStatus
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload
        const index = state.orders.findIndex((order) => order.id === updatedOrder.id)
        if (index !== -1) {
          state.orders[index] = updatedOrder
        }
        if (state.selectedOrder?.id === updatedOrder.id) {
          state.selectedOrder = updatedOrder
        }
      })
  },
})

export const { setSelectedOrder, clearError } = ordersSlice.actions
export default ordersSlice.reducer 