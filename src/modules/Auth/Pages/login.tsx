import { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  InputAdornment,
  Link,
} from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import GoogleIcon from '@mui/icons-material/Google'
import garfaiLogo from '../../../assets/garfai_logo.png'
import { baseURL } from '@/shared/services/api'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementar lógica de login aqui
    console.log('Login:', { email, password })
  }

  const handleGoogleLogin = () => {
    window.location.href = `${baseURL()}auth/google`;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
        background: 'linear-gradient(135deg, #6B73FF 0%, #A890FE 100%)',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Canto superior direito decorativo */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 80,
          height: 80,
          bgcolor: 'rgba(168,144,254,0.15)',
          borderBottomLeftRadius: 80,
        }} />
        {/* Canto inferior esquerdo decorativo */}
        <Box sx={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: 60,
          height: 60,
          bgcolor: 'rgba(168,144,254,0.15)',
          borderTopRightRadius: 60,
        }} />
        {/* Logo */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, mt: 1 }}>
          <Box
            component="img"
            src={garfaiLogo}
            alt="GarfAI Logo"
            sx={{
              height: 60,
            }}
          />
        </Box>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 2 }}>
          Sign in to your account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EmailOutlinedIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LockOutlinedIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}>
            <Link href="#" underline="none" color="#A890FE" fontSize={14} fontWeight={500}>
              Forgot password?
            </Link>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.2,
              fontWeight: 700,
              fontSize: 18,
              background: 'linear-gradient(90deg, #A890FE 0%, #2563EB 100%)',
              boxShadow: '0 4px 16px 0 rgba(80, 112, 255, 0.15)',
              textTransform: 'none',
            }}
          >
            Sign In
          </Button>
          <Divider sx={{ my: 2 }}>or continue with</Divider>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon sx={{ color: '#EA4335' }} />}
            onClick={handleGoogleLogin}
            sx={{
              background: '#fff',
              borderColor: '#E0E0E0',
              color: '#222',
              fontWeight: 600,
              textTransform: 'none',
              py: 1.1,
              mb: 1,
              '&:hover': {
                background: '#f5f5f5',
                borderColor: '#E0E0E0',
              },
            }}
          >
            Sign in with Google
          </Button>
        </Box>
        <Typography align="center" sx={{ mt: 2, fontSize: 15 }}>
          Don't have an account?{' '}
          <Link href="#" underline="none" color="#A890FE" fontWeight={600}>
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  )
}

export default LoginPage 