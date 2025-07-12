# GarfAI - Portal do Comerciante

GarfAI é uma plataforma B2C brasileira similar ao iFood/DoorDash, com foco na capacidade de pedidos via WhatsApp. Este repositório contém o portal do comerciante, onde eles podem gerenciar suas lojas e pedidos.

## 🚀 Tecnologias

- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server
- **Redux Toolkit** - Gerenciamento de estado
- **Material UI** - Biblioteca de componentes
- **React Router** - Roteamento
- **ESLint + Prettier** - Linting e formatação

## 📁 Estrutura do Projeto

```
src/
├── modules/           # Módulos da aplicação
│   └── Orders/       # Exemplo de módulo
│       ├── components/
│       ├── pages/
│       ├── store/
│       ├── services/
│       └── types/
├── shared/           # Código compartilhado
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   └── utils/
├── store/            # Store principal do Redux
├── theme/            # Configuração do Material UI
└── App.tsx           # Componente raiz
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run lint` - Executa o linter
- `npm run lint:fix` - Corrige automaticamente problemas do linter
- `npm run format` - Formata o código com Prettier
- `npm run type-check` - Verifica tipos TypeScript
- `npm run preview` - Preview do build de produção

## 🎯 Funcionalidades Principais

- **Dashboard do Comerciante** - Interface para gerenciar lojas
- **Kanban de Pedidos** - Visualização e gerenciamento de pedidos
- **Gestão de Menu** - Criação e edição de produtos
- **Pedidos via WhatsApp** - Integração com WhatsApp Business API

## 🏗️ Arquitetura

O projeto segue uma arquitetura modular onde cada módulo é auto-contido:

- **Módulos**: Cada funcionalidade (Orders, Products, etc.) tem sua própria pasta
- **Componentes**: Reutilizáveis e específicos do módulo
- **Redux**: Cada módulo define seu próprio slice
- **Tipos**: TypeScript interfaces compartilhadas
- **Serviços**: Chamadas de API organizadas por módulo

## 🚀 Como Executar

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute o servidor de desenvolvimento: `npm run dev`
4. Acesse `http://localhost:5173`

## 📝 Convenções

- **Componentes**: PascalCase (`OrderCard.tsx`)
- **Hooks**: camelCase com prefixo `use` (`useOrderData`)
- **Arquivos**: PascalCase para componentes, camelCase para outros
- **Pastas**: PascalCase para módulos e componentes
- **Commits**: Seguindo [Conventional Commits](https://www.conventionalcommits.org/)

## 🔧 Configuração de Desenvolvimento

O projeto está configurado com:

- **ESLint**: Regras para React, TypeScript e Prettier
- **Prettier**: Formatação consistente do código
- **TypeScript**: Configuração estrita
- **Vite**: Aliases de importação configurados

## 📦 Dependências Principais

- `@mui/material` - Componentes Material UI
- `@reduxjs/toolkit` - Redux Toolkit
- `react-redux` - Integração React-Redux
- `react-router-dom` - Roteamento
- `@types/*` - Tipos TypeScript

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e proprietário da GarfAI.
