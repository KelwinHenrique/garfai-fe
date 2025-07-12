import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { OrdersState, OrdersFilter } from '../types'

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
  selectedOrder: null,
}


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
  extraReducers: () => {

  },
})

export const { setSelectedOrder, clearError } = ordersSlice.actions
export default ordersSlice.reducer 