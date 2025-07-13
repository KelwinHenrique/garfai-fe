import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchItemDetail, fetchMenuDetail } from './menuRequests';
import { IMenu } from '../models/IMenu';
import { IItemDetail } from '../models/IItem';

export enum EItemDetailModalType {
  EDIT = "EDIT",
  CREATE = "CREATE"
}

interface IMenuState {
  loading: boolean;
  menu: IMenu;
  itemDetailModal: {
    itemId: string | null;
    categoryId: string;
    menuId: string;
    isLoadingItemDetailModal: boolean,
    isOpen: boolean;
    type: EItemDetailModalType
    item: IItemDetail | null;
  }
}

const initialState: IMenuState = {
  loading: false,
  menu: {} as IMenu,
  itemDetailModal: {
    itemId: null,
    categoryId: "",
    menuId: "",
    isLoadingItemDetailModal: false,
    isOpen: false,
    type: EItemDetailModalType.CREATE,
    item: null
  }
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleItemDetailModal: (state, action: PayloadAction<{ itemId?: string, categoryId: string, menuId: string, type: EItemDetailModalType }>) => {
      state.itemDetailModal.isOpen = !state.itemDetailModal.isOpen;

      if (state.itemDetailModal.isOpen && action.payload.itemId && action.payload.categoryId && action.payload.menuId && action.payload.type) {
        state.itemDetailModal.itemId = action.payload.itemId;
        state.itemDetailModal.categoryId = action.payload.categoryId;
        state.itemDetailModal.menuId = action.payload.menuId;
        state.itemDetailModal.type = action.payload.type;
        state.itemDetailModal.item = null;
      } else {
        state.itemDetailModal.itemId = null;
        state.itemDetailModal.categoryId = action.payload.categoryId;
        state.itemDetailModal.menuId = action.payload.menuId;
        state.itemDetailModal.type = EItemDetailModalType.CREATE;
        state.itemDetailModal.item = null;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenuDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.menu = action.payload;
      })
      .addCase(fetchMenuDetail.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchItemDetail.pending, (state) => {
        state.itemDetailModal.isLoadingItemDetailModal = true;
      })
      .addCase(fetchItemDetail.fulfilled, (state, action) => {
        state.itemDetailModal.isLoadingItemDetailModal = false;
        state.itemDetailModal.item = action.payload;
        state.itemDetailModal.type = EItemDetailModalType.EDIT;
      })
      .addCase(fetchItemDetail.rejected, (state) => {
        state.itemDetailModal.isLoadingItemDetailModal = false;
      })
  },
});

export const { toggleItemDetailModal } = menuSlice.actions;
export default menuSlice.reducer; 