import { createSlice } from '@reduxjs/toolkit';
import { fetchFilesFromDbReducer } from './allFiles.action';

export interface IAllFiles {
  basicList: [];
  fetchFilesFromDb: {
    loading: boolean;
    error: string;
  };
}

const initialState: IAllFiles = {
  basicList: [],
  fetchFilesFromDb: {
    loading: false,
    error: '',
  },
};

const allFilesSlice = createSlice({
  name: 'allFiles',
  initialState,
  reducers: {},
  extraReducers: {
    ...fetchFilesFromDbReducer,
  },
});

// export const {} = allFilesSlice.actions;

export default allFilesSlice.reducer;
