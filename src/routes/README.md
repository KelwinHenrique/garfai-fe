# Sistema de Rotas - GarfAI

Este arquivo documenta o sistema de rotas implementado para o portal do comerciante GarfAI.

## Estrutura de Arquivos

```
src/routes/
├── index.tsx              # Arquivo principal de rotas (limpo)
├── lazyComponents.ts      # Lazy loading dos componentes
├── components/
│   ├── index.ts          # Exportações centralizadas
│   ├── ProtectedRoute.tsx # Componente de proteção de rotas
│   ├── LoadingSpinner.tsx # Componente de loading
│   └── TempPages.tsx     # Páginas temporárias
└── README.md             # Esta documentação
```

## Estrutura de Rotas

O sistema de rotas está organizado em três grupos principais:

### 1. Rotas Abertas (Open Routes)
Rotas que não requerem autenticação:
- `/login` - Página de login
- `/register` - Página de registro
- `/forgot-password` - Recuperação de senha

### 2. Rotas Parciais (Partial Routes)
Rotas que requerem apenas token de autenticação:
- `/select-access` - Seleção de loja/ambiente
- `/setup-store` - Configuração inicial da loja

### 3. Rotas Fechadas (Closed Routes)
Rotas que requerem token e environmentId:
- `/dashboard` - Dashboard principal
- `/orders` - Gerenciamento de pedidos
- `/profile` - Perfil do usuário
- `/menu` - Gerenciamento do menu
- `/analytics` - Relatórios e análises

## Arquivo Principal (`index.tsx`)

O arquivo principal agora está muito mais limpo e focado apenas nas definições de rotas:

```typescript
export const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas abertas */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Rotas parciais */}
      <Route path="/select-access" element={
        <ProtectedRoute requireToken={true}>
          <SelectAccessPage />
        </ProtectedRoute>
      } />
      
      {/* Rotas fechadas */}
      <Route path="/dashboard" element={
        <ProtectedRoute requireToken={true} requireEnvironmentId={true}>
          <DashboardPage />
        </ProtectedRoute>
      } />
    </Routes>
  )
}
```

## Componentes Separados

### `ProtectedRoute.tsx`
Responsável pela verificação de permissões de acesso:
- Verifica token de autenticação
- Verifica environmentId
- Redireciona automaticamente se necessário

### `LoadingSpinner.tsx`
Componente de loading reutilizável para Suspense

### `TempPages.tsx`
Páginas temporárias enquanto as reais não são desenvolvidas:
- ProfilePage
- DashboardPage
- RegisterPage
- ForgotPasswordPage
- SetupStorePage
- MenuPage
- AnalyticsPage
- NotFoundPage

### `lazyComponents.ts`
Centraliza todos os imports lazy loading:
```typescript
export const LoginPage = lazy(() => import('../modules/Auth/Pages/login'))
export const SelectAccessPage = lazy(() => import('../modules/Auth/Pages/selectAccess'))
export const OrdersPage = lazy(() => import('../modules/Orders/pages/OrdersPage'))
```

## Vantagens da Nova Estrutura

1. **Separação de Responsabilidades**: Cada arquivo tem uma função específica
2. **Manutenibilidade**: Fácil de encontrar e modificar componentes
3. **Reutilização**: Componentes podem ser reutilizados em outros lugares
4. **Legibilidade**: Arquivo principal focado apenas nas rotas
5. **Escalabilidade**: Fácil adicionar novas rotas e componentes

## Como Adicionar Novas Rotas

### 1. Adicionar lazy component em `lazyComponents.ts`:
```typescript
export const NovaPagina = lazy(() => import('../modules/NovoModulo/pages/NovaPagina'))
```

### 2. Adicionar rota em `index.tsx`:
```typescript
<Route path="/nova-rota" element={
  <ProtectedRoute requireToken={true} requireEnvironmentId={true}>
    <Suspense fallback={<LoadingSpinner />}>
      <NovaPagina />
    </Suspense>
  </ProtectedRoute>
} />
```

## Estado de Autenticação

O sistema utiliza localStorage para gerenciar o estado de autenticação:
- `token`: Token de autenticação do usuário
- `environmentId`: ID do ambiente/loja selecionada

## Fluxo de Navegação

1. **Usuário não autenticado** → `/login`
2. **Usuário autenticado sem loja** → `/select-access`
3. **Usuário autenticado com loja** → `/dashboard` 