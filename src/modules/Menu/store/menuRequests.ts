import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMenu } from "../models/IMenu";
import { IItemDetail } from "../models/IItem";
import axiosServices from "@/shared/services/api";


export const fetchMenuDetail = createAsyncThunk(
  'menu/fetchMenuDetail',
  async (menuId: string, { rejectWithValue }) => {
    try {
      const response = await axiosServices.get(`/menu/${menuId}`);

      console.log('response', response)

      const chat = response.data.data as IMenu;
      return chat;
    } catch (error) {
      return rejectWithValue('Failed to fetch access');
    }
  }
);

export const fetchItemDetail = createAsyncThunk(
  'menu/fetchItemDetail',
  async (itemId: string, { rejectWithValue }) => {
    try {
      console.log("fetching item detail reducer", itemId)
      const response = await axiosServices.get(`/menu/item/${itemId}`);

      const item = response.data.data as IItemDetail;
      return item;
    } catch (error) {
      return rejectWithValue('Failed to fetch item');
    }
  }
);