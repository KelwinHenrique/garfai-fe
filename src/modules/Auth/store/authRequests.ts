import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosServices from "@/shared/services/api";
import { IUserAccessPopulated } from "../types/IUserAccess";
import { IUser } from "../types/IUser";

export const fetchMyUserAccess = createAsyncThunk(
  'auth/fetchMyUserAccess',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosServices.get('/user-access/my-user-access');

      console.log('response', response)

      const userAccess = response.data.data as IUserAccessPopulated[] ;
      return userAccess;
    } catch (error) {
      console.log('error', error)
      return rejectWithValue('Failed to fetch orders kanban',);
    }
  }
);

/**
 * Busca os dados do usuário logado
 * Endpoint: GET /auth/me
 * 
 * Exemplo de uso:
 * const dispatch = useAppDispatch();
 * const user = useAppSelector((state) => state.auth.user);
 * const loadingUser = useAppSelector((state) => state.auth.loadingUser);
 * 
 * useEffect(() => {
 *   dispatch(getMe());
 * }, [dispatch]);
 */
export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosServices.get('/auth/me');
      
      console.log('getMe response', response);
      
      const user = response.data.data as IUser;
      return user;
    } catch (error) {
      console.log('getMe error', error);
      return rejectWithValue('Failed to fetch user data');
    }
  }
);
