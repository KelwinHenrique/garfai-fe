import { createSlice } from '@reduxjs/toolkit';
import { fetchMenus } from './menusRequests';
import { IMenusList } from '../types/IMenusList';
import { IPayload } from '@/shared/types/IPayload';

interface IMenusFilter {
  search: string;
  sort: string;
  page: number;
  limit: number;
}


interface IMenusState {
  loadingTable: boolean;
  menus: IPayload<IMenusList>;
  filter: IMenusFilter;
}

const initialState: IMenusState = {
  loadingTable: false,
  menus: {
    count: 0,
    rows: [] as IMenusList[]
  },
  filter: {
    search: '',
    sort: '',
    page: 1,
    limit: 6
  },
};

const menusSlice = createSlice({
  name: 'menus',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchMenus.pending, (state) => {
      state.loadingTable = true;
    })
    .addCase(fetchMenus.fulfilled, (state, action) => {
      state.loadingTable = false;
      state.menus = action.payload;
    })
    .addCase(fetchMenus.rejected, (state) => {
      state.loadingTable = false;
    })
  },
});

export default menusSlice.reducer; 