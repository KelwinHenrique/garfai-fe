import { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Componentes de proteção e loading
import { ProtectedRoute, LoadingSpinner, NotFoundPage } from './components'

// Lazy components
import { LoginPage, SelectAccessPage, OrdersPage } from './lazyComponents'
import { SelectAccessRoute } from './components/SelectAccessRoute'
import { dashboardRoutes } from '@/modules/Dashboard/dashboard.routes'
import { kanbanRoutes } from '@/modules/Kanban/kanban.routes'

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas abertas (não precisam de autenticação) */}
      <Route path="/login" element={
        <Suspense fallback={<LoadingSpinner />}>
          <LoginPage />
        </Suspense>
      } />
      
      
      {/* Rotas parciais (precisam de token) */}
      <Route path="/select-access" element={
        <SelectAccessRoute>
          <Suspense fallback={<LoadingSpinner />}>
            <SelectAccessPage />
          </Suspense>
        </SelectAccessRoute>
      } />
     
      <Route path="/orders" element={
        <ProtectedRoute>
          <Suspense fallback={<LoadingSpinner />}>
            <OrdersPage />
          </Suspense>
        </ProtectedRoute>
      } />

      {/* Rotas do Dashboard (modular) */}
      {dashboardRoutes.map(route => (
        <Route key={route.path} path={route.path} element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              {route.element}
            </Suspense>
          </ProtectedRoute>
        } />
      ))}

      {kanbanRoutes.map(route => (
        <Route key={route.path} path={route.path} element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              {route.element}
            </Suspense>
          </ProtectedRoute>
        } />
      ))}

      {/* Rota padrão - redireciona baseado no estado de autenticação */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Rota 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes 