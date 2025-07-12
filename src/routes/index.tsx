import { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Componentes de proteção e loading
import { ProtectedRoute, LoadingSpinner, NotFoundPage, DashboardPage } from './components'

// Lazy components
import { LoginPage, SelectAccessPage, OrdersPage } from './lazyComponents'
import { SelectAccessRoute } from './components/SelectAccessRoute'

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

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Suspense fallback={<LoadingSpinner />}>
            <DashboardPage />
          </Suspense>
        </ProtectedRoute>
      } />
      
      {/* Rota padrão - redireciona baseado no estado de autenticação */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Rota 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes 