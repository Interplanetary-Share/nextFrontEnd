import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCreateOrUpdateTagReducer,
  fetchTagInfoReducer,
  fetchTagsReducer,
} from './tags.action';

export interface ItagItem {
  name: string;
  mode: string;
  numberPosts: number;
  date: string;
  owner: string | null;
}

export interface ITags {
  list: Array<any>;
  fetchCreateOrUpdateTag: {
    loading: boolean;
    error: string;
  };
  fetchTags: {
    loading: boolean;
    error: string;
  };
  fetchTagInfo: {
    loading: boolean;
    error: string;
  };
}

const initialState: ITags = {
  list: [],
  fetchCreateOrUpdateTag: {
    loading: false,
    error: '',
  },
  fetchTags: {
    loading: false,
    error: '',
  },
  fetchTagInfo: {
    loading: false,
    error: '',
  },
};

const infoFileSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: {
    ...fetchCreateOrUpdateTagReducer,
    ...fetchTagsReducer,
    ...fetchTagInfoReducer,
  },
});

export default infoFileSlice.reducer;
