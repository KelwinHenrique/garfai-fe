import { Box, Button, ListItem, ListItemButton, Typography } from "@mui/material"
import {
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material"
import { useState } from "react"
import { useAppDispatch } from "@/store"
import { EOrderStatus, IOrder } from "@/modules/Orders/types/IOrder"
import { merchantAcceptOrder } from "../../store/kanbanRequests"
import formatTime from "@/shared/utils/formatTime"
import formatPrice from "@/shared/utils/formatPrice"

interface IListItemButtonProps {
  order: IOrder
  selectedOrderId: string | null
  handleSelectOrder: (orderId: string) => void
  status: EOrderStatus
}

const SideBarListItemButton = ({ order, selectedOrderId, status, handleSelectOrder }: IListItemButtonProps) => {

  const dispatch = useAppDispatch()

  const [isActionButtonLoading, setIsActionButtonLoading] = useState(false)
  const handleAcceptOrder = async (order: IOrder, e: React.MouseEvent) => {
    e.stopPropagation()

    setIsActionButtonLoading(true)
    await dispatch(merchantAcceptOrder(order.id))
    setIsActionButtonLoading(false)
  }

  return (
    <ListItem
      key={order.id}
      sx={{ margin: 0, mb: 0, p: 1 }}>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#f8f9fa",
          borderRadius: 2,
          border: selectedOrderId === order.id ? order.status === EOrderStatus.WAITING_MERCHANT_ACCEPTANCE ? "2px solid #e53e3e" : "2px solid #2f03b6" : "1px solid #e2e8f0",
          overflow: "hidden",
          margin: 0,
          p: 1,
          '&:hover': {
            backgroundColor: "#f3f8fc",
          },
        }}
      >
        <ListItemButton
          onClick={() => handleSelectOrder(order.id)}
          sx={{
            width: '100%',
            boxSizing: 'border-box',
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 0.5,
            p: 1.2,
            margin: 0,
            minWidth: 0,
            borderRadius: 2,
            padding: 0,
            mb: 0,
            marginLeft: '0 !important',
            '&.MuiListItemButton-root': { margin: 0, padding: 0, marginLeft: '0 !important' },
            '&:hover': {
              backgroundColor: 'transparent'
            }
          }}
        >
          {/* Order Header */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, color: "#333", fontSize: "0.85rem" }}
            >
              #{order.id.slice(-4)}
            </Typography>
            {order.client.name && 
              <Typography variant="body2" sx={{ fontSize: "0.75rem", color: "#000", }}>
                {order.client.name || "Cliente"}
              </Typography>
            }


          </Box>

          {/* Order Status */}
          {status === EOrderStatus.WAITING_MERCHANT_ACCEPTANCE && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              {/* <WarningIcon sx={{ color: "#e53e3e", fontSize: 14 }} /> */}
              <Box
                sx={{ color: "#e53e3e", fontWeight: 600, fontSize: "0.7rem", textTransform: "uppercase" }}
              >
                Aguardando aceite
              </Box>
            </Box>
          )}

          {status === EOrderStatus.READY_FOR_DELIVERY && (
            <Box sx={{ mb: 0.5 }}>
              <Typography
                variant="caption"
                sx={{ color: "#666", fontWeight: 600, fontSize: "0.7rem" }}
              >
                Pronto
              </Typography>
            </Box>
          )}

          {/* Restaurant Info */}
          {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <RestaurantIcon sx={{ color: "#666", fontSize: 12 }} />
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
              {status === EOrderStatus.ACCEPTED_BY_MERCHANT ? "Retirada" : "Max Flavor"}
            </Typography>
          </Box> */}

          {/* Order Details */}
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", mb: 0.5 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem", color: "#000" }}>
              {formatTime(order.sentToWaitingMerchantAcceptanceAt)}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "0.75rem", color: "#000" }}>
              {formatPrice(order.totalAmount)}
            </Typography>
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem", color: "#000" }}>
            {order.orderItems.length} {order.orderItems.length === 1 ? "item" : "itens"}
          </Typography>

          {/* Accept Button for Waiting Orders */}
          {status === EOrderStatus.WAITING_MERCHANT_ACCEPTANCE && (
            <Button
              variant="contained"
              size="small"
              fullWidth
              loading={isActionButtonLoading}
              sx={{
                px: 3,
                py: 1,
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "0.875rem",
              }}
              startIcon={<CheckCircleIcon sx={{ fontSize: 18, color: "white !important" }} />}
              onClick={(e) => handleAcceptOrder(order, e)}
            >
              Aceitar Pedido
            </Button>

          )}
        </ListItemButton>
      </Box>
    </ListItem >
  )
}

export default SideBarListItemButton