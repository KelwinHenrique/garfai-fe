import { IOrder, IOrderItem } from "@/modules/Orders/types/IOrder";
import formatPrice from "@/shared/utils/formatPrice";
import { Avatar, Box, Chip, Divider, List, ListItem, Paper, Typography } from "@mui/material";

interface IItemsCardProps {
  order: IOrder | null
}

const ItemsCard = ({ order }: IItemsCardProps) => {
  {/* Items Card */ }

  return (
    <Paper elevation={1} sx={{ mb: 2, borderRadius: 2 }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, fontSize: "1rem" }}>
          Itens no pedido
        </Typography>

        <List sx={{ p: 0 }}>
          {order?.orderItems.map((item: IOrderItem, index: number) => (
            <Box key={item.id}>
              <ListItem sx={{ px: 0, py: 1.5, alignItems: "flex-start" }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, width: "100%" }}>
                  {/* Item quantity badge and image */}
                  <Box sx={{ position: "relative" }}>
                    <Avatar
                      src={'https://static.ifood-static.com.br/image/upload/t_low/pratos/' + item.logoUrlAtPurchase}
                      sx={{
                        width: 48,
                        height: 48,
                        backgroundColor: "#f0f0f0",
                        color: "#666",
                        fontSize: "1.2rem",
                        borderRadius: 2,
                      }}
                    >
                    </Avatar>
                    <Box
                      sx={{
                        position: "absolute",
                        top: -6,
                        left: -6,
                        width: 20,
                        height: 20,
                        backgroundColor: "#333",
                        color: "white",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                      }}
                    >
                      {item.quantity}
                    </Box>
                  </Box>

                  {/* Item details */}
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#333", fontSize: "0.9rem" }}>
                        {item.quantity}x {item.itemDescriptionAtPurchase}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {item.quantity > 1 &&
                          <Typography variant="body2" sx={{
                            color: "#666",
                            fontSize: "0.7rem",
                            fontWeight: 500,
                          }}>
                            {item.quantity}x{formatPrice(item.singlePriceForItemLine)}
                          </Typography>
                        }
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "#333", fontSize: "0.9rem" }}>
                          {formatPrice(item.totalPriceForItemLine)}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Item customizations */}
                    {item.orderChoices.length > 0 && (
                      <Box sx={{ mt: 1 }}>
                        {item.orderChoices.map((choice) => (
                          <Box key={choice.id}>
                            {choice.orderGarnishItems.map((garnish) => (
                              <Box
                                key={garnish.id}
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  py: 0.3,
                                }}
                              >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                  <Chip
                                    label={garnish.quantity}
                                    size="small"
                                    sx={{
                                      height: 20,
                                      fontSize: "0.7rem",
                                      backgroundColor: "#f5f5f5",
                                      color: "#666",
                                      "& .MuiChip-label": {
                                        px: 0.8,
                                      },
                                    }}
                                  />
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: "#666",
                                      fontSize: "0.8rem",
                                    }}
                                  >
                                    {garnish.descriptionAtPurchase}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                  {garnish.quantity > 1 &&
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: "#666",
                                        fontSize: "0.7rem",
                                        fontWeight: 500,
                                      }}
                                    >
                                      {garnish.quantity}x{formatPrice(garnish.unitPriceAtPurchase)}
                                    </Typography>
                                  }

                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: "#666",
                                      fontSize: "0.8rem",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {formatPrice(garnish.totalPriceForGarnishItemLine)}
                                  </Typography>
                                </Box>
                              </Box>
                            ))}
                          </Box>
                        ))}
                      </Box>
                    )}

                    {/* Notes section */}
                    {item.notes && (
                      <Box sx={{ mt: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
                        <Box
                          sx={{
                            width: 14,
                            height: 14,
                            borderRadius: "50%",
                            backgroundColor: "#666",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography sx={{ color: "white", fontSize: "0.5rem" }}>💬</Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                          {item.notes}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </ListItem>
              {index < order.orderItems.length - 1 && <Divider sx={{ my: 0.5 }} />}
            </Box>
          ))}
        </List>

        {/* Disposable items note */}
        {/* <Box sx={{ mt: 2, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
      <Box
        sx={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          backgroundColor: "#666",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "0.5rem" }}>🚫</Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
        Não enviar descartáveis para este pedido
      </Typography>
    </Box> */}

        <Divider sx={{ my: 2 }} />

        {/* Delivery Fee */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: "#e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontSize: "0.6rem" }}>🚚</Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "#333", fontSize: "0.9rem" }}>
              Taxa de entrega
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 500, color: "#333", fontSize: "0.9rem" }}>
            {formatPrice(order?.deliveryFeeAmount || 0)}
          </Typography>
        </Box>

        {/* Subtotal */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: "#e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontSize: "0.6rem" }}>💰</Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "#333", fontSize: "0.9rem" }}>
              Subtotal
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 500, color: "#333", fontSize: "0.9rem" }}>
            {formatPrice(order?.subtotalAmount || 0)}
          </Typography>
        </Box>

        {/* iFood Incentives */}
        {/* <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 16, height: 16, backgroundColor: "#ff6b35" }}>
              <Typography sx={{ fontSize: "0.5rem", color: "white" }}>🎁</Typography>
            </Avatar>
            <Typography variant="body2" sx={{ color: "#333", fontSize: "0.9rem" }}>
              Incentivos iFood
            </Typography>
            <ExpandMoreIcon sx={{ fontSize: 14, color: "#666" }} />
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 500, color: "#4caf50", fontSize: "0.9rem" }}>
            -R$ 10,00
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ ml: 2.5, fontSize: "0.75rem" }}>
          O iFood pagará este valor para a sua loja
        </Typography>
      </Box> */}

        <Divider sx={{ my: 1.5, borderWidth: 1, borderColor: "#ddd" }} />

        {/* Total */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#333", fontSize: "1rem" }}>
            Total
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#333", fontSize: "1rem" }}>
            {formatPrice(order?.totalAmount || 0)}
          </Typography>
        </Box>

        {/* Payment Method */}
        {/* <PaymentMethodDisplay paymentMethod={order.paymentMethod} /> */}
      </Box>
    </Paper>
  )
};

export default ItemsCard;
