"use client"

import React from "react"
import { useState } from "react"
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Chip,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Collapse,
} from "@mui/material"
import {
  Add as AddIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Image as ImageIcon,
} from "@mui/icons-material"
import { IMenuCategory } from "../../models/IMenu"
import { ComplementGroup } from "./ComplementGroup/ComplementGroup"
import { EItemDetailModalType, toggleItemDetailModal } from "../../store/menuSlice"
import { useAppDispatch } from "@/store"

interface ICategoryCardProps {
  menuId: string
  category: IMenuCategory
}

export const CategoryCard: React.FC<ICategoryCardProps> = ({ menuId, category }) => {

  const dispatch = useAppDispatch()

  const [isCategoryExpanded, setIsCategoryExpanded] = useState(true)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))


  const toggleItemExpansion = (itemId: string) => {
    setExpandedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }))
  }

  const handleEditItem = (menuId: string, categoryId: string, itemId: string) => {
    dispatch(toggleItemDetailModal({ menuId, categoryId, itemId, type: EItemDetailModalType.EDIT }))
  }
  const formatPrice = (priceInCents: number) => {
    if (priceInCents === 0) return "Grátis"
    return `R$ ${(priceInCents / 100).toFixed(2).replace(".", ",")}`
  }

  const renderPriceDisplay = (item: any) => {
    const { unitPrice, unitOriginalPrice, unitMinPrice } = item

    // Caso 1: unitMinPrice é maior que unitPrice
    if (unitMinPrice && unitMinPrice > unitPrice) {
      return (
        <Typography variant="body2" sx={{ fontWeight: "medium" }}>
          a partir de {formatPrice(unitMinPrice)}
        </Typography>
      )
    }

    // Caso 2: unitMinPrice é igual ou menor que unitPrice
    if (!unitOriginalPrice || unitPrice >= unitOriginalPrice) {
      // Sem desconto - mostrar apenas unitPrice
      return (
        <Typography variant="body2" sx={{ fontWeight: "medium" }}>
          {formatPrice(unitPrice)}
        </Typography>
      )
    }

    // Caso 3: unitPrice é menor que unitOriginalPrice - há desconto
    return (
      <>
        <Typography variant="body2" sx={{ fontWeight: "medium" }}>
          {formatPrice(unitPrice)}
        </Typography>
        <Typography
          variant="caption"
          sx={{ textDecoration: "line-through", color: "text.secondary", display: "block" }}
        >
          {formatPrice(unitOriginalPrice)}
        </Typography>
      </>
    )
  }

  return (
    <>
      <Card sx={{ mb: 2, overflow: "visible", backgroundColor: "#fff" }}>
        <CardContent>
          {/* Category Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexGrow: 1 }}>
              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                component="div"
                sx={{
                  fontWeight: 500,
                  fontSize: isMobile ? "1rem" : "1.15rem",
                  lineHeight: 1.3,
                  color: "text.primary",
                }}
              >
                {category.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {/* <IconButton
                  size="small"
                  onClick={handleCategoryStatusToggle}
                  sx={{
                    color: category.isActive ? "error.main" : "success.main",
                    p: 0.5,
                  }}
                >
                  {category.isActive ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
                </IconButton> */}
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
           
              <IconButton
                size="small"
                onClick={() => setIsCategoryExpanded(!isCategoryExpanded)}
                sx={{ color: "text.secondary" }}
              >
                {isCategoryExpanded ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
              </IconButton>
            </Box>
          </Box>

          {/* Items List - Collapsible Category Body */}
          <Collapse in={isCategoryExpanded} timeout="auto">
            {category.items.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 3, color: "text.secondary" }}>
                <Typography variant="body2">Nenhum item adicionado ainda.</Typography>
                <Button
                  variant="text"
                  startIcon={<AddIcon fontSize="small" />}
                  sx={{ mt: 1 }}
                  color="error"
                >
                  Adicionar primeiro item
                </Button>
              </Box>
            ) : (
              <List sx={{ p: 0 }}>
                {category.items.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <ListItem
                      component="div"
                      sx={{
                        px: { xs: 0, sm: 1 },
                        py: 1.5,
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        flexDirection: "column",
                      }}
                    >
                      {/* Main Item Info Row */}
                      <Box sx={{ display: "flex", width: "100%", alignItems: "flex-start" }}>
                        <ListItemAvatar sx={{ mt: 0.5, mr: 1.5 }}>
                          <Avatar
                            variant="rounded"
                            src={
                              item.logoUrl ?
                                `https://static.ifood-static.com.br/image/upload/t_low/pratos/${item.logoUrl}` :
                                `/placeholder.svg?width=60&height=60&query=item}`
                            }
                            alt={item.description}
                            sx={{ width: 60, height: 60, bgcolor: "grey.200" }}
                          >
                            <ImageIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>

                        <ListItemText
                          primary={
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                              <Typography
                                variant="subtitle1"
                                sx={{
                                  fontWeight: "medium",
                                  cursor: "pointer",
                                  fontSize: "1rem",
                                  "&:hover": {
                                    color: "error.main",
                                    textDecoration: "underline",
                                  },
                                }}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleEditItem(menuId, category.id, item.id)
                                }}
                              >
                                {item.description}
                              </Typography>

                              {item.choices && item.choices.length > 0 && (
                                <Chip
                                  label={`${item.choices.length} grupo${item.choices.length === 1 ? "" : "s"}`}
                                  size="small"
                                  variant="outlined"
                                  sx={{ fontSize: "0.7rem", height: "20px" }}
                                />
                              )}
                            </Box>
                          }
                          secondary={

                            <Box>
                              <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "normal", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                {item.details}
                              </Typography>

                            </Box>
                          }
                          sx={{ flexGrow: 1, mr: 1 }}
                        />

                        {/* Item Actions - Price, Switch, Menu, Expander Icon */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: { xs: 0.5, sm: 1 },
                            ml: "auto",
                            mt: 0.5,
                          }}
                        >
                          <Box sx={{ textAlign: "right", minWidth: 70, mr: 1 }}>
                            {renderPriceDisplay(item)}
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          </Box>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleItemExpansion(item.id)
                            }}
                            sx={{
                              color: "text.secondary",
                              cursor: "pointer"
                            }}
                          >
                            {expandedItems[item.id] ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
                          </IconButton>
                        </Box>
                      </Box>

                      {/* Collapsible Complements Section for the Item */}
                      <Collapse
                        in={expandedItems[item.id]}
                        timeout="auto"
                        unmountOnExit
                        sx={{ width: "100%", pl: isMobile ? 0 : "78px", pt: 1 }}
                      >
                        {item.choices && item.choices.length > 0 ? (
                          <Box sx={{ mt: 1 }}>
                            <Typography
                              variant="overline"
                              display="block"
                              color="textSecondary"
                              sx={{ mb: 1, fontWeight: "medium" }}
                            >
                              Grupos de complementos ({item.choices.length}):
                            </Typography>
                            {item.choices.map((choice) => (
                              <ComplementGroup key={choice.id} choice={choice} />
                            ))}
                          </Box>
                        ) : (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                              display: "block",
                              py: 2,
                              textAlign: isMobile ? "left" : "center",
                              fontStyle: "italic",
                            }}
                          >
                            Este item não possui complementos.
                          </Typography>
                        )}
                      </Collapse>
                    </ListItem>
                    {index < category.items.length - 1 && <Divider component="li" sx={{ mx: isMobile ? 0 : 1 }} />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Collapse>
        </CardContent>
      </Card>
    </>
  )
}
