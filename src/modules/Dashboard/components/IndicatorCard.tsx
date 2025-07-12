import { Card, CardContent, Typography, Box, useTheme } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

interface IndicatorCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  color?: string
  growthPercent?: string // Novo: crescimento percentual opcional
}

export function IndicatorCard({ title, value, icon, color, growthPercent }: IndicatorCardProps) {
  const theme = useTheme()
  return (
    <Card
      sx={{
        minWidth: 220,
        boxShadow: 2,
        borderRadius: 2,
        p: 0,
        borderLeft: color ? `6px solid ${color}` : undefined,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 110,
      }}
    >
      <CardContent sx={{ flex: 1, p: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight={700} sx={{ lineHeight: 1 }}>
          {value}
        </Typography>
        {growthPercent && (
          <Box display="flex" alignItems="center" mt={0.5}>
            <ArrowUpwardIcon fontSize="small" sx={{ color: theme.palette.success.main, mr: 0.5 }} />
            <Typography variant="body2" color={theme.palette.success.main} fontWeight={600}>
              {growthPercent} from last month
            </Typography>
          </Box>
        )}
      </CardContent>
      {icon && (
        <Box
          sx={{
            mr: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: color ? `${color}22` : theme.palette.action.hover,
          }}
        >
          {icon}
        </Box>
      )}
    </Card>
  )
} 