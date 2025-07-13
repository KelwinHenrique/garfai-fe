import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, Toolbar, Divider } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ListAltIcon from '@mui/icons-material/ListAlt'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppDispatch } from '@/store'
import { logout } from '@/modules/Auth/store/authSlice'

const drawerWidth = 220

const mainNavItems = [
  { label: 'Dashboard', icon: <DashboardIcon fontSize="small" />, path: '/dashboard' },
  { label: 'Kanban', icon: <ListAltIcon fontSize="small" />, path: '/kanban' },
  { label: 'Menus', icon: <RestaurantMenuIcon fontSize="small" />, path: '/menus' },
]

const supportNavItems = [
  { label: 'Ajuda & Suporte', icon: <HelpOutlineIcon fontSize="small" />, path: '/help' },
]

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    // Limpa o reducer de autenticação
    dispatch(logout())

    // Remove o environmentId do localStorage
    localStorage.removeItem('environmentId')

    // Navega para a página de login
    navigate('/login')
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid #e5e7eb',
          px: 1,
        },
      }}
    >
      <Toolbar sx={{ minHeight: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
      </Toolbar>
      <List sx={{ mt: 1 }}>
        {mainNavItems.map((item) => (
          <ListItemButton
            key={item.path}
            selected={location.pathname.startsWith(item.path)}
            onClick={() => navigate(item.path)}
            sx={{
              borderRadius: 2,
              mx: 0.5,
              my: 0.5,
              minHeight: 40,
              backgroundColor: location.pathname.startsWith(item.path) ? '#6366f2 !important' : '#fff',
              '& .MuiListItemIcon-root': {
                color: location.pathname.startsWith(item.path) ? '#fff' : '#7b809a',
              },
              '& .MuiListItemText-primary': {
                color: location.pathname.startsWith(item.path) ? '#fff' : '#222',
                fontWeight: location.pathname.startsWith(item.path) ? 600 : 500,
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 32, color: '#7b809a' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 15, fontWeight: 500, color: '#222' }} />
          </ListItemButton>
        ))}
      </List>
      <Divider sx={{ my: 1, mx: 1 }} />
      <List>
        {supportNavItems.map((item) => (
          <ListItemButton
            key={item.path}
            selected={location.pathname.startsWith(item.path)}
            onClick={() => navigate(item.path)}
            sx={{
              borderRadius: 2,
              mx: 0.5,
              my: 0.5,
              minHeight: 40,
              bgcolor: location.pathname.startsWith(item.path) ? '#6366f1' : '#fff',
              '& .MuiListItemIcon-root': {
                color: location.pathname.startsWith(item.path) ? '#fff' : '#7b809a',
              },
              '& .MuiListItemText-primary': {
                color: location.pathname.startsWith(item.path) ? '#fff' : '#222',
                fontWeight: location.pathname.startsWith(item.path) ? 600 : 500,
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 32, color: '#7b809a' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 15, fontWeight: 500, color: '#222' }} />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider sx={{ my: 1, mx: 1 }} />
      <List>
        <ListItemButton key="logout" onClick={handleLogout} sx={{ borderRadius: 2, mx: 0.5, my: 0.5, minHeight: 40 }}>
          <ListItemIcon sx={{ minWidth: 32, color: '#e57373' }}><LogoutIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Sair" primaryTypographyProps={{ fontSize: 15, fontWeight: 500, color: '#e57373' }} />
        </ListItemButton>
      </List>
    </Drawer>
  )
} 