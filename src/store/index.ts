import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import ordersReducer from '../modules/Orders/store/ordersSlice'
import kanbanReducer from '@/modules/Kanban/store/kanbanSlice'
import menusReducer from '@/modules/Menus/store/menusSlice'
import authReducer from '@/modules/Auth/store/authSlice'

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    kanban: kanbanReducer,
    menus: menusReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Hooks tipados para usar no lugar de useDispatch e useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector 