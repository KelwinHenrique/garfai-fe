import { Grid, Typography, Container } from '@mui/material'
import { dashboardMock } from '../mocks/dashboardMock'
import { IndicatorCard } from '../components/IndicatorCard'
import { ProductsTable } from '../components/ProductsTable'
import { ProductsChart } from '../components/ProductsChart'
import { CategoryChart } from '../components/CategoryChart'
import { RevenueChart } from '../components/RevenueChart'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

export function DashboardPage() {

  return (
    <Container maxWidth="xl">
      {/* Indicadores */}
      <Grid container spacing={2} mb={4}>
        <Grid size={{xs: 12, sm:6, md:3 }} component="div">
          <IndicatorCard title="Clientes (WhatsApp)" value={dashboardMock.clientesContato} icon={<WhatsAppIcon color="success" />} color="#25D366" />
        </Grid>
        <Grid size={{xs: 12, sm:6, md:3 }} component="div">
          <IndicatorCard title="Vendas" value={dashboardMock.vendas} icon={<ShoppingCartIcon color="primary" />} color="#1976d2" />
        </Grid>
        <Grid size={{xs: 12, sm:6, md:3 }} component="div">
          <IndicatorCard title="Faturamento Hoje" value={`R$ ${dashboardMock.faturamentoHoje.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} icon={<AttachMoneyIcon color="success" />} color="#43a047" />
        </Grid>
        <Grid size={{xs: 12, sm:6, md:3 }} component="div">
          <IndicatorCard title="Faturamento Semana" value={`R$ ${dashboardMock.faturamentoSemana.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} icon={<AttachMoneyIcon color="secondary" />} color="#9c27b0" />
        </Grid>
      </Grid>

      {/* Tab Panels */}
      {/* <TabPanel value={tabValue} index={0}>
        <OrdersTable pedidos={dashboardMock.pedidos} />
      </TabPanel> */}

      {/* <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid size={{xs: 12, md: 4}} component="div">
            <ChatList 
              chats={dashboardMock.chats} 
              onChatSelect={handleChatSelect}
            />
          </Grid>
          <Grid size={{xs: 12, md: 8}} component="div">
            {selectedChat && selectedChatData ? (
              <ChatMessages
                chatId={selectedChat}
                mensagens={dashboardMock.mensagens}
                clienteNome={selectedChatData.cliente}
                onSendMessage={handleSendMessage}
              />
            ) : (
              <Box 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                height={400}
                sx={{ 
                  backgroundColor: 'grey.50', 
                  borderRadius: 2,
                  border: '2px dashed',
                  borderColor: 'grey.300'
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  Selecione um chat para começar a conversar
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </TabPanel> */}

      {/* Gráficos */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{xs: 12, md: 6}} component="div">
        <RevenueChart 
            data={{
              labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
              datasets: [
                {
                  label: 'Faturamento (R$)',
                  data: [1200, 1350, 980, 1450, 1800, 2200, 1600],
                  borderColor: 'rgb(75, 192, 192)',
                  backgroundColor: 'rgba(75, 192, 192, 0.5)',
                },
              ],
            }}
          />
        </Grid>
        <Grid size={{xs: 12, md: 6}} component="div">
          <CategoryChart produtos={dashboardMock.produtosVendidos} />
        </Grid>
      </Grid>

      {/* Gráfico de faturamento
      <Grid container spacing={3} mb={4}>
        <Grid size={{xs: 12}} component="div">
          <RevenueChart 
            data={{
              labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
              datasets: [
                {
                  label: 'Faturamento (R$)',
                  data: [1200, 1350, 980, 1450, 1800, 2200, 1600],
                  borderColor: 'rgb(75, 192, 192)',
                  backgroundColor: 'rgba(75, 192, 192, 0.5)',
                },
              ],
            }}
          />
        </Grid>
      </Grid> */}

      {/* Tabela de produtos */}
      <ProductsTable produtos={dashboardMock.produtosVendidos} />
    </Container>
  )
}

export default DashboardPage 