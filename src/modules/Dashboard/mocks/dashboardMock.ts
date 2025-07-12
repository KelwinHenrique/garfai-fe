// Mock de dados para o Dashboard do GarfAI

export const dashboardMock = {
  clientesContato: 34,
  vendas: 18,
  faturamentoHoje: 1250.50,
  faturamentoSemana: 8450.75,
  pedidosAndamento: 5,
  pedidosFinalizados: 13,
  ticketMedio: 69.47,
  produtosMaisVendidos: [
    { nome: 'Pizza Calabresa', quantidade: 12 },
    { nome: 'Hambúrguer Artesanal', quantidade: 9 },
    { nome: 'Refrigerante Lata', quantidade: 20 }
  ],
  tempoMedioResposta: '2m 15s',
  avaliacaoMedia: 4.8,
  
  // Dados para tabela de pedidos
  pedidos: [
    {
      id: '001',
      cliente: 'Maria Silva',
      telefone: '+55 11 99999-1111',
      pedido: 'Pizza Calabresa + Refri',
      valor: 45.90,
      status: 'Em preparo',
      tempo: '15:30',
      origem: 'WhatsApp'
    },
    {
      id: '002',
      cliente: 'João Santos',
      telefone: '+55 11 99999-2222',
      pedido: 'Hambúrguer Artesanal + Batata',
      valor: 32.50,
      status: 'Aguardando',
      tempo: '15:25',
      origem: 'WhatsApp'
    },
    {
      id: '003',
      cliente: 'Ana Costa',
      telefone: '+55 11 99999-3333',
      pedido: 'Pizza Margherita + Suco',
      valor: 38.90,
      status: 'Entregando',
      tempo: '15:20',
      origem: 'App'
    },
    {
      id: '004',
      cliente: 'Pedro Lima',
      telefone: '+55 11 99999-4444',
      pedido: 'Combo Família',
      valor: 89.90,
      status: 'Finalizado',
      tempo: '15:15',
      origem: 'WhatsApp'
    },
    {
      id: '005',
      cliente: 'Carla Oliveira',
      telefone: '+55 11 99999-5555',
      pedido: 'Pizza 4 Queijos',
      valor: 42.50,
      status: 'Em preparo',
      tempo: '15:10',
      origem: 'WhatsApp'
    }
  ],

  // Dados para chat
  chats: [
    {
      id: 'chat1',
      cliente: 'Maria Silva',
      telefone: '+55 11 99999-1111',
      ultimaMensagem: 'Obrigada! Pedido recebido 😊',
      tempo: '15:30',
      status: 'online' as const,
      unread: 0,
      pedidoAtivo: '001'
    },
    {
      id: 'chat2',
      cliente: 'João Santos',
      telefone: '+55 11 99999-2222',
      ultimaMensagem: 'Quanto tempo demora para entregar?',
      tempo: '15:25',
      status: 'online' as const,
      unread: 1,
      pedidoAtivo: '002'
    },
    {
      id: 'chat3',
      cliente: 'Ana Costa',
      telefone: '+55 11 99999-3333',
      ultimaMensagem: 'Pode adicionar mais queijo na pizza?',
      tempo: '15:20',
      status: 'offline' as const,
      unread: 0,
      pedidoAtivo: '003'
    },
    {
      id: 'chat4',
      cliente: 'Pedro Lima',
      telefone: '+55 11 99999-4444',
      ultimaMensagem: 'Pedido entregue com sucesso!',
      tempo: '15:15',
      status: 'offline' as const,
      unread: 0,
      pedidoAtivo: null
    },
    {
      id: 'chat5',
      cliente: 'Carla Oliveira',
      telefone: '+55 11 99999-5555',
      ultimaMensagem: 'Tem promoção hoje?',
      tempo: '15:10',
      status: 'online' as const,
      unread: 2,
      pedidoAtivo: '005'
    }
  ],

  // Dados para mensagens do chat
  mensagens: [
    {
      id: 'msg1',
      chatId: 'chat2',
      remetente: 'cliente' as const,
      mensagem: 'Quanto tempo demora para entregar?',
      tempo: '15:25',
      status: 'enviada'
    },
    {
      id: 'msg2',
      chatId: 'chat2',
      remetente: 'loja' as const,
      mensagem: 'Olá! Em média 30-40 minutos. Seu pedido está sendo preparado! 🍕',
      tempo: '15:26',
      status: 'enviada'
    },
    {
      id: 'msg3',
      chatId: 'chat3',
      remetente: 'cliente' as const,
      mensagem: 'Pode adicionar mais queijo na pizza?',
      tempo: '15:20',
      status: 'enviada'
    },
    {
      id: 'msg4',
      chatId: 'chat3',
      remetente: 'loja' as const,
      mensagem: 'Claro! Vou anotar para adicionar extra de queijo. +R$ 3,00',
      tempo: '15:21',
      status: 'enviada'
    },
    {
      id: 'msg5',
      chatId: 'chat5',
      remetente: 'cliente' as const,
      mensagem: 'Tem promoção hoje?',
      tempo: '15:10',
      status: 'enviada'
    },
    {
      id: 'msg6',
      chatId: 'chat5',
      remetente: 'loja' as const,
      mensagem: 'Sim! Pizza grande + refrigerante por R$ 39,90! 🎉',
      tempo: '15:11',
      status: 'enviada'
    },
    {
      id: 'msg7',
      chatId: 'chat5',
      remetente: 'cliente' as const,
      mensagem: 'Perfeito! Quero uma pizza calabresa então!',
      tempo: '15:12',
      status: 'enviada'
    }
  ],

  // Dados para produtos mais vendidos
  produtosVendidos: [
    {
      id: 1,
      nome: 'Pizza Calabresa',
      quantidade: 12,
      valor: 45.90,
      categoria: 'Pizzas',
      imagem: '🍕'
    },
    {
      id: 2,
      nome: 'Hambúrguer Artesanal',
      quantidade: 9,
      valor: 32.50,
      categoria: 'Lanches',
      imagem: '🍔'
    },
    {
      id: 3,
      nome: 'Refrigerante Lata',
      quantidade: 20,
      valor: 6.50,
      categoria: 'Bebidas',
      imagem: '🥤'
    },
    {
      id: 4,
      nome: 'Pizza Margherita',
      quantidade: 8,
      valor: 42.50,
      categoria: 'Pizzas',
      imagem: '🍕'
    },
    {
      id: 5,
      nome: 'Batata Frita',
      quantidade: 15,
      valor: 12.90,
      categoria: 'Acompanhamentos',
      imagem: '🍟'
    }
  ]
} 