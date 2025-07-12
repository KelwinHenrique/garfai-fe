import { lazy } from 'react'

// Lazy loading dos componentes
export const LoginPage = lazy(() => import('../modules/Auth/Pages/login'))
export const SelectAccessPage = lazy(() => import('../modules/Auth/Pages/selectAccess'))
export const OrdersPage = lazy(() => import('../modules/Orders/pages/OrdersPage')) 