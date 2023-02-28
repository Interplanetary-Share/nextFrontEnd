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
  filters: {
    mode: string;
    period: string;
    type: string;
    tags: Array<string>;
    sortMode: string;
  };
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
  filters: {
    mode: 'all', // 'all', 'favorites', 'reports', 'likes', 'dislikes' // disabled
    period: '', // 'all', 'today', 'week', 'month', 'year' // disabled
    type: '', // 'all', 'image', 'video', 'audio', 'document', 'archive', 'other' // diabled
    tags: [],
    sortMode: 'likes',
  },
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
  reducers: {
    setEmptyFiltersBasicList(state) {
      state.filters = initialState.filters;
    },
    setFiltersBasicList(state, action) {
      const { mode, period, type, tags, sortMode } = action.payload;
      if (mode) state.filters.mode = mode;
      if (period) state.filters.period = period;
      if (type) state.filters.type = type;
      if (tags) state.filters.tags = tags;
      if (sortMode) state.filters.sortMode = sortMode;
    },
  },
  extraReducers: {
    ...fetchFilesFromDbReducer,
    ...fetchStatsFileReducer,
  },
});

export const { setFiltersBasicList, setEmptyFiltersBasicList } =
  allFilesSlice.actions;

export default allFilesSlice.reducer;
