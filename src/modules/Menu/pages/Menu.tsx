import { Box, Button, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMenuDetail } from '../store/menuRequests';
import AddIcon from '@mui/icons-material/Add';
import { CategoryCard } from '../components/CategoryCard/categoryCard';
import { ItemModal } from '../components/ItemModal/ItemModal';
import { EImportMenuStatus } from '../models/IMenu';
import { useAppDispatch, useAppSelector } from '@/store';

const ChatForms = () => {
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();
  const menu = useAppSelector(state => state.menu.menu);

  useEffect(() => {
    if (id) {
      dispatch(fetchMenuDetail(id));
    }
  }, [dispatch, id]);

  const renderMenuContent = () => {
    if (!menu?.menuStatus) return null;

    switch (menu.menuStatus) {
      case EImportMenuStatus.SCHEDULED:
      case EImportMenuStatus.PROCESSING:
      case EImportMenuStatus.FAILED:
      case EImportMenuStatus.COMPLETED:
      case EImportMenuStatus.NOT_IMPORTED:
        return (
          <>
            <ItemModal />
            {menu?.categories?.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="h6" gutterBottom>
                  Nenhuma categoria criada ainda
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Comece criando sua primeira categoria para organizar seus itens no cardápio.
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<AddIcon fontSize="small" />}
                  fullWidth={isMobile}
                >
                  Criar primeira categoria
                </Button>
              </Paper>
            ) : (
              menu?.categories?.map((category) => (
                <CategoryCard key={category.id} menuId={id as string} category={category} />
              ))
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      {renderMenuContent()}
    </Box>
  );
};

export default ChatForms;
