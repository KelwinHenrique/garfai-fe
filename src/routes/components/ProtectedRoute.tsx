import { Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { Sidebar } from '@/shared/components/Sidebar'
import { Topbar } from '@/shared/components/Topbar'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireMerchantId?: boolean
}

export const ProtectedRoute = ({ 
  children,
}: ProtectedRouteProps) => {
  // Aqui você implementaria a lógica de verificação de token e merchantId
  // Por enquanto, vou criar uma implementação básica
  const merchantId = localStorage.getItem('merchantId')

  if (!merchantId) {
    return <Navigate to="/select-access" replace />
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        minHeight: '100vh'
      }}>
        <Topbar />
        <Box component="main" sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#f5f5f5',
          minHeight: 'calc(100vh - 64px)'
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
} 