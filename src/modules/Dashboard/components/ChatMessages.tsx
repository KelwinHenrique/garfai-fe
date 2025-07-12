import React, { useState, useEffect, useRef } from 'react'
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Fade,
  Slide,
  Grow
} from '@mui/material'
import {
  Send as SendIcon,
  WhatsApp as WhatsAppIcon,
  Store as StoreIcon
} from '@mui/icons-material'

interface Mensagem {
  id: string
  chatId: string
  remetente: 'cliente' | 'loja'
  mensagem: string
  tempo: string
  status: string
}

interface ChatMessagesProps {
  chatId: string
  mensagens: Mensagem[]
  clienteNome: string
  onSendMessage?: (message: string) => void
}

export function ChatMessages({ chatId, mensagens, clienteNome, onSendMessage }: ChatMessagesProps) {
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [mensagens])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage?.(newMessage)
      setNewMessage('')
      setIsTyping(true)
      
      // Simular digitação
      setTimeout(() => {
        setIsTyping(false)
      }, 1000)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  const filteredMessages = mensagens.filter(msg => msg.chatId === chatId)

  return (
    <Fade in timeout={800}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Paper 
          elevation={1} 
          sx={{ 
            p: 2, 
            borderBottom: 1, 
            borderColor: 'divider',
            backgroundColor: 'primary.main',
            color: 'white'
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: 'white', color: 'primary.main' }}>
              <WhatsAppIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                {clienteNome}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Chat via WhatsApp
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Messages */}
        <Box 
          sx={{ 
            flex: 1, 
            overflowY: 'auto', 
            p: 2,
            backgroundColor: 'grey.50',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          {filteredMessages.map((mensagem, index) => (
            <Slide 
              key={mensagem.id} 
              direction={mensagem.remetente === 'cliente' ? 'left' : 'right'} 
              in 
              timeout={200 + index * 100}
            >
              <Box
                display="flex"
                justifyContent={mensagem.remetente === 'cliente' ? 'flex-start' : 'flex-end'}
              >
                <Box
                  sx={{
                    maxWidth: '70%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: mensagem.remetente === 'cliente' ? 'flex-start' : 'flex-end'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      gap: 1,
                      mb: 0.5
                    }}
                  >
                    {mensagem.remetente === 'cliente' && (
                      <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                        {clienteNome.charAt(0)}
                      </Avatar>
                    )}
                    <Paper
                      elevation={1}
                      sx={{
                        p: 1.5,
                        backgroundColor: mensagem.remetente === 'cliente' ? 'white' : 'primary.main',
                        color: mensagem.remetente === 'cliente' ? 'text.primary' : 'white',
                        borderRadius: 2,
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          [mensagem.remetente === 'cliente' ? 'left' : 'right']: -8,
                          width: 0,
                          height: 0,
                          borderStyle: 'solid',
                          borderWidth: '8px 0 8px 8px',
                          borderColor: `transparent transparent transparent ${
                            mensagem.remetente === 'cliente' ? 'white' : 'primary.main'
                          }`,
                          transform: mensagem.remetente === 'cliente' ? 'none' : 'rotate(180deg)'
                        }
                      }}
                    >
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                        {mensagem.mensagem}
                      </Typography>
                    </Paper>
                    {mensagem.remetente === 'loja' && (
                      <Avatar sx={{ width: 24, height: 24, bgcolor: 'success.main' }}>
                        <StoreIcon fontSize="small" />
                      </Avatar>
                    )}
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 3 }}>
                    {mensagem.tempo}
                  </Typography>
                </Box>
              </Box>
            </Slide>
          ))}
          
          {isTyping && (
            <Grow in timeout={300}>
              <Box display="flex" justifyContent="flex-end">
                <Box
                  sx={{
                    maxWidth: '70%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end'
                  }}
                >
                  <Box display="flex" alignItems="flex-end" gap={1}>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 1.5,
                        backgroundColor: 'primary.main',
                        color: 'white',
                        borderRadius: 2
                      }}
                    >
                      <Typography variant="body2">
                        Digitando...
                      </Typography>
                    </Paper>
                    <Avatar sx={{ width: 24, height: 24, bgcolor: 'success.main' }}>
                      <StoreIcon fontSize="small" />
                    </Avatar>
                  </Box>
                </Box>
              </Box>
            </Grow>
          )}
          
          <div ref={messagesEndRef} />
        </Box>

        {/* Input */}
        <Paper 
          elevation={1} 
          sx={{ 
            p: 2, 
            borderTop: 1, 
            borderColor: 'divider',
            backgroundColor: 'white'
          }}
        >
          <Box display="flex" gap={1} alignItems="flex-end">
            <TextField
              fullWidth
              multiline
              maxRows={3}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              variant="outlined"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3
                }
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark'
                },
                '&.Mui-disabled': {
                  bgcolor: 'grey.300',
                  color: 'grey.500'
                }
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    </Fade>
  )
} 