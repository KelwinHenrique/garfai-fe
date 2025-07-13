import { useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Avatar
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import StorefrontIcon from '@mui/icons-material/Storefront'
import { useNavigate } from 'react-router-dom'
import { fetchMyUserAccess } from '../store/authRequests'
import { useAppDispatch, useAppSelector } from '@/store'
import { setSelectedAccess } from '../store/authSlice'
import { IUserAccessPopulated } from '../types/IUserAccess'

// Função para gerar as iniciais do nome da loja
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Função para gerar uma cor baseada no nome da loja
const getColorFromName = (name: string): string => {
  const colors = [
    '#4F8CFF', // Azul
    '#FF6B6B', // Vermelho
    '#4ECDC4', // Verde água
    '#45B7D1', // Azul claro
    '#96CEB4', // Verde claro
    '#FFEAA7', // Amarelo
    '#DDA0DD', // Roxo claro
    '#98D8C8', // Verde menta
    '#F7DC6F', // Amarelo dourado
    '#BB8FCE', // Roxo
    '#85C1E9', // Azul céu
    '#F8C471', // Laranja
    '#82E0AA', // Verde
    '#F1948A', // Rosa
    '#85C1E9', // Azul
  ]

  const hash = name.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc)
  }, 0)

  return colors[Math.abs(hash) % colors.length]
}

export function SelectAccessPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const userAccess = useAppSelector((state) => state.auth.userAccess)

  const handleSelect = (access: IUserAccessPopulated) => {
    localStorage.setItem('environmentId', access.environment.id)
    dispatch(setSelectedAccess(access))
    navigate('/dashboard')
  }

  useEffect(() => {
    dispatch(fetchMyUserAccess())
  }, [])

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
        {!!userAccess && userAccess.length > 0 && userAccess?.map((access) => (
          <Grid component="div" size={{ xs: 12 }} key={access.id}>
            <Card
              sx={{
                border: 1,
                borderColor: 'divider',
                boxShadow: 1,
                borderRadius: 3,
                transition: '0.2s',
                cursor: 'pointer',
              }}
            >
              <CardActionArea onClick={() => handleSelect(access)}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: access.environment.logoUrl ? 'transparent' : getColorFromName(access.environment.name),
                      border: access.environment.logoUrl ? '1px solid' : 'none',
                      borderColor: 'divider'
                    }}
                    src={access.environment.logoUrl ? `https://static.ifood-static.com.br/image/upload/t_thumbnail/logosgde/${access.environment.logoUrl}` : undefined}
                  >
                    {!access.environment.logoUrl && (
                      access.environment.name ? getInitials(access.environment.name) : <StorefrontIcon />
                    )}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {access.environment.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {access.role}
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