import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCoverDataReducer,
  fetchDownloadFileReducer,
  fetchFileDataReducer,
  fetchInfoFileFromDbReducer,
  fetchStatsCurrentFileReducer,
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
  coverLink: string;

  likes: string[];
  dislikes: string[];
  favorites: string[];
  reports: string[];

  owner: string;

  found: boolean;

  // fetchInfoFileRemotely: {
  //   loading: boolean;
  //   error: string;
  // };
  fetchInfoFileFromDb: {
    loading: boolean;
    error: string;
  };
  fetchDownloadFile: {
    loading: boolean;
    error: string;
  };
  fetchStatsCurrentFile: {
    loading: boolean;
    error: string;
  };
  fetchFileData: {
    loading: boolean;
    error: string;
  };
  fetchCoverData: {
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
  coverLink: '',

  likes: [],
  dislikes: [],
  favorites: [],
  reports: [],
  owner: '',

  found: true,
  // fetchInfoFileRemotely: {
  //   loading: false,
  //   error: '',
  // },
  fetchInfoFileFromDb: {
    loading: false,
    error: '',
  },
  fetchDownloadFile: {
    loading: false,
    error: '',
  },
  fetchStatsCurrentFile: {
    loading: false,
    error: '',
  },
  fetchFileData: {
    loading: false,
    error: '',
  },
  fetchCoverData: {
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
    setFileLink: (state, action) => {
      const { found, link } = action.payload;
      if (found) state.found = found;
      if (link) state.link = link;
    },
    setCoverLink: (state, action) => {
      const { link } = action.payload;
      if (link) state.coverLink = link;
    },
  },
  extraReducers: {
    // ...fetchInfoFileRemotelyReducer,
    ...fetchInfoFileFromDbReducer,
    ...fetchDownloadFileReducer,
    // ...fetchFileDataReducer,
    // ...fetchCoverDataReducer,
    ...fetchStatsCurrentFileReducer,
  },
});

export const { setCidFile, setFileLink, setCoverLink } = infoFileSlice.actions;

export default infoFileSlice.reducer;
