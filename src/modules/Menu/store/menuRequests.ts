import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMenu } from "../models/IMenu";
import { IItemDetail } from "../models/IItem";
import axiosServices from "@/shared/services/api";
import { IAIEnhancementRequest, IAIEnhancementResponse, IAIJobStatusResponse } from "../models/ICreateUpdateItemDetailBody"


export const fetchMenuDetail = createAsyncThunk(
  'menu/fetchMenuDetail',
  async (menuId: string, { rejectWithValue }) => {
    try {
      const response = await axiosServices.get(`/menu/${menuId}`);

      console.log('response', response)

      const chat = response.data.data as IMenu;
      return chat;
    } catch {
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
    } catch {
      return rejectWithValue('Failed to fetch item');
    }
  }
);

// AI Image Enhancement
export const enhanceImageWithAI = async (data: IAIEnhancementRequest): Promise<IAIEnhancementResponse> => {
  const response = await axiosServices.post('/agents/food-image', data)
  return response.data
}

export const getAIJobStatus = async (jobId: string): Promise<IAIJobStatusResponse> => {
  const response = await axiosServices.get(`/agents/food-image/job/${jobId}`)
  return response.data
}