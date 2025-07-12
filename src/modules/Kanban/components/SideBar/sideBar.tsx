import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, InputAdornment, List, Switch, TextField, Typography } from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  LocalShipping as LocalShippingIcon,
  Person as PersonIcon,
  Done as DoneIcon,
} from "@mui/icons-material"
import { useState } from "react";
import SideBarListItemButton from "./SideBarListItemButton";
import { EOrderStatus } from "@/modules/Orders/types/IOrder";
import { useAppDispatch } from "@/store";
import { IKanban, selectOrder, toggleSection } from "../../store/kanbanSlice";

const SIDEBAR_WIDTH = 320

const statusConfig = {
  [EOrderStatus.WAITING_MERCHANT_ACCEPTANCE]: {
    label: "Aguardando aceite",
    icon: <AccessTimeIcon />,
    color: "#e53e3e" as const,
    step: "Aguardando aceite",
    sectionTitle: "Urgências",
  },
  [EOrderStatus.IN_PREPARATION]: {
    label: "Em Preparo",
    icon: <CheckCircleIcon />,
    color: "#38a169" as const,
    step: "Em preparo",
    sectionTitle: "Em Preparo",
  },
  [EOrderStatus.READY_FOR_DELIVERY]: {
    label: "Pronto Para Entrega",
    icon: <CheckCircleIcon />,
    color: "#38a169" as const,
    step: "Em preparo",
    sectionTitle: "Pronto",
  },
  [EOrderStatus.IN_DELIVERY]: {
    label: "Em entrega",
    icon: <LocalShippingIcon />,
    color: "#3182ce" as const,
    step: "Saiu para entrega",
    sectionTitle: "Em entrega",
  },
  [EOrderStatus.DRIVER_ON_CLIENT]: {
    label: "Entregador no cliente",
    icon: <PersonIcon />,
    color: "#805ad5" as const,
    step: "Com o cliente",
    sectionTitle: "Entregador no cliente",
  },
  [EOrderStatus.COMPLETED]: {
    label: "Concluídos",
    icon: <DoneIcon />,
    color: "#38a169" as const,
    step: "Finalizado",
    sectionTitle: "Concluído",
  },
}

interface ISideBarProps {
  orderKanban: IKanban
  selectedOrderId: string | null
}


const SideBar = ({ orderKanban, selectedOrderId }: ISideBarProps) => {
  const dispatch = useAppDispatch()

  const [autoAccept, setAutoAccept] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const handleSectionToggle = (status: EOrderStatus) => {
    dispatch(toggleSection(status))
  }

  const handleSelectOrder = (orderId: string) => {
    dispatch(selectOrder(orderId))
  }

  return (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        borderRight: "1px solid #e2e8f0",
        backgroundColor: "#f8f9fa",
        height: "100%",
        overflow: "auto",
      }}
    >
      {/* Auto Accept Section */}
      <Box sx={{ p: 2, backgroundColor: "white", borderBottom: "1px solid #e2e8f0" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body2" sx={{ fontWeight: 500, color: "#333" }}>
            Aceite automático de pedidos
          </Typography>
          <Switch
            checked={autoAccept}
            onChange={(e) => setAutoAccept(e.target.checked)}
            size="small"
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#4caf50",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#4caf50",
              },
            }}
          />
        </Box>
      </Box>

      {/* Search and Filters */}
      <Box sx={{ p: 2, backgroundColor: "white", borderBottom: "1px solid #e2e8f0" }}>
        <Box sx={{ display: "flex", gap: 1, mb: 0 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Buscar pedido"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#e53e3e", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "#f8f9fa",
                "& fieldset": {
                  borderColor: "#e2e8f0",
                },
                "&:hover fieldset": {
                  borderColor: "#e53e3e",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#e53e3e",
                },
              },
            }}
          />
        </Box>
      </Box>

      {/* Orders List */}
      <Box sx={{ flex: 1, overflow: "auto" }}>
        {Object.entries(statusConfig).map(([status, config]) => {
          const orderList = orderKanban[status] || []

          const isUrgent = status === EOrderStatus.WAITING_MERCHANT_ACCEPTANCE

          return (
            <Box key={status} sx={{ mb: 1 }}>
              <Accordion
                expanded={orderList.expanded}
                onChange={() => handleSectionToggle(status as EOrderStatus)}
                sx={{
                  boxShadow: "none",
                  "&:before": { display: "none" },
                  backgroundColor: isUrgent ? "#fff5f5" : "#f1f3f4",
                  border: isUrgent ? "1px solid #fed7d7" : "none",
                  borderRadius: "8px !important",
                  mx: 1,
                  "&.Mui-expanded": {
                    margin: "4px 8px",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    backgroundColor: "transparent",
                    minHeight: 48,
                    "& .MuiAccordionSummary-content": {
                      alignItems: "center",
                      gap: 1,
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: isUrgent ? "#e53e3e" : "#666",
                        fontSize: "0.9rem",
                      }}
                    >
                      {config.sectionTitle}
                    </Typography>
                    <Chip
                      label={orderList.count}
                      size="small"
                      sx={{
                        backgroundColor: isUrgent ? "#e53e3e" : "#666",
                        color: '#fff',
                        fontWeight: 600,
                        minWidth: 24,
                        height: 20,
                        fontSize: "0.7rem",
                        "& .MuiChip-label": {
                          color: "#fff"
                        }
                      }}
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                  <List sx={{ p: 0, m: 0, }}>
                    {orderList.rows.map((order) => (
                      <SideBarListItemButton
                        key={order.id}
                        order={order}
                        selectedOrderId={selectedOrderId}
                        status={status as EOrderStatus}
                        handleSelectOrder={handleSelectOrder}
                      />
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
};

export default SideBar;
