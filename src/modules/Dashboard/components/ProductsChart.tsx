import { Box, Typography, Paper } from '@mui/material'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface Product {
  nome: string
  quantidade: number
  valor: number
}

interface ProductsChartProps {
  produtos: Product[]
}

export function ProductsChart({ produtos }: ProductsChartProps) {
  const data = {
    labels: produtos.map(p => p.nome),
    datasets: [
      {
        label: 'Quantidade Vendida',
        data: produtos.map(p => p.quantidade),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Produtos Mais Vendidos
      </Typography>
      <Box sx={{ height: 300 }}>
        <Bar options={options} data={data} />
      </Box>
    </Paper>
  )
} 