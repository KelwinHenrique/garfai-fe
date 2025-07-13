"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Tabs, Tab, Box, Button, Typography, Paper, Container, Toolbar, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Alert } from "@mui/material"
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material"
import { EPortionSize } from "../../models/IMenu"
import { EItemDetailModalType, toggleItemDetailModal } from "../../store/menuSlice"
import { fetchItemDetail, fetchMenuDetail } from "../../store/menuRequests"
import { ItemDetailsTab } from "./Tabs/ItemDetailsTab/ItemDetailsTab"
import { ItemPriceTab } from "./Tabs/ItemPriceTab/ItemPriceTab"
import { Form, Formik, FormikProps } from "formik"
import * as yup from "yup"
import { isEqual } from "lodash"
import { ICreateUpdateItemDetailBody } from "../../models/ICreateUpdateItemDetailBody"
import { useAppDispatch, useAppSelector } from "@/store"

const TABS = ["Detalhes", "Preço"]

const validationSchema = yup.object<ICreateUpdateItemDetailBody>({
  description: yup.string()
    .min(3, "Nome do item deve ter pelo menos 3 caracteres")
    .max(80, "Nome do item não pode ter mais que 80 caracteres")
    .required("Nome do item é obrigatório"),
  details: yup.string()
    .max(1000, "Descrição não pode ter mais que 1000 caracteres"),
  unitOriginalPrice: yup.number()
    .min(0, "Preço não pode ser negativo")
    .required("Preço é obrigatório"),
  unitPrice: yup.number()
    .min(0, "Preço Com Desconto não pode ser negativo")
    .required("Preço Com Desconto é obrigatório")
    .test('less-than-original', 'O preço com desconto não pode ser maior que o preço original', function (value) {
      const { unitOriginalPrice } = this.parent;
      if (!unitOriginalPrice || !value) return true;
      return value <= unitOriginalPrice;
    }),
  logoUrl: yup.string()
    .nullable(),

  pdvCode: yup.string()
    .max(40, "Código PDV não pode ter mais que 40 caracteres"),
  portionSizeTag: yup.mixed<EPortionSize>()
    .oneOf(Object.values(EPortionSize))
    .required("Tamanho da porção é obrigatório"),
})

