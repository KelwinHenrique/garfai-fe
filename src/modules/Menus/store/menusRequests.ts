import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMenusList } from "../types/IMenusList";
import axiosServices from "@/shared/services/api";
import { IPayload } from "@/shared/types/IPayload";


export const fetchMenus = createAsyncThunk(
  'menus/fetchMenus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosServices.get('/menus');

      console.log('response', response)

      const menus = response.data.data as IPayload<IMenusList>;
      return menus;
    } catch (error) {
      console.log('error', error)
      return rejectWithValue('Failed to fetch access');
    }
  }
);

// export const createMenu = createAsyncThunk(
//   'menus/createMenu',
//   async (body: IFormCreateMenuValues, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`/menus`, body);
//       const { menu } = response.data;
//       return { menu };
//     } catch (error) {
//       return rejectWithValue('create menu failed');
//     }
//   }
// );

// export const updateChatsConfigDetail = createAsyncThunk(
//   'menus/updateChatsConfig',
//   async ({ menuId, body }: { menuId: string; body: IChatFormData }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(`/menus/${menuId}`, body);
//       const { menu } = response.data;
//       return { menu };
//     } catch (error) {
//       return rejectWithValue('Login failed');
//     }
//   }
// );