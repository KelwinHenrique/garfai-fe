import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireMerchantId?: boolean
}

export const ProtectedRoute = ({ 
  children, 
  requireMerchantId = true
}: ProtectedRouteProps) => {
  // Aqui você implementaria a lógica de verificação de token e merchantId
  // Por enquanto, vou criar uma implementação básica
  const merchantId = localStorage.getItem('merchantId')

  if (requireMerchantId && !merchantId) {
    return <Navigate to="/select-access" replace />
  }

  return <>{children}</>
} 