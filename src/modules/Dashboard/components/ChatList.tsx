import React, { useState } from 'react'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Badge,
  Chip,
  Paper,
  Fade,
  Slide,
  Divider
} from '@mui/material'
import {
  WhatsApp as WhatsAppIcon,
  Circle as CircleIcon,
  Chat as ChatIcon
} from '@mui/icons-material'

interface Chat {
  id: string
  cliente: string
  telefone: string
  ultimaMensagem: string
  tempo: string
  status: 'online' | 'offline'
  unread: number
  pedidoAtivo: string | null
}

interface ChatListProps {
  chats: Chat[]
  onChatSelect?: (chatId: string) => void
}

export function ChatList({ chats, onChatSelect }: ChatListProps) {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)

  const handleChatClick = (chatId: string) => {
    setSelectedChat(chatId)
    onChatSelect?.(chatId)
  }

  return (
    <Fade in timeout={800}>
      <Box>
        <Typography variant="h6" fontWeight={600} mb={2} color="primary">
          Conversas Ativas
        </Typography>
        <Paper 
          elevation={2} 
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
            maxHeight: 500,
            overflowY: 'auto'
          }}
        >
          <List sx={{ p: 0 }}>
            {chats.map((chat, index) => (
              <Slide 
                key={chat.id} 
                direction="left" 
                in 
                timeout={200 + index * 100}
              >
                <Box>
                  <ListItem
                    onClick={() => handleChatClick(chat.id)}
                    sx={{
                      transition: 'all 0.2s ease-in-out',
                      cursor: 'pointer',
                      backgroundColor: selectedChat === chat.id ? 'primary.light' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                        transform: 'translateX(4px)'
                      }
                    }}
                  >
                    <ListItemAvatar>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                          <CircleIcon 
                            sx={{ 
                              fontSize: 12,
                              color: chat.status === 'online' ? 'success.main' : 'grey.400'
                            }} 
                          />
                        }
                      >
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <ChatIcon />
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body1" fontWeight={600}>
                            {chat.cliente}
                          </Typography>
                          {chat.pedidoAtivo && (
                            <Chip
                              label="Pedido Ativo"
                              size="small"
                              color="success"
                              variant="outlined"
                              sx={{ fontSize: '0.7rem' }}
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {chat.ultimaMensagem}
                          </Typography>
                          <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                            <WhatsAppIcon fontSize="small" color="success" />
                            <Typography variant="caption" color="text.secondary">
                              {chat.telefone}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              • {chat.tempo}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                      {chat.unread > 0 && (
                        <Badge
                          badgeContent={chat.unread}
                          color="error"
                          sx={{
                            '& .MuiBadge-badge': {
                              fontSize: '0.7rem',
                              minWidth: 18,
                              height: 18
                            }
                          }}
                        >
                          <Box width={8} height={8} />
                        </Badge>
                      )}
                    </Box>
                  </ListItem>
                  {index < chats.length - 1 && <Divider />}
                </Box>
              </Slide>
            ))}
          </List>
        </Paper>
      </Box>
    </Fade>
  )
} 