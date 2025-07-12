import { Box, Typography } from '@mui/material'


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