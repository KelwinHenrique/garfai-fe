export enum EOrderStatus {
  'CART' = 'CART', // Carrinho, ainda não finalizado
  'PENDING_PAYMENT' = 'PENDING_PAYMENT', // Aguardando pagamento (ex: PIX, link de pagamento)
  'WAITING_MERCHANT_ACCEPTANCE' = 'WAITING_MERCHANT_ACCEPTANCE', // Pagamento confirmado (ou pedido sem pagamento online), aguardando aceite do lojista
  'IN_PREPARATION' = 'IN_PREPARATION', // Pedido em preparo na cozinha
  'READY_FOR_DELIVERY' = 'READY_FOR_DELIVERY', // Pedido pronto, aguardando início da entrega
  'IN_DELIVERY' = 'IN_DELIVERY', // Pedido saiu para entrega
  'DRIVER_ON_CLIENT' = 'DRIVER_ON_CLIENT', // Motorista está no local do cliente
  'COMPLETED' = 'COMPLETED', // Pedido entregue
  'CANCELED_BY_MERCHANT' = 'CANCELED_BY_MERCHANT', // Cancelado pelo lojista
  'CANCELED_BY_USER' = 'CANCELED_BY_USER', // Cancelado pelo cliente/usuário
  'REJECTED_BY_MERCHANT' = 'REJECTED_BY_MERCHANT', // Lojista rejeitou o pedido (alternativa a CANCELED_BY_MERCHANT)
  'PAYMENT_FAILED' = 'PAYMENT_FAILED', // Falha no pagamento
  'EXPIRED' = 'EXPIRED', // Carrinho expirado
}

export const statusLabels = {
  [EOrderStatus.WAITING_MERCHANT_ACCEPTANCE]: "Aguardando aceite",
  [EOrderStatus.IN_PREPARATION]: "Pedido em Preparo",
  [EOrderStatus.READY_FOR_DELIVERY]: "Pronto para Entrega",
  [EOrderStatus.IN_DELIVERY]: "Em Entrega",
  [EOrderStatus.DRIVER_ON_CLIENT]: "Entregador chegou no cliente",
  [EOrderStatus.COMPLETED]: "Concluído",
  [EOrderStatus.CANCELED_BY_MERCHANT]: "Cancelado pelo restaurante",
  [EOrderStatus.CANCELED_BY_USER]: "Cancelado pelo cliente",
}

export enum EOrderPaymentMethod {
  PIX = "PIX",
  CREDIT_CARD_ONLINE = "CREDIT_CARD_ONLINE",
  CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
}

export interface IOrderGarnishItem {
  id: string
  descriptionAtPurchase: string
  totalPriceForGarnishItemLine: number
  unitPriceAtPurchase: number
  quantity: number
  displayOrder: number
  catalogGarnishItemId: string
}

export interface IOrderChoice {
  id: string
  nameAtPurchase: string
  displayOrder: number
  orderGarnishItems: IOrderGarnishItem[]
}

export interface IOrderItem {
  id: string
  itemDescriptionAtPurchase: string
  logoUrlAtPurchase: string
  quantity: number
  singlePriceForItemLine: number
  totalPriceForItemLine: number
  notes: string | null
  displayOrder: number
  catalogItemId: string
  orderChoices: IOrderChoice[]
}

export interface IClient {
  id: string
  name: string | null
  sender: string
}

export interface IOrder {
  id: string
  environmentId: string
  clientId: string
  status: EOrderStatus
  totalAmount: number,
  subtotalAmount: number,
  discountAmount: number,
  deliveryFeeAmount: number,
  clientName: string | null
  clientSender: string | null
  deliveryAddressStreet: string
  deliveryAddressNumber: string
  deliveryAddressComplement: string | null
  deliveryAddressNeighborhood: string
  deliveryAddressCity: string
  deliveryAddressState: string
  deliveryAddressZipcode: string
  deliveryInstructions: string | null
  client: IClient
  orderItems: IOrderItem[]
  createdAt: string
  updatedAt: string
  acceptedAt: string | null
  readyForPickupAt: string | null
  outForDeliveryAt: string | null
  deliveredAt: string | null
  notes: string | null
  paymentMethod: EOrderPaymentMethod | null
  sentToCanceledByMerchantAt: string,
  sentToCanceledByUserAt: string,
  sentToCompletedAt: string,
  sentToDriverOnClientAt: string,
  sentToExpiredAt: string,
  sentToInDeliveryAt: string,
  sentToInPreparationAt: string,
  sentToReadyForDeliveryAt: string,
  sentToRejectedByMerchantAt: string,
  sentToWaitingMerchantAcceptanceAt: string
}
