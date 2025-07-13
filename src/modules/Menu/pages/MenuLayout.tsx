import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

export function MenuLayout() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}

export default MenuLayout;