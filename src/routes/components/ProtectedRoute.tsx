import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireToken?: boolean
  requireMerchantId?: boolean
}

export const ProtectedRoute = ({ 
  children, 
  requireToken = true,
  requireMerchantId = true
}: ProtectedRouteProps) => {
  // Aqui você implementaria a lógica de verificação de token e merchantId
  // Por enquanto, vou criar uma implementação básica
  const token = localStorage.getItem('token')
  const merchantId = localStorage.getItem('merchantId')

  if (requireToken && !token) {
    return <Navigate to="/login" replace />
  }

  if (requireMerchantId && !merchantId) {
    return <Navigate to="/select-access" replace />
  }

  return <>{children}</>
} 