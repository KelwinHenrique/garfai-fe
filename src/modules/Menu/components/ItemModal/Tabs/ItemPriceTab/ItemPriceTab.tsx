// ItemPriceTab.tsx
import React, { useState, useEffect } from "react"
import {
  TextField,
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { ICreateUpdateItemDetailBody } from "@/modules/Menu/models/ICreateUpdateItemDetailBody"
import { CurrencyInput } from "@/shared/components/CurrencyInput"

interface ItemPriceTabProps {
  itemData: ICreateUpdateItemDetailBody
  onDataChange: (field: keyof ICreateUpdateItemDetailBody, value: any) => void
}

export const ItemPriceTab: React.FC<ItemPriceTabProps> = ({ itemData, onDataChange }) => {
  const [showDiscountFields, setShowDiscountFields] = useState(false)
  const [discountPercentage, setDiscountPercentage] = useState(0)

  const { unitOriginalPrice, unitPrice } = itemData


  useEffect(() => {
    if (unitPrice === 0) {
      setDiscountPercentage(0)
    } else {
      setShowDiscountFields(true)
      const discountPercentageCalc = (100 - (Math.round(unitPrice / unitOriginalPrice * 100)))
      console.log('discountPercentageCalc', discountPercentageCalc)
      setDiscountPercentage(discountPercentageCalc)
    }
  }, [unitOriginalPrice, unitPrice])


  const handleOriginalPriceChange = (newVal: number) => {
    onDataChange("unitOriginalPrice", newVal)
  }

  const handleUnitPriceChange = (newVal: number) => {
    onDataChange("unitPrice", newVal)
  }

  const handleRemoveDiscount = () => {
    setShowDiscountFields(false)
    onDataChange("unitPrice", 0)
  }

  const isPriceInvalid = itemData.unitOriginalPrice && itemData.unitPrice > itemData.unitOriginalPrice;

  return (
    <Box sx={{ p: 4, maxWidth: 600, bgcolor: "background.paper" }}>
      <Grid container spacing={2}>
        <Grid component="div" size={{ xs: 12, md: 6 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Preço do item
          </Typography>
          <CurrencyInput
            value={unitOriginalPrice}
            onChange={handleOriginalPriceChange}
            fullWidth
            sx={{
              mb: 2,
            }}
          />
        </Grid>
      </Grid>

      {!showDiscountFields ? (
        <Grid container spacing={2}>
          <Grid component="div" size={{ xs: 12, md: 6 }}>
            <Box textAlign="right" mt={1}>
              <Button
                onClick={() => setShowDiscountFields(true)}
                variant="text"
                sx={{ color: "error.main", textDecoration: "underline" }}
              >
                Aplicar desconto
              </Button>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Box mt={4}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Desconto direto no item
          </Typography>

          <Grid container spacing={2}>
            <Grid component="div" size={{ xs: 12, md: 6 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Preço com desconto
              </Typography>
              <CurrencyInput
                value={unitPrice}
                onChange={handleUnitPriceChange}
                fullWidth
                error={isPriceInvalid}
                helperText={isPriceInvalid ? "O preço com desconto não pode ser maior que o preço original" : ""}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: isPriceInvalid ? "error.main" : "inherit",
                      borderWidth: isPriceInvalid ? 2 : 1,
                    },
                    "&:hover fieldset": {
                      borderColor: isPriceInvalid ? "error.main" : "inherit",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: isPriceInvalid ? "error.main" : "primary.main",
                    },
                  },
                  "& .MuiFormHelperText-root": {
                    color: "error.main",
                    marginLeft: 0,
                  },
                }}
              />
            </Grid>
            <Grid component="div" size={{ xs: 10, md: 4 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Desconto em %
              </Typography>
              <TextField
                fullWidth
                type="number"
                value={discountPercentage}
                disabled
                InputProps={{ inputProps: { min: 0, max: 100 } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "grey.100",
                  },
                }}
              />
            </Grid>
            <Grid component="div" size={{ xs: 2, md: 2 }} display="flex" alignItems="flex-end">
              <IconButton onClick={handleRemoveDiscount}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      )
      }
    </Box >
  )
}