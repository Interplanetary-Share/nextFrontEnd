import { createSlice } from '@reduxjs/toolkit';
import {
  fetchDownloadFileReducer,
  fetchInfoFileFromDbReducer,
  fetchInfoFileRemotelyReducer,
} from './infoFile.action';

export interface IInfoFile {
  cid: string;
  size: number;
  type: string;
  lastModified: number;

  // db
  name: string;
  description: string;
  tags: string[];
  cover: string;
  date: string;

  link: string;

  fetchInfoFileRemotely: {
    loading: boolean;
    error: string;
  };
  fetchInfoFileFromDb: {
    loading: boolean;
    error: string;
  };
  fetchDownloadFile: {
    loading: boolean;
    error: string;
  };
}

const initialState: IInfoFile = {
  cid: '',
  size: 0,
  type: '',
  lastModified: 0,
  // db
  name: '',
  description: '',
  tags: [],
  cover: '',
  date: '',

  link: '',

  fetchInfoFileRemotely: {
    loading: false,
    error: '',
  },
  fetchInfoFileFromDb: {
    loading: false,
    error: '',
  },
  fetchDownloadFile: {
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
    setLinkFile: (state, action) => {
      state.link = action.payload;
    },
  },
  extraReducers: {
    ...fetchInfoFileRemotelyReducer,
    ...fetchInfoFileFromDbReducer,
    ...fetchDownloadFileReducer,
  },
});

export const { setCidFile, setLinkFile } = infoFileSlice.actions;

export default infoFileSlice.reducer;
