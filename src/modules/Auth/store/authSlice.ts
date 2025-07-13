import { createSlice } from '@reduxjs/toolkit';
import { IUserAccessPopulated } from '../types/IUserAccess';
import { fetchMyUserAccess, getMe } from './authRequests';
import { IUser } from '../types/IUser';

interface IAuthState {
  loadingUserAccess: boolean;
  userAccess: IUserAccessPopulated[] | null;
  selectedAccess: IUserAccessPopulated | null;
  user: IUser | null;
  loadingUser: boolean;
}

const initialState: IAuthState = {
  loadingUserAccess: false,
  userAccess: null,
  selectedAccess: null,
  user: null,
  loadingUser: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSelectedAccess: (state, action) => {
      state.selectedAccess = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    logout: (state) => {
      state.user = null;
      state.userAccess = null;
      state.selectedAccess = null;
      state.loadingUser = false;
      state.loadingUserAccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyUserAccess.pending, (state) => {
        state.loadingUserAccess = true;
      })
      .addCase(fetchMyUserAccess.fulfilled, (state, action) => {
        state.loadingUserAccess = false;
        state.userAccess = action.payload;
      })
      .addCase(fetchMyUserAccess.rejected, (state) => {
        state.loadingUserAccess = false;
      })
      .addCase(getMe.pending, (state) => {
        state.loadingUser = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loadingUser = false;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state) => {
        state.loadingUser = false;
      });
  },
});

export const { setSelectedAccess, clearUser, logout } = authSlice.actions;
export default authSlice.reducer; 