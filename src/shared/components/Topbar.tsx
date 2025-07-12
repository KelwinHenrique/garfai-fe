import { AppBar, Toolbar, Typography, Box, Avatar, Breadcrumbs, Link as MuiLink, IconButton, Badge } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useLocation, Link as RouterLink } from 'react-router-dom'
import { useMemo } from 'react'

function getBreadcrumbs(pathname: string) {
  const pathnames = pathname.split('/').filter((x) => x)
  return pathnames.map((value, index) => {
    const to = '/' + pathnames.slice(0, index + 1).join('/')
    return { label: value.charAt(0).toUpperCase() + value.slice(1), to }
  })
}

export function Topbar() {
  const location = useLocation()
  const breadcrumbs = useMemo(() => getBreadcrumbs(location.pathname), [location.pathname])
  // Mock do usuário logado
  const user = { name: 'João Silva', role: 'Admin' }

  return (
    <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: '1.5px solid #e0e4f6', minHeight: 64, zIndex: 1101 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 64, px: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h6" fontWeight={700} color="#23235F" sx={{ mb: 0.2 }}>
            Dashboard
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: 13 }}>
            <MuiLink component={RouterLink} underline="hover" color="inherit" to="/dashboard">
              Home
            </MuiLink>
            {breadcrumbs.map((crumb, idx) => (
              <MuiLink
                key={crumb.to}
                component={RouterLink}
                underline={idx === breadcrumbs.length - 1 ? 'none' : 'hover'}
                color={idx === breadcrumbs.length - 1 ? 'text.primary' : 'inherit'}
                to={crumb.to}
              >
                {crumb.label}
              </MuiLink>
            ))}
          </Breadcrumbs>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton size="large" sx={{ mr: 1 }}>
            <Badge variant="dot" color="error" overlap="circular" anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>{user.name[0]}</Avatar>
            <Box sx={{ ml: 0.5 }}>
              <Typography variant="subtitle2" fontWeight={600} sx={{ lineHeight: 1 }}>{user.name}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1 }}>{user.role}</Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
} 