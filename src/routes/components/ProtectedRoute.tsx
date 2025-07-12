import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireToken?: boolean
  requireEnvironmentId?: boolean
}

export const ProtectedRoute = ({ 
  children, 
  requireToken = false, 
  requireEnvironmentId = false 
}: ProtectedRouteProps) => {
  // Aqui você implementaria a lógica de verificação de token e environmentId
  // Por enquanto, vou criar uma implementação básica
  const token = localStorage.getItem('token')
  const environmentId = localStorage.getItem('environmentId')

  if (requireToken && !token) {
    return <Navigate to="/login" replace />
  }

  if (requireEnvironmentId && !environmentId) {
    return <Navigate to="/select-access" replace />
  }

  return <>{children}</>
} 