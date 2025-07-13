"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { TextField, Box, Typography, Button, Grid, Paper, CircularProgress, Alert } from "@mui/material"
import { AddPhotoAlternate as ImagePlusIcon, Delete as Trash2Icon, Person as UserIcon, Group as UsersIcon, AutoAwesome as AIEnhanceIcon } from "@mui/icons-material"
import { EPortionSize, portionSizeOptions } from "@/modules/Menu/models/IMenu"
import { ICreateUpdateItemDetailBody } from "@/modules/Menu/models/ICreateUpdateItemDetailBody"
import { enhanceImageWithAI, getAIJobStatus } from "@/modules/Menu/store/menuRequests"

interface ItemDetailsTabProps {
  itemData: ICreateUpdateItemDetailBody
  onDataChange: (field: keyof ICreateUpdateItemDetailBody, value: string | number | null | undefined) => void
  itemId?: string | null
}

interface AIEnhancementState {
  isEnhancing: boolean
  jobId: string | null
  status: 'idle' | 'pending' | 'processing' | 'completed' | 'failed'
  error: string | null
  progress: number
}

export const ItemDetailsTab: React.FC<ItemDetailsTabProps> = ({ itemData, onDataChange, itemId }) => {
  const [aiState, setAIState] = useState<AIEnhancementState>({
    isEnhancing: false,
    jobId: null,
    status: 'idle',
    error: null,
    progress: 0
  })

  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null)

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval)
      }
    }
  }, [pollingInterval])

  const startEnhancement = useCallback(async () => {
    if (!itemData.logoUrl || !itemId || itemId === '') {
      setAIState(prev => ({ ...prev, error: 'Imagem e ID do item são necessários' }))
      return
    }

    try {
      setAIState(prev => ({
        ...prev,
        isEnhancing: true,
        status: 'pending',
        error: null,
        progress: 0
      }))

      const response = await enhanceImageWithAI({
        imageUrl: `https://static.ifood-static.com.br/image/upload/t_low/pratos/${itemData.logoUrl}`,
        itemId: itemId || ''
      })

      if (response.success) {
        setAIState(prev => ({
          ...prev,
          jobId: response.data.jobId,
          status: 'processing',
          progress: 10
        }))

        // Start polling
        const interval = setInterval(async () => {
          try {
            const jobResponse = await getAIJobStatus(response.data.jobId)

            if (jobResponse.success) {
              const job = jobResponse.data

              if (job.status === 'completed' && job.enhancedImageUrl) {
                setAIState(prev => ({
                  ...prev,
                  status: 'completed',
                  progress: 100,
                  isEnhancing: false
                }))

                // Update the image URL with the enhanced version
                if (job.enhancedImageUrl) {
                  onDataChange("logoUrl", job.enhancedImageUrl)
                }

                clearInterval(interval)
                setPollingInterval(null)
              } else if (job.status === 'failed') {
                setAIState(prev => ({
                  ...prev,
                  status: 'failed',
                  error: job.errorMessage || 'Falha no processamento da IA',
                  isEnhancing: false
                }))
                clearInterval(interval)
                setPollingInterval(null)
              } else {
                // Update progress based on time elapsed
                const startTime = new Date(job.startedAt).getTime()
                const currentTime = new Date().getTime()
                const elapsed = currentTime - startTime
                const estimatedTotal = 45000 // 45 seconds
                const progress = Math.min(90, 10 + (elapsed / estimatedTotal) * 80)

                setAIState(prev => ({
                  ...prev,
                  progress: Math.round(progress)
                }))
              }
            }
          } catch {
            setAIState(prev => ({
              ...prev,
              status: 'failed',
              error: 'Erro ao verificar status do processamento',
              isEnhancing: false
            }))
            clearInterval(interval)
            setPollingInterval(null)
          }
        }, 2000) // Poll every 2 seconds

        setPollingInterval(interval)
      } else {
        setAIState(prev => ({
          ...prev,
          status: 'failed',
          error: 'Falha ao iniciar processamento',
          isEnhancing: false
        }))
      }
    } catch {
      setAIState(prev => ({
        ...prev,
        status: 'failed',
        error: 'Erro ao iniciar melhoria de imagem',
        isEnhancing: false
      }))
    }
  }, [itemData.logoUrl, itemId, onDataChange])

  const cancelEnhancement = useCallback(() => {
    if (pollingInterval) {
      clearInterval(pollingInterval)
      setPollingInterval(null)
    }
    setAIState(prev => ({
      ...prev,
      isEnhancing: false,
      status: 'idle',
      error: null,
      progress: 0
    }))
  }, [pollingInterval])

  const getPortionIcon = (value: EPortionSize) => {
    switch (value) {
      case "SERVES_1":
        return <UserIcon fontSize="small" />
      case "SERVES_2":
        return <UsersIcon fontSize="small" />
      case "SERVES_3":
        return (
          <Box sx={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <UsersIcon fontSize="small" />
            <Box
              sx={{
                position: "absolute",
                top: -2,
                right: -2,
                width: 12,
                height: 12,
                bgcolor: "error.main",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.6rem",
                fontWeight: "bold",
              }}
            >
              3
            </Box>
          </Box>
        )
      case "SERVES_4":
        return (
          <Box sx={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <UsersIcon fontSize="small" />
            <Box
              sx={{
                position: "absolute",
                top: -2,
                right: -2,
                width: 12,
                height: 12,
                bgcolor: "error.main",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.6rem",
                fontWeight: "bold",
              }}
            >
              4
            </Box>
          </Box>
        )
      default:
        return <Box sx={{ width: 24, height: 24, bgcolor: "grey.300", borderRadius: "50%" }} />
    }
  }

  const getPortionLabel = (value: EPortionSize) => {
    const option = portionSizeOptions.find((opt) => opt.value === value)
    return option?.label || "N/A"
  }

  const getStatusMessage = () => {
    switch (aiState.status) {
      case 'pending':
        return 'Iniciando processamento...'
      case 'processing':
        return `Processando imagem... ${aiState.progress}%`
      case 'completed':
        return 'Imagem melhorada com sucesso!'
      case 'failed':
        return 'Falha no processamento'
      default:
        return ''
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={4}>
        {/* Left Column - Form Fields */}
        <Grid component="div" size={{ xs: 12, md: 7 }}>
          {/* Item Name */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Nome do prato{" "}
              <Typography component="span" color="text.disabled">
                (obrigatório)
              </Typography>
            </Typography>
            <TextField
              fullWidth
              placeholder="Marmita de frango"
              value={itemData.description || ""}
              onChange={(e) => onDataChange("description", e.target.value)}
              inputProps={{ maxLength: 80 }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "grey.300",
                  },
                },
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
              {itemData.description?.length || 0}/80 caracteres
            </Typography>
          </Box>

          {/* Description */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Descrição
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Um delicioso Creme de açaí Super cremoso, a verdadeira e irresistível Nutella Original, o incrível leite condensado e morangos selecionados."
              value={itemData.details ?? ""}
              onChange={(e) => onDataChange("details", e.target.value)}
              variant="outlined"
              inputProps={{ maxLength: 1000 }}
              sx={{
                height: 'none',
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "grey.300",
                  },
                },
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
              {(itemData.details ?? "").length}/1000 caracteres
            </Typography>
          </Box>

          {/* PDV Code */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Código PDV
            </Typography>
            <TextField
              fullWidth
              placeholder="000"
              value={itemData.pdvCode || ""}
              onChange={(e) => onDataChange("pdvCode", e.target.value)}
              inputProps={{ maxLength: 40 }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "grey.300",
                  },
                },
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
              {itemData.pdvCode?.length || 0}/40 caracteres
            </Typography>
          </Box>

          {/* Portion Size */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
              Pra qual tamanho de fome é esse item
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
              Dê mais detalhes para que o cliente possa planejar a refeição
            </Typography>

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {portionSizeOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={itemData.portionSizeTag === option.value ? "contained" : "outlined"}
                  onClick={() => onDataChange("portionSizeTag", option.value)}
                  sx={{
                    minWidth: 80,
                    height: 80,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    borderColor: "grey.300",
                    color: itemData.portionSizeTag === option.value ? "white" : "text.secondary",
                    bgcolor: itemData.portionSizeTag === option.value ? "error.main" : "transparent",
                    "&:hover": {
                      bgcolor: itemData.portionSizeTag === option.value ? "error.dark" : "grey.50",
                      borderColor: "error.main",
                    },
                  }}
                >
                  {getPortionIcon(option.value)}
                  <Typography variant="caption" sx={{ textAlign: "center", lineHeight: 1.2 }}>
                    {getPortionLabel(option.value)}
                  </Typography>
                </Button>
              ))}
            </Box>
          </Box>

        </Grid>

        {/* Right Column - Image */}
        <Grid component="div" size={{ xs: 12, md: 5 }}>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Imagem do item
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
              Apareça na imagem e no detalhe do prato
            </Typography>

            <Paper
              sx={{
                border: "2px dashed #e0e0e0",
                borderRadius: 2,
                p: 3,
                textAlign: "center",
                minHeight: 200,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "grey.50",
              }}
            >
              {itemData.logoUrl ? (
                <Box sx={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                  <img
                    src={itemData.logoUrl ?
                      itemData.logoUrl.startsWith('https') ?
                        itemData.logoUrl
                        : `https://static.ifood-static.com.br/image/upload/t_low/pratos/${itemData.logoUrl}`
                      : "/placeholder.svg"}
                    alt={itemData.description || "Item image"}
                    style={{
                      height: 180,
                      width: 180,
                      objectFit: "cover",
                      borderRadius: 8,
                      marginBottom: 16,
                      aspectRatio: "1/1"
                    }}
                  />

                  {/* AI Enhancement Button */}
                  <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                    <Button
                      startIcon={<AIEnhanceIcon fontSize="small" />}
                      onClick={startEnhancement}
                      disabled={aiState.isEnhancing}
                      size="small"
                      variant="outlined"
                      color="primary"
                      sx={{ minWidth: 120 }}
                    >
                      {aiState.isEnhancing ? 'Processando...' : 'Melhorar com IA'}
                    </Button>

                    {aiState.isEnhancing && (
                      <Button
                        onClick={cancelEnhancement}
                        size="small"
                        variant="outlined"
                        color="error"
                      >
                        Cancelar
                      </Button>
                    )}
                  </Box>

                  {/* Progress and Status */}
                  {aiState.isEnhancing && (
                    <Box sx={{ width: '100%', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CircularProgress size={16} />
                        <Typography variant="caption" color="text.secondary">
                          {getStatusMessage()}
                        </Typography>
                      </Box>
                      <Box sx={{ width: '100%', bgcolor: 'grey.200', borderRadius: 1, height: 4 }}>
                        <Box
                          sx={{
                            width: `${aiState.progress}%`,
                            height: '100%',
                            bgcolor: 'primary.main',
                            borderRadius: 1,
                            transition: 'width 0.3s ease'
                          }}
                        />
                      </Box>
                    </Box>
                  )}

                  {/* Error Alert */}
                  {aiState.error && (
                    <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
                      {aiState.error}
                    </Alert>
                  )}

                  {/* Success Alert */}
                  {aiState.status === 'completed' && (
                    <Alert severity="success" sx={{ mb: 2, width: '100%' }}>
                      Imagem melhorada com sucesso!
                    </Alert>
                  )}

                  <Button
                    startIcon={<Trash2Icon fontSize="small" />}
                    onClick={() => onDataChange("logoUrl", null)}
                    size="small"
                    color="error"
                    variant="outlined"
                  >
                    Remover
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Box
                    sx={{
                      width: 180,
                      height: 180,
                      bgcolor: "white",
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                      mx: "auto",
                      aspectRatio: "1/1"
                    }}
                  >
                    <ImagePlusIcon fontSize="large" sx={{ color: "#ccc" }} />
                  </Box>
                  <Button
                    startIcon={<ImagePlusIcon fontSize="small" />}
                    // onClick={() => setImageUploadModalOpen(true)}
                    variant="outlined"
                    color="error"
                  >
                    Escolher imagem
                  </Button>
                </Box>
              )}
            </Paper>

            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: "block", textAlign: "center" }}>
              Formatos: JPG, PNG, HEIC
              <br />
              Peso máximo: <strong>20 MB</strong>
              <br />
              Resolução mínima: <strong>300x275</strong>
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* <ImageUploadModal
        open={imageUploadModalOpen}
        onClose={() => setImageUploadModalOpen(false)}
        onImageSave={handleImageSave}
      /> */}
    </Box>
  )
}
