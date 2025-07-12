import { useState } from 'react'
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardActionArea,
  Grid,
  Button 
} from '@mui/material'
import { Store, Business } from '@mui/icons-material'

interface Store {
  id: string
  name: string
  type: 'restaurant' | 'market' | 'pharmacy'
}

export function SelectAccessPage() {
  const [selectedStore, setSelectedStore] = useState<string | null>(null)

  // Mock data - substituir por dados reais da API
  const stores: Store[] = [
    { id: '1', name: 'Restaurante do João', type: 'restaurant' },
    { id: '2', name: 'Mercado Central', type: 'market' },
    { id: '3', name: 'Farmácia Popular', type: 'pharmacy' }
  ]

  const handleStoreSelect = (storeId: string) => {
    setSelectedStore(storeId)
    // Salvar environmentId no localStorage
    localStorage.setItem('environmentId', storeId)
  }

  const handleContinue = () => {
    if (selectedStore) {
      // Redirecionar para o dashboard
      window.location.href = '/dashboard'
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: 3
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Selecione sua Loja
      </Typography>
      
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Escolha qual loja você deseja gerenciar
      </Typography>

      <Grid container spacing={3} sx={{ maxWidth: 800, mb: 4 }}>
        {stores.map((store) => (
          <Grid item xs={12} sm={6} md={4} key={store.id}>
            <Card 
              sx={{ 
                height: '100%',
                border: selectedStore === store.id ? 2 : 1,
                borderColor: selectedStore === store.id ? 'primary.main' : 'divider'
              }}
            >
              <CardActionArea 
                onClick={() => handleStoreSelect(store.id)}
                sx={{ height: '100%' }}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  {store.type === 'restaurant' ? (
                    <Store sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  ) : (
                    <Business sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  )}
                  
                  <Typography variant="h6" component="h2" gutterBottom>
                    {store.name}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    {store.type === 'restaurant' ? 'Restaurante' : 
                     store.type === 'market' ? 'Mercado' : 'Farmácia'}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        size="large"
        onClick={handleContinue}
        disabled={!selectedStore}
        sx={{ minWidth: 200 }}
      >
        Continuar
      </Button>
    </Box>
  )
}

export default SelectAccessPage 