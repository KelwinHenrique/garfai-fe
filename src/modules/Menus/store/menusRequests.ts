import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMenusList } from "../types/IMenusList";
import axiosServices from "@/shared/services/api";
import { IPayload } from "@/shared/types/IPayload";


export const fetchMenus = createAsyncThunk(
  'menus/fetchMenus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosServices.get('/menu');

      console.log('response', response)

      const menus = response.data.data as IPayload<IMenusList>;
      return menus;
    } catch (error) {
      console.log('error', error)
      return rejectWithValue('Failed to fetch access');
    }
  }
);