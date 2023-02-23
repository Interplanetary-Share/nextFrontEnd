import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { apiFiles } from '../../endpoints';
import { IAllFiles } from './allFiles.slice';

export const fetchFilesFromDb = createAsyncThunk(
  'allFiles/fetchFilesFromDb',
  async (data, { rejectWithValue, getState }) => {
    const files = await axios.get(apiFiles).then((res) => res.data);

    return files;
  }
);
export const fetchFilesFromDbReducer = {
  [fetchFilesFromDb.pending as any]: (state: IAllFiles) => {
    state.fetchFilesFromDb.loading = true;
  },
  [fetchFilesFromDb.fulfilled as any]: (state: IAllFiles, action: any) => {
    state.basicList = action.payload;
    state.fetchFilesFromDb.loading = false;
  },
  [fetchFilesFromDb.rejected as any]: (state: IAllFiles, action: any) => {
    toast.error('Error getting files');
    state.fetchFilesFromDb.loading = false;
    state.fetchFilesFromDb.error = action.error.message;
  },
};
