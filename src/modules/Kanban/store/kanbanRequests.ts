import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosServices from "@/shared/services/api";
import { IOrder } from "@/modules/Orders/types/IOrder";

export interface IOrderKanbanResponse {
  [key: string]: IOrder[]
}

export const fetchOrdersKanban = createAsyncThunk(
  'ordersKanban/fetchOrdersKanban',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosServices.get('/orders/by-status');

      console.log('response', response)

      const kanban = response.data.data as IOrderKanbanResponse;
      return kanban;
    } catch (error) {
      console.log('error', error)
      return rejectWithValue('Failed to fetch orders kanban',);
    }
  }
);

export const fetchOrderByIdDetails = createAsyncThunk(
  'ordersKanban/fetchOrderDetail',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await axiosServices.get(`/orders/${orderId}/merchant`);

      console.log('response', response)

      const order = response.data.data as IOrder;
      return order;
    } catch (error) {
      console.log('error', error)
      return rejectWithValue('Failed to fetch order detail');
    }
  }
);

export const merchantAcceptOrder = createAsyncThunk(
  'ordersKanban/merchantAcceptOrder',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await axiosServices.put(`/orders/${orderId}/merchantAcceptOrder`);
      return response.data.data as IOrder;
    } catch (error) {
      console.log('error', error)
      return rejectWithValue('Failed to accept order');
    }
  }
);

export const setOrderReadyForDelivery = createAsyncThunk(
  'ordersKanban/setOrderReadyForDelivery',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await axiosServices.put(`/orders/${orderId}/readyForDeliveryOrder`);
      return response.data.data as IOrder;
    } catch (error) {
      console.log('error', error)
      return rejectWithValue('Failed to accept order');
    }
  }
);

export const setOrderInDelivery = createAsyncThunk(
  'ordersKanban/setOrderInDelivery',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await axiosServices.put(`/orders/${orderId}/inDeliveryOrder`);
      return response.data.data as IOrder;
    } catch (error) {
      console.log('error', error)
      return rejectWithValue('Failed to set order in delivery');
    }
  }
);