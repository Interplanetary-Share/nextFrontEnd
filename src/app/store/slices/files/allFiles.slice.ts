import { createSlice } from '@reduxjs/toolkit';
import {
  fetchFilesFromDbReducer,
  fetchStatsFileReducer,
} from './allFiles.action';

export interface ISingleFile {
  _id: string;
  name: string;
  description: string;
  tags: string[];
  type: string;
  size: number | string;
  cid: string;
  date: string;
  __v?: number;
  dislikes: string[];
  favorites: string[];
  likes: string[];
  reports: string[];
}

export interface IAllFiles {
  basicList: Array<ISingleFile>;
  fetchFilesFromDb: {
    loading: boolean;
    error: string;
  };
  fetchStatsFile: {
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
  fetchStatsFile: {
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
    ...fetchStatsFileReducer,
  },
});

// export const {} = allFilesSlice.actions;

export default allFilesSlice.reducer;
