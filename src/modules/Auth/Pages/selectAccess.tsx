import { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Button,
  Avatar
} from '@mui/material'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import StorefrontIcon from '@mui/icons-material/Storefront'
import BarChartIcon from '@mui/icons-material/BarChart'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

interface IOrganization {
  id: string
  name: string
  role: string
  users: number
  color: string
  icon: React.ReactNode
}

const organizations: IOrganization[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    role: 'Administrador',
    users: 12,
    color: '#4F8CFF',
    icon: <RocketLaunchIcon fontSize="large" />,
  },
  {
    id: '2',
    name: 'StartupHub Inc',
    role: 'Editor',
    users: 5,
    color: '#3DC97B',
    icon: <StorefrontIcon fontSize="large" />,
  },
  {
    id: '3',
    name: 'Analytics Pro',
    role: 'Visualizador',
    users: 25,
    color: '#8B4FFF',
    icon: <BarChartIcon fontSize="large" />,
  },
  {
    id: '4',
    name: 'E-commerce Plus',
    role: 'Gerente',
    users: 8,
    color: '#FF8C4F',
    icon: <ShoppingCartIcon fontSize="large" />,
  },
]

export function SelectAccessPage() {
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null)

  const handleSelect = (orgId: string) => {
    setSelectedOrg(orgId)
    localStorage.setItem('organizationId', orgId)
  }

  const handleContinue = () => {
    if (selectedOrg) {
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
        p: 3,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom align="center" fontWeight={700}>
        Selecione sua Loja 🏘️
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Escolha o ambiente onde deseja gerenciar
      </Typography>
      <Grid container spacing={2} sx={{ maxWidth: 480, mb: 3 }}>
        {organizations.map((org) => (
          <Grid component="div" size={{ xs: 12 }} key={org.id}>
            <Card
              sx={{
                border: selectedOrg === org.id ? 2 : 1,
                borderColor: selectedOrg === org.id ? 'primary.main' : 'divider',
                boxShadow: selectedOrg === org.id ? 4 : 1,
                borderRadius: 3,
                transition: '0.2s',
                cursor: 'pointer',
              }}
            >
              <CardActionArea onClick={() => handleSelect(org.id)}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
                  <Avatar sx={{ bgcolor: org.color, width: 48, height: 48 }}>
                    {org.icon}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {org.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {org.role}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {org.users} usuários ativos
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        {/* Card para criar nova organização */}
        <Grid component="div" size={{ xs: 12 }}>
          <Card
            sx={{
              border: '1px dashed',
              borderColor: 'divider',
              background: 'transparent',
              boxShadow: 'none',
              borderRadius: 3,
              cursor: 'pointer',
              transition: '0.2s',
              '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
            }}
          >
            <CardActionArea onClick={() => alert('Funcionalidade de criar nova organização!')}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
                <Avatar sx={{ bgcolor: 'background.paper', color: 'primary.main', border: '1px solid', borderColor: 'primary.main', width: 48, height: 48 }}>
                  <AddCircleOutlineIcon fontSize="large" />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} color="primary.main">
                    Criar Nova Organização
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Configure um novo ambiente
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SelectAccessPage 