export const ItemModal = () => {
  const dispatch = useAppDispatch();
  const { itemId, categoryId, menuId, type, item, isOpen } = useAppSelector((state) => state.menu.itemDetailModal);
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const formikRef = useRef<FormikProps<ICreateUpdateItemDetailBody> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldReloadMenu, setShouldReloadMenu] = useState(false);

  useEffect(() => {
    setActiveTab(TABS[0])
    if (itemId && categoryId && menuId && type) {
      console.log("fetching item detail", itemId)
      dispatch(fetchItemDetail(itemId));
    }
  }, [itemId, categoryId, menuId, type, dispatch]);

  const getInitialValues = (): ICreateUpdateItemDetailBody => {
    if (item) {
      return {
        description: item.description,
        details: item.details ?? "",
        unitPrice: item.unitPrice,
        unitOriginalPrice: item.unitOriginalPrice || 0,
        pdvCode: item.pdvCode,
        logoUrl: item.logoUrl,
        portionSizeTag: item.portionSizeTag || EPortionSize.NOT_APPLICABLE,
        choices: item.choices || []
      };
    }

    return {
      description: "",
      details: "",
      unitPrice: 0,
      unitOriginalPrice: 0,
      pdvCode: "",
      logoUrl: null,
      portionSizeTag: EPortionSize.NOT_APPLICABLE,
      choices: []
    };
  };

  const handleClose = () => {
    const formik = formikRef.current;
    if (formik && !isEqual(formik.initialValues, formik.values)) {
      setShowUnsavedDialog(true);
    } else {
      // Se houve alterações salvas, recarrega o menu
      if (shouldReloadMenu) {
        dispatch(fetchMenuDetail(menuId));
        setShouldReloadMenu(false);
      }
      
      dispatch(toggleItemDetailModal({ categoryId, menuId, type }));
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const handleConfirmClose = () => {
    setShowUnsavedDialog(false);
    
    // Se houve alterações salvas, recarrega o menu
    if (shouldReloadMenu) {
      dispatch(fetchMenuDetail(menuId));
      setShouldReloadMenu(false);
    }
    
    dispatch(toggleItemDetailModal({ categoryId, menuId, type }));
  };

  const handleCancelClose = () => {
    setShowUnsavedDialog(false);
  };

  const handleSave = async (values: ICreateUpdateItemDetailBody) => {
    // console.log("Salvando valores:", values);
    // if (type === EItemDetailModalType.EDIT && (!itemId || !categoryId || !menuId)) {
    //   toast.error("Erro ao salvar item");
    //   return;
    // }

    // if (type === EItemDetailModalType.CREATE && (!categoryId || !menuId)) {
    //   toast.error("Erro ao salvar item");
    //   return;
    // }

    // setIsLoading(true);
    // let response;

    // try {
    //   if (type === EItemDetailModalType.EDIT) {
    //     response = await dispatch(updateItemDetail(itemId));
    //     console.log("response", response);
    //     if (response.meta.requestStatus === 'rejected') {
    //       // Captura a mensagem específica de erro do backend
    //       const errorMessage = response.payload as string;
    //       throw new Error(errorMessage || 'Falha ao atualizar item');
    //     }
        
    //     toast.success("Item salvo com sucesso");
    //     // Marca que o menu deve ser recarregado após fechar o modal
    //     setShouldReloadMenu(true);
    //   } else {
    //     // todo: create item
    //   }
    //   console.log("response", response);
    //   const itemIdForRequest = response?.payload?.id || itemId;

    //   await dispatch(fetchItemDetail(itemIdForRequest));

    // } catch (error: any) {
    //   console.log("error", error);
    //   console.log("error.message", error.message);
    //   console.log("error.response", error.response);
    //   // Exibe a mensagem específica de erro do backend
    //   const errorMessage = error.message || "Erro ao salvar item";
    //   console.log("Exibindo toast com mensagem:", errorMessage);
    //   toast.error(errorMessage);
    // }
    // setIsLoading(false);
  };

  const renderTabContent = (formik: FormikProps<ICreateUpdateItemDetailBody>) => {
    const props = { itemData: formik.values, onDataChange: formik.setFieldValue };
    switch (activeTab) {
      case TABS[0]: return <ItemDetailsTab {...props} />;
      case TABS[1]: return <ItemPriceTab {...props} />;
      default: return <ItemDetailsTab {...props} />;
    }
  };

  const pageTitle = type === EItemDetailModalType.EDIT ? item?.description || "Editar Item" : "Novo Item";

  return (
    <>
      <Dialog fullScreen open={isOpen} onClose={handleClose}>
        <Formik
          initialValues={getInitialValues()}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("✔️ Submit acionado!", values);
            handleSave(values);
          }}
          enableReinitialize={true}
          validateOnChange={false}
          validateOnBlur={false}
          validateOnMount={false}
          innerRef={formikRef}
        >
          {(formik) => (
            <Form>
              <Paper elevation={1} sx={{ position: "sticky", top: 0, zIndex: 1100, bgcolor: "background.paper" }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={handleClose}><ArrowBackIcon fontSize="small" /></IconButton>
                    <Typography variant="h6" sx={{ fontWeight: 600, marginLeft: 1 }}>{pageTitle}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button onClick={handleClose} color="inherit">Cancelar</Button>
                    <Button
                      onClick={formik.submitForm}
                      variant="contained"
                      color="error"
                      loading={isLoading}
                    >
                      {type === EItemDetailModalType.EDIT ? "Salvar Alterações" : "Salvar Item"}
                    </Button>
                  </Box>
                </Toolbar>
              </Paper>

              {Object.keys(formik.errors).length > 0 && formik.submitCount > 0 && (
                <Container maxWidth="lg" sx={{ mt: 2 }}>
                  <Alert severity="error" sx={{ whiteSpace: 'pre-wrap' }}>
                    <Typography variant="subtitle1" fontSize={'1rem'} fontWeight={600}>Corrija os erros abaixo para poder salvar:</Typography>
                    <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                      {Object.entries(formik.errors).map(([key, value]) => {
                        // Tratamento especial para erros de choices (complementos)
                        if (key === 'choices' && Array.isArray(value)) {
                          return value.map((choiceError, index) => {
                            if (typeof choiceError === 'object' && choiceError !== null) {
                              return Object.entries(choiceError).map(([choiceKey, choiceValue]) => {
                                if (typeof choiceValue === 'string') {
                                  return (
                                    <li key={`${key}-${index}-${choiceKey}`}>
                                      <strong>Complemento {index + 1}:</strong> {choiceValue}
                                    </li>
                                  );
                                }
                                return null;
                              });
                            }
                            return null;
                          });
                        }
                        
                        // Para outros erros
                        return (
                          <li key={key}>
                            {typeof value === 'string' ? value : `Campo inválido: ${key}`}
                          </li>
                        );
                      })}
                    </ul>
                  </Alert>
                </Container>
              )}

              <Box sx={{ borderBottom: 1, borderColor: "divider", position: "sticky", top: 64, bgcolor: "background.paper", zIndex: 1000 }}>
                <Container maxWidth="lg" sx={{ px: 0 }}>
                  <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    {TABS.map((tabName) => (
                      <Tab label={tabName} value={tabName} key={tabName} />
                    ))}
                  </Tabs>
                </Container>
              </Box>

              <Container maxWidth="lg" sx={{ py: 3 }}>
                {renderTabContent(formik)}
              </Container>
            </Form>
          )}
        </Formik>
      </Dialog>

      <Dialog open={showUnsavedDialog} onClose={handleCancelClose}>
        <DialogTitle>Alterações não salvas</DialogTitle>
        <DialogContent>
          <Typography>
            Você tem alterações não salvas. Deseja realmente sair? Todas as alterações serão perdidas.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClose} color="inherit">Cancelar</Button>
          <Button onClick={handleConfirmClose} color="error" variant="contained">Sair sem salvar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
