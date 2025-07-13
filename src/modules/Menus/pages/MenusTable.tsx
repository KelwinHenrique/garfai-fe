import React, { useEffect } from 'react';
import {
  Box,
  Chip,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { fetchMenus } from '../store/menusRequests';
import { useAppDispatch, useAppSelector } from '@/store';
import { EImportMenuStatus } from '../types/IMenusList';


const MenusTable: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const menu = useAppSelector(state => state.menus.menus);
  const loadingTable = useAppSelector(state => state.menus.loadingTable);
  function renderActive(status: boolean) {

    const colors = status ? 'success' : 'default'
    const label = status ? 'Ativo' : 'Inativo'

    return <Chip label={label} color={colors} size="small" />;
  }

  function renderDate(date: string) {
    return <Box fontWeight={400}>
      {new Date(date).toLocaleDateString('pt-BR')} {new Date(date).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
    </Box>;
  }

  function renderMenuStatus(status: EImportMenuStatus) {
    let color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    let label: string;

    switch (status) {
      case EImportMenuStatus.NOT_IMPORTED:
        color = 'default';
        label = 'Criado manualmente';
        break;
      case EImportMenuStatus.SCHEDULED:
        color = 'info';
        label = 'Agendado';
        break;
      case EImportMenuStatus.PROCESSING:
        color = 'warning';
        label = 'Processando';
        break;
      case EImportMenuStatus.COMPLETED:
        color = 'success';
        label = 'Concluído';
        break;
      case EImportMenuStatus.FAILED:
        color = 'error';
        label = 'Falhou';
        break;
      default:
        color = 'default';
        label = 'Desconhecido';
    }

    return <Chip label={label} color={color} size="small" />;
  }

  
  
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      flex: 1.5,
      minWidth: 200
    },
    {
      field: 'createdAt',
      headerName: 'Criado em',
      flex: 1.5,
      minWidth: 200,
      renderCell: (params) => renderDate(params.value as any),
    },
    {
      field: 'menuStatus',
      headerName: 'Status da Importação',
      type: 'string',
      flex: 0.5,
      minWidth: 180,
      renderCell: (params) => renderMenuStatus(params.value as any),
    },
    {
      field: 'isActive',
      headerName: 'Ativo',
      type: 'boolean',
      flex: 0.5,
      minWidth: 80,
      renderCell: (params) => renderActive(params.value as any),
    },
  ];

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  return (
    <Box>
      <Box>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Menus
            </Typography>
            <Typography variant="body1" fontWeight={400}>
              Gerencie os menus da sua loja, você pode ter apenas 1 menu ativo por vez.
            </Typography>
          </Box>
        </Box>
      </Box>

      <DataGrid
        rows={menu?.rows || []}
        columns={columns}
        loading={loadingTable}
        paginationMode="server"
        rowCount={menu?.count || 0}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20, page: 0 } },
        }}
        onRowClick={(params) => navigate(`/menus/${params.id}`)}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density="compact"
        slotProps={{
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: {
                variant: 'outlined',
                size: 'small',
              },
              columnInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              operatorInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: 'outlined',
                  size: 'small',
                },
              },
            },
          },
        }}
        sx={{
          '& .MuiDataGrid-row': {
            cursor: 'pointer',
          },
        }}
      />
    </Box>
  );
};

export default MenusTable;
