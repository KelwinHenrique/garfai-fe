import React from 'react';
import { TextField, InputAdornment } from "@mui/material";
import { NumericFormat } from 'react-number-format';

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  [key: string]: any; // Para permitir outras props do TextField
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({ value, onChange, ...props }) => (
  <NumericFormat
    value={(value / 100).toFixed(2)}
    onValueChange={({ floatValue }) => onChange(floatValue ? Math.round(floatValue * 100) : 0)}
    thousandSeparator="."
    decimalSeparator=","
    decimalScale={2}
    fixedDecimalScale
    customInput={TextField}
    InputProps={{
      startAdornment: <InputAdornment position="start">R$</InputAdornment>,
      inputProps: { min: 0 },
    }}
    {...props}
  />
); 