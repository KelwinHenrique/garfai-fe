import React from "react"
import {
  Box,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Paper,
  useTheme,
} from "@mui/material"
import {
  DragIndicator as DragIndicatorIcon,
  Image as ImageIcon,
} from "@mui/icons-material"
import { IChoice } from "../../../models/IMenu"

interface IComplementGroupProps {
  choice: IChoice
}

const formatPrice = (priceInCents: number) => {
  if (priceInCents === 0) return "Grátis"
  return `R$ ${(priceInCents / 100).toFixed(2).replace(".", ",")}`
}

const getSelectionText = (choice: IChoice) => {
  if (choice.min === choice.max) {
    if (choice.min === 1) return "Escolha 1"
    return `Escolha ${choice.min}`
  }
  if (choice.min === 0) return `Até ${choice.max} opç${choice.max === 1 ? "ão" : "ões"}`
  return `${choice.min} a ${choice.max} opç${choice.max === 1 ? "ão" : "ões"}`
}

export const ComplementGroup: React.FC<IComplementGroupProps> = ({ choice }) => {
  const theme = useTheme()

  return (
    <Paper variant="outlined" sx={{ my: 1, borderColor: "grey.300", backgroundColor: "#fff" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1.5,
          borderBottom: '1px solid',
          borderColor: "grey.300",
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius,
        }}
      >
        <DragIndicatorIcon fontSize="small" style={{ marginRight: theme.spacing(1), color: theme.palette.text.disabled }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: "medium", mb: 0.25 }}>
            {choice.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {choice.garnishItems.length} opç{choice.garnishItems.length === 1 ? "ão" : "ões"} •{" "}
            {getSelectionText(choice)}
          </Typography>
        </Box>
        <Chip
          size="small"
          sx={{
            fontSize: "0.65rem",
            height: "20px",
            fontWeight: "bold",
            bgcolor: '#fff',
            color: choice.min > 0 ? "error.contrastText" : "text.secondary",
          }}
          label={choice.min > 0 ? "OBRIGATÓRIO" : "OPCIONAL"}
        />
      </Box>
      <List dense sx={{ p: 0 }}>
        {choice.garnishItems.map((garnish, index) => (
          <ListItem
            key={garnish.id}
            sx={{
              py: 1,
              px: 2,
              borderTop: index > 0 ? 1 : 0,
              borderColor: "grey.200",
            }}
          >
            <ListItemAvatar sx={{ minWidth: 36, mr: 1.5 }}>
              <Avatar
                variant="rounded"
                src={garnish.logoUrl ? `https://static.ifood-static.com.br/image/upload/t_low/pratos/${garnish.logoUrl}` : undefined}
                sx={{ width: 32, height: 32, bgcolor: "grey.200" }}
              >
                <ImageIcon fontSize="small" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                  {garnish.description}
                </Typography>
              }
              secondary={
                garnish.details ? (
                  <Typography variant="caption" color="text.secondary">
                    {garnish.details}
                  </Typography>
                ) : null
              }
              sx={{ m: 0 }}
            />
            <Typography
              variant="body2"
              sx={{ fontWeight: "medium", ml: 1, color: garnish.unitPrice === 0 ? "success.main" : "text.primary" }}
            >
              {formatPrice(garnish.unitPrice)}
            </Typography>
          </ListItem>
        ))}
        {choice.garnishItems.length === 0 && (
          <ListItem sx={{ justifyContent: "center", py: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Nenhum complemento neste grupo.
            </Typography>
          </ListItem>
        )}
      </List>
    </Paper>
  )
} 