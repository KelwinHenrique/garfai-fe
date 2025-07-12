import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/index'
import { theme } from './theme/index'
import { Layout } from './shared/components/Layout'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Layout>
            <div>
              <h1>Bem-vindo ao GarfAI</h1>
              <p>Portal do Comerciante</p>
            </div>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default App
