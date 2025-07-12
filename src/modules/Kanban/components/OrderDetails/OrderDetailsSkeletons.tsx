import { Box, Skeleton, Paper, Stack } from "@mui/material"

const OrderDetailsSkeletons = () => {
  return (
    <Box sx={{ flex: 1, overflow: "auto", bgcolor: "#fafbfc" }}>
      <Box sx={{ p: 3, maxWidth: 900, mx: "auto" }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Skeleton variant="rounded" width={140} height={32} sx={{ borderRadius: 8 }} />
          <Skeleton variant="text" width={260} height={32} />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Skeleton variant="rounded" width={60} height={28} sx={{ borderRadius: 8 }} />
            <Skeleton variant="rounded" width={100} height={28} sx={{ borderRadius: 8 }} />
          </Box>
        </Box>

        {/* Info do pedido */}
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={120} height={20} />
          <Skeleton variant="text" width={180} height={20} />
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Skeleton variant="circular" width={18} height={18} />
          <Skeleton variant="text" width={140} height={20} />
          <Skeleton variant="circular" width={18} height={18} />
          <Skeleton variant="text" width={100} height={20} />
        </Stack>

        {/* Card de Itens do Pedido */}
        <Paper elevation={0} sx={{ borderRadius: 3, p: 3, mb: 2 }}>
          <Skeleton variant="text" width={160} height={28} sx={{ mb: 2 }} />

          {/* Item do pedido */}
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 1 }}>
            <Box sx={{ position: "relative" }}>
              <Skeleton variant="rounded" width={56} height={56} sx={{ borderRadius: 2 }} />
              <Skeleton variant="circular" width={22} height={22} sx={{ position: "absolute", top: -8, left: -8 }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                <Skeleton variant="rounded" width={24} height={24} />
                <Skeleton variant="text" width={160} height={22} />
              </Box>
              {/* Complementos */}
              <Stack spacing={0.5} sx={{ mb: 1 }}>
                <Skeleton variant="text" width={120} height={16} />
                <Skeleton variant="text" width={90} height={16} />
                <Skeleton variant="text" width={200} height={16} />
                <Skeleton variant="text" width={220} height={16} />
              </Stack>
            </Box>
            <Skeleton variant="text" width={60} height={22} />
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 1 }}>
            <Box sx={{ position: "relative" }}>
              <Skeleton variant="rounded" width={56} height={56} sx={{ borderRadius: 2 }} />
              <Skeleton variant="circular" width={22} height={22} sx={{ position: "absolute", top: -8, left: -8 }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                <Skeleton variant="rounded" width={24} height={24} />
                <Skeleton variant="text" width={160} height={22} />
              </Box>
              {/* Complementos */}
              <Stack spacing={0.5} sx={{ mb: 1 }}>
                <Skeleton variant="text" width={120} height={16} />
                <Skeleton variant="text" width={100} height={16} />
                <Skeleton variant="text" width={110} height={16} />
                <Skeleton variant="text" width={160} height={16} />
                <Skeleton variant="text" width={200} height={16} />
              </Stack>
            </Box>
            <Skeleton variant="text" width={60} height={22} />
          </Box>

          

          {/* Divider */}
          <Box sx={{ borderBottom: "1px solid #eee", my: 2 }} />

          {/* Taxas e totais */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "space-between" }}>
              <Skeleton variant="text" width={120} height={20} />
              <Skeleton variant="text" width={60} height={20} />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "space-between" }}>
              <Skeleton variant="text" width={120} height={20} />
              <Skeleton variant="text" width={60} height={20} />
            </Box>
            <Box sx={{ borderBottom: "1px solid #eee", width: 200, my: 1 }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "flex-end" }}>
              <Skeleton variant="text" width={60} height={28} />
              <Skeleton variant="text" width={80} height={28} />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default OrderDetailsSkeletons