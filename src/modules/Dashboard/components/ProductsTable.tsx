import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  Fade,
  Slide,
  LinearProgress
} from '@mui/material'
import {
  TrendingUp as TrendingUpIcon,
  LocalOffer as LocalOfferIcon
} from '@mui/icons-material'

interface Produto {
  id: number
  nome: string
  quantidade: number
  valor: number
  categoria: string
  imagem: string
}

interface ProductsTableProps {
  produtos: Produto[]
}

export function ProductsTable({ produtos }: ProductsTableProps) {
  const maxQuantidade = Math.max(...produtos.map(p => p.quantidade))

  return (
    <Fade in timeout={800}>
      <Box>
        <Typography variant="h6" fontWeight={600} mb={2} color="primary">
          Produtos Mais Vendidos
        </Typography>
        <TableContainer 
          component={Paper} 
          elevation={2}
          sx={{
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Produto</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Categoria</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Quantidade</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Valor</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Performance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {produtos.map((produto, index) => (
                <Slide 
                  key={produto.id} 
                  direction="up" 
                  in 
                  timeout={300 + index * 100}
                >
                  <TableRow
                    sx={{
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                        transform: 'scale(1.01)'
                      },
                      '&:nth-of-type(odd)': {
                        backgroundColor: 'background.default'
                      }
                    }}
                  >
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Typography variant="h5">
                          {produto.imagem}
                        </Typography>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {produto.nome}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ID: {produto.id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={produto.categoria}
                        size="small"
                        color="primary"
                        variant="outlined"
                        icon={<LocalOfferIcon />}
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2" fontWeight={600}>
                          {produto.quantidade}
                        </Typography>
                        <TrendingUpIcon color="success" fontSize="small" />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600} color="success.main">
                        R$ {produto.valor.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ width: '100%' }}>
                        <Box display="flex" justifyContent="space-between" mb={0.5}>
                          <Typography variant="caption" color="text.secondary">
                            {Math.round((produto.quantidade / maxQuantidade) * 100)}%
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {produto.quantidade}/{maxQuantidade}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(produto.quantidade / maxQuantidade) * 100}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: 'grey.200',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 4,
                              background: `linear-gradient(90deg, ${
                                index === 0 ? '#ff6b35' : 
                                index === 1 ? '#f7931e' : 
                                index === 2 ? '#ffd23f' : '#4caf50'
                              }, ${
                                index === 0 ? '#ff8a50' : 
                                index === 1 ? '#ffb74d' : 
                                index === 2 ? '#ffeb3b' : '#81c784'
                              })`
                            }
                          }}
                        />
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