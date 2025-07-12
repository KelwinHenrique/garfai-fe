import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Fade,
  Slide
} from '@mui/material'
import {
  WhatsApp as WhatsAppIcon,
  Phone as PhoneIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  LocalShipping as LocalShippingIcon
} from '@mui/icons-material'

interface Pedido {
  id: string
  cliente: string
  telefone: string
  pedido: string
  valor: number
  status: string
  tempo: string
  origem: string
}

interface OrdersTableProps {
  pedidos: Pedido[]
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Em preparo':
      return 'warning'
    case 'Aguardando':
      return 'info'
    case 'Entregando':
      return 'primary'
    case 'Finalizado':
      return 'success'
    default:
      return 'default'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Em preparo':
      return <ScheduleIcon fontSize="small" />
    case 'Aguardando':
      return <ScheduleIcon fontSize="small" />
    case 'Entregando':
      return <LocalShippingIcon fontSize="small" />
    case 'Finalizado':
      return <CheckCircleIcon fontSize="small" />
    default:
      return <ScheduleIcon fontSize="small" />
  }
}

export function OrdersTable({ pedidos }: OrdersTableProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  return (
    <Fade in timeout={800}>
      <Box>
        <Typography variant="h6" fontWeight={600} mb={2} color="primary">
          Pedidos Recentes
        </Typography>
        <TableContainer 
          component={Paper} 
          elevation={2}
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            '& .MuiTableRow-root:hover': {
              backgroundColor: 'action.hover',
              transform: 'scale(1.01)',
              transition: 'all 0.2s ease-in-out'
            }
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>ID</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Cliente</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Pedido</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Valor</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Origem</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pedidos.map((pedido, index) => (
                <Slide 
                  key={pedido.id} 
                  direction="up" 
                  in 
                  timeout={300 + index * 100}
                >
                  <TableRow
                    onMouseEnter={() => setHoveredRow(pedido.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    sx={{
                      transition: 'all 0.2s ease-in-out',
                      '&:nth-of-type(odd)': {
                        backgroundColor: 'background.default'
                      }
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        #{pedido.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {pedido.cliente}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {pedido.telefone}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" noWrap maxWidth={200}>
                        {pedido.pedido}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600} color="success.main">
                        R$ {pedido.valor.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={pedido.status}
                        color={getStatusColor(pedido.status) as 'warning' | 'info' | 'primary' | 'success' | 'default'}
                        size="small"
                        icon={getStatusIcon(pedido.status)}
                        sx={{ fontWeight: 500 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        {pedido.origem === 'WhatsApp' ? (
                          <WhatsAppIcon color="success" fontSize="small" />
                        ) : (
                          <PhoneIcon color="primary" fontSize="small" />
                        )}
                        <Typography variant="caption">
                          {pedido.origem}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Tooltip title="Ver detalhes">
                          <IconButton 
                            size="small" 
                            color="primary"
                            sx={{
                              opacity: hoveredRow === pedido.id ? 1 : 0.7,
                              transition: 'opacity 0.2s ease-in-out'
                            }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        {pedido.origem === 'WhatsApp' && (
                          <Tooltip title="Abrir chat">
                            <IconButton 
                              size="small" 
                              color="success"
                              sx={{
                                opacity: hoveredRow === pedido.id ? 1 : 0.7,
                                transition: 'opacity 0.2s ease-in-out'
                              }}
                            >
                              <WhatsAppIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                </Slide>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Fade>
  )
} 