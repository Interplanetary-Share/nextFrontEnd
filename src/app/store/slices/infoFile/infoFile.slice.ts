import { createSlice } from '@reduxjs/toolkit';
import { persistor } from '../../store';
import { fetchInfoFileRemotelyReducer } from './infoFile.action';

export interface IInfoFile {
  cid: string;
  size: number;
  type: string;
  lastModified: number;
  fetchInfoFileRemotely: {
    loading: boolean;
    error: string;
  };
}

const initialState: IInfoFile = {
  cid: '',
  size: 0,
  type: '',
  lastModified: 0,
  fetchInfoFileRemotely: {
    loading: false,
    error: '',
  },
};

const infoFileSlice = createSlice({
  name: 'infoFile',
  initialState,
  reducers: {
    setCidFile: (state, action) => {
      state.cid = action.payload;
    },
  },
  extraReducers: {
    ...fetchInfoFileRemotelyReducer,
  },
});

export const { setCidFile } = infoFileSlice.actions;

export default infoFileSlice.reducer;
