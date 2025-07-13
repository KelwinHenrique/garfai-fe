import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOrderByIdDetails, fetchOrdersKanban, IOrderKanbanResponse, merchantAcceptOrder, setOrderInDelivery, setOrderReadyForDelivery } from './kanbanRequests';
import { toast } from 'react-toastify';
import { IPayload } from '@/shared/types/IPayload';
import { EOrderStatus, IOrder } from '@/modules/Orders/types/IOrder';

interface IKanbanFilter {
  search: string;
  sort: string;
}

export interface IKanban {
  [key: string]: IPayload<IOrder> & { expanded: boolean }
}

interface IMenusState {
  loadingOrderDetails: boolean;
  loadingOrdersKanban: boolean;
  ordersKanban: IKanban
  filter: IKanbanFilter;
  loadingOrder: boolean
  selectedOrderId: string | null
  orderDetails: IOrder | null
}

const initialState: IMenusState = {
  loadingOrderDetails: false,
  loadingOrdersKanban: false,
  ordersKanban: {
    [EOrderStatus.WAITING_MERCHANT_ACCEPTANCE]: {
      expanded: true,
      count: 0,
      rows: [] as IOrder[]
    },
    [EOrderStatus.IN_PREPARATION]: {
      expanded: false,
      count: 0,
      rows: [] as IOrder[]
    },
    [EOrderStatus.READY_FOR_DELIVERY]: {
      expanded: false,
      count: 0,
      rows: [] as IOrder[]
    },
    [EOrderStatus.IN_DELIVERY]: {
      expanded: false,
      count: 0,
      rows: [] as IOrder[]
    },
    [EOrderStatus.DRIVER_ON_CLIENT]: {
      expanded: false,
      count: 0,
      rows: [] as IOrder[]
    },
    [EOrderStatus.COMPLETED]: {
      expanded: false,
      count: 0,
      rows: [] as IOrder[]
    },
  },
  loadingOrder: false,
  filter: {
    search: '',
    sort: '',
  },
  selectedOrderId: null,
  orderDetails: null
};

const menusSlice = createSlice({
  name: 'menus',
  initialState,
  reducers: {
    selectOrder: (state, action: PayloadAction<string>) => {
      if (state.selectedOrderId === action.payload) {
        state.selectedOrderId = null;
        state.orderDetails = null;
      } else {
        state.selectedOrderId = action.payload;
      }
    },
    toggleSection: (state, action: PayloadAction<EOrderStatus>) => {
      const status = action.payload;
      state.ordersKanban[status].expanded = !state.ordersKanban[status].expanded;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchOrdersKanban.pending, (state) => {
      state.loadingOrdersKanban = true;
    })
      .addCase(fetchOrdersKanban.fulfilled, (state, action: PayloadAction<IOrderKanbanResponse>) => {
      state.loadingOrdersKanban = false;

        state.ordersKanban = Object.keys(action.payload).reduce((acc, key) => {

          console.log('action.payload[key]', action.payload[key])

          return {
            ...acc,
            [key]: {
              count: action.payload[key].length || 0,
              rows: action.payload[key] || [],
              expanded: state.ordersKanban[key]?.expanded || false
            }
          };
        }, {});
    })
    .addCase(fetchOrdersKanban.rejected, (state) => {
      state.loadingOrdersKanban = false;
    })

      .addCase(fetchOrderByIdDetails.pending, (state) => {
        state.loadingOrderDetails = true;
      })
      .addCase(fetchOrderByIdDetails.fulfilled, (state, action) => {
        console.log('action.payload', action.payload)
        state.loadingOrderDetails = false;
        state.orderDetails = action.payload as unknown as IOrder;
      })

      .addCase(merchantAcceptOrder.fulfilled, (state, action) => {

        console.log('action.payload', action.payload)
        toast.success('Pedido aceito com sucesso!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Remove order from WAITING_MERCHANT_ACCEPTANCE
        const orderToMove = state.ordersKanban[EOrderStatus.WAITING_MERCHANT_ACCEPTANCE].rows.find(
          order => order.id === action.payload.id
        );

        if (orderToMove) {
          // Remove from WAITING_MERCHANT_ACCEPTANCE
          state.ordersKanban[EOrderStatus.WAITING_MERCHANT_ACCEPTANCE].rows =
            state.ordersKanban[EOrderStatus.WAITING_MERCHANT_ACCEPTANCE].rows.filter(
              order => order.id !== orderToMove.id
            );
          state.ordersKanban[EOrderStatus.WAITING_MERCHANT_ACCEPTANCE].count--;

          // Add to IN_PREPARATION
          state.ordersKanban[EOrderStatus.IN_PREPARATION].rows.push(orderToMove);
          state.ordersKanban[EOrderStatus.IN_PREPARATION].count++;

          // Update the expanded state for IN_PREPARATION
          state.ordersKanban[EOrderStatus.IN_PREPARATION].expanded = true;
        }
      })

      .addCase(setOrderReadyForDelivery.fulfilled, (state, action) => {

        console.log('action.payload', action.payload)
        toast.success('Pedido movido para Pronto para entrega!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Remove order from IN_PREPARATION
        const orderToMove = state.ordersKanban[EOrderStatus.IN_PREPARATION].rows.find(
          order => order.id === action.payload.id
        );

        if (orderToMove) {
          // Remove from IN_PREPARATION
          state.ordersKanban[EOrderStatus.IN_PREPARATION].rows =
            state.ordersKanban[EOrderStatus.IN_PREPARATION].rows.filter(
              order => order.id !== orderToMove.id
            );
          state.ordersKanban[EOrderStatus.IN_PREPARATION].count--;

          // Add to IN_PREPARATION
          state.ordersKanban[EOrderStatus.READY_FOR_DELIVERY].rows.push(orderToMove);
          state.ordersKanban[EOrderStatus.READY_FOR_DELIVERY].count++;

          // Update the expanded state for READY_FOR_DELIVERY
          state.ordersKanban[EOrderStatus.READY_FOR_DELIVERY].expanded = true;
        }
      })

      .addCase(setOrderInDelivery.fulfilled, (state, action) => {

        console.log('action.payload', action.payload)
        toast.success('Pedido movido para Entrega!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Remove order from READY_FOR_DELIVERY
        const orderToMove = state.ordersKanban[EOrderStatus.READY_FOR_DELIVERY].rows.find(
          order => order.id === action.payload.id
        );

        if (orderToMove) {
          // Remove from READY_FOR_DELIVERY
          state.ordersKanban[EOrderStatus.READY_FOR_DELIVERY].rows =
            state.ordersKanban[EOrderStatus.READY_FOR_DELIVERY].rows.filter(
              order => order.id !== orderToMove.id
            );
          state.ordersKanban[EOrderStatus.READY_FOR_DELIVERY].count--;

          // Add to READY_FOR_DELIVERY
          state.ordersKanban[EOrderStatus.IN_DELIVERY].rows.push(orderToMove);
          state.ordersKanban[EOrderStatus.IN_DELIVERY].count++;

          // Update the expanded state for IN_DELIVERY
          state.ordersKanban[EOrderStatus.IN_DELIVERY].expanded = true;
        }
      })
  },
});

export const { selectOrder, toggleSection } = menusSlice.actions;
export default menusSlice.reducer; 