"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Button,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
} from "@mui/material"
import {
  LocationOn as LocationOnIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  Restaurant as RestaurantIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  LocalShipping as LocalShippingIcon,
} from "@mui/icons-material"
import ItemsCard from "./ItemsCard"
import OrderDetailsSkeletons from "./OrderDetailsSkeletons"
import { fetchOrderByIdDetails, merchantAcceptOrder, setOrderInDelivery, setOrderReadyForDelivery } from "../../store/kanbanRequests"
import { useAppDispatch } from "@/store"
import { EOrderStatus, IOrder, statusLabels } from "@/modules/Orders/types/IOrder"
import formatTime from "@/shared/utils/formatTime"

interface OrderDetailsProps {
  order: IOrder | null
  isLoading: boolean
  showActions: boolean
}

const cancelReasons = [
  "Problemas de sistema na loja",
  "A loja está sem entregadores disponíveis",
  "Suspeita de golpe ou fraude",
  "Loja passando por dificuldades internas",
]

export function OrderDetails({ order, isLoading, showActions }: OrderDetailsProps) {
  const dispatch = useAppDispatch()

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [selectedCancelReason, setSelectedCancelReason] = useState("")
  // const [statusExpanded, setStatusExpanded] = useState(false)

  if (isLoading) {
    return <OrderDetailsSkeletons />
  }

  if (!order) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Selecione um pedido para ver os detalhes
        </Typography>
      </Box>
    )
  }

  const handleSetOrderAccepted = async (orderId: string) => {
    await dispatch(merchantAcceptOrder(orderId))
    await dispatch(fetchOrderByIdDetails(orderId))
  }

  const handleSetOrderReadyForDelivery = async (orderId: string) => {
    await dispatch(setOrderReadyForDelivery(orderId))
    await dispatch(fetchOrderByIdDetails(orderId))
  }

  const handleSetOrderInDelivery = async (orderId: string) => {
    await dispatch(setOrderInDelivery(orderId))
    await dispatch(fetchOrderByIdDetails(orderId))
  }



  const shouldShowAddress = () => {
    return [EOrderStatus.IN_PREPARATION, EOrderStatus.IN_DELIVERY, EOrderStatus.DRIVER_ON_CLIENT].includes(order.status)
  }

  const shouldDeliveryConfirmation = () => {
    return [EOrderStatus.IN_PREPARATION, EOrderStatus.IN_DELIVERY, EOrderStatus.DRIVER_ON_CLIENT].includes(order.status)
  }

  const getActionButtons = () => {
    switch (order.status) {
      case EOrderStatus.WAITING_MERCHANT_ACCEPTANCE:
        return (
          <Box sx={{ display: "flex", gap: 1.5, mt: 3, justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              size="small"
              sx={{
                color: "#f44336",
                borderColor: "#f44336",
                "&:hover": {
                  borderColor: "#d32f2f",
                  backgroundColor: "rgba(244, 67, 54, 0.04)",
                },
                px: 3,
                py: 1,
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "0.875rem",
              }}
              startIcon={<CancelIcon sx={{ fontSize: 18 }} />}
              onClick={() => setCancelDialogOpen(true)}
            >
              Cancelar Pedido
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{
                px: 3,
                py: 1,
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "0.875rem",
              }}
              startIcon={<CheckCircleIcon sx={{ fontSize: 18 }} />}
              onClick={() => {
                handleSetOrderAccepted(order.id)
              }}
            >
              Aceitar Pedido
            </Button>

          </Box>
        )
      case EOrderStatus.IN_PREPARATION:
        return (
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "#4caf50",
                "&:hover": { backgroundColor: "#45a049" },
                px: 3,
                py: 1,
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "0.875rem",
              }}
              startIcon={<CheckCircleIcon sx={{ fontSize: 18 }} />}
              onClick={() => {
                handleSetOrderReadyForDelivery(order.id)
              }}
            >
              Pedido pronto
            </Button>
          </Box>
        )

      case EOrderStatus.READY_FOR_DELIVERY:
        return (
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "#4caf50",
                "&:hover": { backgroundColor: "#45a049" },
                px: 3,
                py: 1,
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "0.875rem",
              }}
              startIcon={<LocalShippingIcon sx={{ fontSize: 18 }} />}
              onClick={() => {
                handleSetOrderInDelivery(order.id)
              }}
            >
              Enviar para entrega
            </Button>
          </Box>
        )
      default:
        return null
    }
  }

  const handleCancelOrder = () => {
    if (selectedCancelReason) {
      console.log("Cancel order:", order.id, "Reason:", selectedCancelReason)
      setCancelDialogOpen(false)
      setSelectedCancelReason("")
    }
  }

  return (
    <Box sx={{ flex: 1, overflow: "auto" }}>
      <Box sx={{ p: 3, maxWidth: 900, mx: "auto" }}>
        {/* Header - Order Number and Customer Name */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "space-between", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Chip
                label={statusLabels[order.status as keyof typeof statusLabels]}
              sx={{
                backgroundColor: "white",
                border: "2px solid #2f03b6",
                fontWeight: 700,
                fontSize: "1rem",
                px: 1,
                py: 0.5,
                height: "auto",
              }}
            />
              <Typography variant="h5" sx={{ fontWeight: 600, color: "#333" }}>
                {order.client.name || "Cliente"}
              </Typography>
            </Box>

            <Chip
              label={`#${order.id.slice(-4)}`}
              sx={{
                backgroundColor: "white",
                border: "2px solid #e0e0e0",
                fontWeight: 700,
                fontSize: "1rem",
                px: 1,
                py: 0.5,
                height: "auto",
              }}
            />
          </Box>

          {/* Restaurant Info Line */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ width: 32, height: 32, backgroundColor: "#8B4513" }}>
                <RestaurantIcon sx={{ fontSize: 20 }} />
              </Avatar>
              <Typography variant="body2" color="text.secondary">
                {/* Restaurante Seringueira •*/} Feito às {formatTime(order.sentToWaitingMerchantAcceptanceAt)} • Localizador do pedido{" "}
                {order.id.slice(-8)} •
              </Typography>
              {/* <Typography variant="body2" sx={{ color: "#f44336", textDecoration: "underline", cursor: "pointer" }}>
                O que é isso?
              </Typography> */}
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Chip label="via WhatsApp" variant="outlined" size="small" />
            </Box>
          </Box>

          {/* Delivery Info */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ScheduleIcon sx={{ fontSize: 18, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                Entrega prevista: {formatTime(order.sentToWaitingMerchantAcceptanceAt)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PersonIcon sx={{ fontSize: 18, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                1º pedido
              </Typography>
            </Box>
            {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon sx={{ fontSize: 18, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                0800 711 8080 ID: {order.id.slice(-8)}
              </Typography>
            </Box> */}
          </Box>
        </Box>

        {/* Warning Message for Canceled Orders */}
        {[EOrderStatus.CANCELED_BY_MERCHANT, EOrderStatus.CANCELED_BY_USER].includes(order.status) && (
          <Paper
            sx={{
              backgroundColor: "#fff3cd",
              border: "1px solid #ffeaa7",
              borderRadius: 2,
              p: 3,
              mb: 2,
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              O reembolso desse cancelamento não se encaixa na nossa Política
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Não é possível contestar o cancelamento deste pedido, pois ele não se encaixa na nossa política de
              reembolsos.
            </Typography>
          </Paper>
        )}

        {/* Address Card */}
        {shouldShowAddress() && (
          <Paper elevation={1} sx={{ mb: 2, borderRadius: 2 }}>
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOnIcon sx={{ color: "#666", fontSize: 20 }} />
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {order.deliveryAddressStreet}, {order.deliveryAddressNumber} - {order.deliveryAddressNeighborhood}{" "}
                      - {order.deliveryAddressCity} • {order.deliveryAddressZipcode}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {order.deliveryAddressComplement || "Empresa - Power Clean - Jefferson Financeiro"} • Empresa
                      Power Clean
                    </Typography>
                  </Box>
                </Box>
                <Chip label="Entrega própria" variant="outlined" size="small" />
              </Box>
            </Box>
          </Paper>
        )}

        {/* Delivery Confirmation Card */}
        {shouldDeliveryConfirmation() &&
          <Paper elevation={1} sx={{ mb: 2, borderRadius: 2 }}>
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#666",
                  }}
                />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Confirmação de entrega pendente
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Envie o link pro entregador e evite cancelamentos por pedido não entregue
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ color: "#f44336", borderColor: "#f44336" }}
                  startIcon={<span>📋</span>}
                >
                  Copiar link
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ color: "#f44336", borderColor: "#f44336" }}
                  startIcon={<span>📱</span>}
                >
                  Compartilhar
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ color: "#f44336", borderColor: "#f44336" }}
                  startIcon={<span>📧</span>}
                >
                  Saiba mais
                </Button>
              </Box>
            </Box>
          </Paper>
        }

        {/* Delivery Partner Card */}
        {/* <Paper elevation={1} sx={{ mb: 2, borderRadius: 2 }}>
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#666",
                  }}
                />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Entrega parceira Sob Demanda
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Solicite entrega individual ou agrupe com outros pedidos
                  </Typography>
                </Box>
              </Box>
              <Chip label="Desconto disponível" color="success" variant="outlined" size="small" />
            </Box>
          </Box>
        </Paper> */}

        <ItemsCard order={order} />



        {/* Cancel Dialog */}
        <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Cancelar Pedido</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Selecione o motivo do cancelamento:
            </Typography>
            <RadioGroup value={selectedCancelReason} onChange={(e) => setSelectedCancelReason(e.target.value)}>
              {cancelReasons.map((reason) => (
                <FormControlLabel key={reason} value={reason} control={<Radio />} label={reason} />
              ))}
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCancelDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleCancelOrder} variant="contained" color="error" disabled={!selectedCancelReason}>
              Confirmar Cancelamento
            </Button>
          </DialogActions>
        </Dialog>

        {/* Action Buttons */}
        {showActions && getActionButtons()}
      </Box>
    </Box>
  )
}
