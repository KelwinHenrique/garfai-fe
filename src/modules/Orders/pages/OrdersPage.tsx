import { useEffect } from 'react'
import { Typography, Box, CircularProgress, Alert } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../store/index'
import { RootState } from '../../../store/index'

export function OrdersPage() {
  const dispatch = useAppDispatch()
  const { orders, loading, error } = useAppSelector((state: RootState) => state.orders)

  useEffect(() => {
    // dispatch(fetchOrders({ page: 1, limit: 10 }))
  }, [dispatch])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    )
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Pedidos
      </Typography>
      
      {orders.length === 0 && (
        <Typography variant="body1" color="text.secondary">
          Nenhum pedido encontrado.
        </Typography>
      )}
    </Box>
  )
}

export default OrdersPage 