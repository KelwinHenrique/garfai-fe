import { Card, CardContent, Typography, Chip, Box } from '@mui/material'
import { Order } from '@shared/types'

interface OrderCardProps {
  order: Order
  onClick?: () => void
}

export function OrderCard({ order, onClick }: OrderCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning'
      case 'confirmed':
        return 'info'
      case 'preparing':
        return 'primary'
      case 'ready':
        return 'success'
      case 'delivered':
        return 'default'
      case 'cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <Card 
      sx={{ 
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? { boxShadow: 3 } : {}
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="div">
            Pedido #{order.id.slice(-6)}
          </Typography>
          <Chip 
            label={order.status} 
            color={getStatusColor(order.status) as 'warning' | 'info' | 'primary' | 'success' | 'default' | 'error'}
            size="small"
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Cliente: {order.customerName}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Telefone: {order.customerPhone}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Itens: {order.items.length}
        </Typography>
        
        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
          R$ {order.total.toFixed(2)}
        </Typography>
        
        <Typography variant="caption" color="text.secondary">
          Fonte: {order.source}
        </Typography>
      </CardContent>
    </Card>
  )
} 