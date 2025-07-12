import { Box, Typography } from '@mui/material'

export const DashboardPage = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" gutterBottom>
      Dashboard
    </Typography>
    <Typography variant="body1">
      Dashboard principal do comerciante
    </Typography>
  </Box>
)

export const NotFoundPage = () => (
  <Box sx={{ p: 3, textAlign: 'center' }}>
    <Typography variant="h4" gutterBottom>
      404 - Página não encontrada
    </Typography>
    <Typography variant="body1">
      A página que você está procurando não existe.
    </Typography>
  </Box>
) 