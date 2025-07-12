import { Box, Typography, Paper } from '@mui/material'
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

interface Product {
  nome: string
  quantidade: number
  valor: number
  categoria: string
}

interface CategoryChartProps {
  produtos: Product[]
}

export function CategoryChart({ produtos }: CategoryChartProps) {
  // Agrupar produtos por categoria
  const categorias = produtos.reduce((acc, produto) => {
    const categoria = produto.categoria
    if (!acc[categoria]) {
      acc[categoria] = {
        quantidade: 0,
        valor: 0
      }
    }
    acc[categoria].quantidade += produto.quantidade
    acc[categoria].valor += produto.valor * produto.quantidade
    return acc
  }, {} as Record<string, { quantidade: number; valor: number }>)

  // Cores mais harmoniosas e modernas
  const colors = [
    '#6366f1', // Indigo
    '#8b5cf6', // Violet
    '#06b6d4', // Cyan
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#ef4444', // Red
    '#84cc16', // Lime
    '#f97316', // Orange
  ]

  const data = {
    labels: Object.keys(categorias),
    datasets: [
      {
        data: Object.values(categorias).map(cat => cat.valor),
        backgroundColor: colors.slice(0, Object.keys(categorias).length),
        borderColor: colors.slice(0, Object.keys(categorias).length).map(color => 
          color.replace('0.8', '1')
        ),
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverOffset: 8,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
              legend: {
          position: 'bottom' as const,
          labels: {
            padding: 20,
            usePointStyle: true,
            pointStyle: 'circle',
            font: {
              size: 12,
            },
            color: '#374151',
          },
        },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: { label?: string; parsed: number }) {
            const label = context.label || ''
            const value = context.parsed
            const total = Object.values(categorias).reduce((sum, cat) => sum + cat.valor, 0)
            const percentage = ((value / total) * 100).toFixed(1)
            return `${label}: R$ ${value.toFixed(2)} (${percentage}%)`
          }
        }
      }
    },
  }

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        height: '100%',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid #e2e8f0',
        borderRadius: 3,
        '&:hover': {
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          transform: 'translateY(-2px)',
          transition: 'all 0.3s ease-in-out',
        },
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          fontWeight: 600,
          color: '#1f2937',
          mb: 3,
          fontSize: '1.125rem',
          letterSpacing: '-0.025em',
        }}
      >
        Faturamento por Categoria
      </Typography>
      <Box sx={{ height: 320, position: 'relative' }}>
        <Pie options={options} data={data} />
      </Box>
    </Paper>
  )
} 