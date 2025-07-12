import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

export function OrdersKanbanLayout() {
  return (
    <Box sx={{ height: "100%" }}>
      <Outlet />
    </Box>
  );
}

export default OrdersKanbanLayout;