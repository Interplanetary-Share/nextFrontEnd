import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { normalizeText } from 'normalize-text';
import { toast } from 'react-toastify';
import { apiTagCreateOrUpdate, apiTags } from '../../endpoints';
import { ITags } from './tags.slice';

export const fetchCreateOrUpdateTag = createAsyncThunk(
  'infoFile/fetchCreateOrUpdateTag',
  async (data: any, { rejectWithValue, getState }) => {
    const { name } = data;

    if (!name || name === '') return rejectWithValue('name is empty');

    const normalizedName = normalizeText(name).trim().replace(/ /g, '-');

    return await axios
      .post(apiTagCreateOrUpdate, {
        name: name,
        mode: normalizedName,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
  }
);
export const fetchCreateOrUpdateTagReducer = {
  [fetchCreateOrUpdateTag.pending as any]: (state: ITags) => {
    state.fetchCreateOrUpdateTag.loading = true;
  },
  [fetchCreateOrUpdateTag.fulfilled as any]: (state: ITags, action: any) => {
    state.fetchCreateOrUpdateTag.loading = false;
  },
  [fetchCreateOrUpdateTag.rejected as any]: (state: ITags, action: any) => {
    toast.error('Tag Error');
    state.fetchCreateOrUpdateTag.loading = false;
    state.fetchCreateOrUpdateTag.error = action.error.message;
  },
};

export const fetchTags = createAsyncThunk(
  'infoFile/fetchTags',
  async (data, { rejectWithValue, getState }) => {
    return await axios
      .get(apiTags)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
  }
);
export const fetchTagsReducer = {
  [fetchTags.pending as any]: (state: ITags) => {
    state.fetchTags.loading = true;
  },
  [fetchTags.fulfilled as any]: (state: ITags, action: any) => {
    state.list = action.payload;
    state.fetchTags.loading = false;
  },
  [fetchTags.rejected as any]: (state: ITags, action: any) => {
    state.fetchTags.loading = false;
    state.fetchTags.error = action.error.message;
  },
};

// i will handle the tag by id  and uppdate the list  of tags,
export const fetchTagInfo = createAsyncThunk(
  'infoFile/fetchTagInfo',
  async (data: any, { rejectWithValue, getState }) => {
    const { id } = data;

    return await axios
      .get(apiTags + id)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
  }
);
export const fetchTagInfoReducer = {
  [fetchTagInfo.pending as any]: (state: ITags) => {
    state.fetchTagInfo.loading = true;
  },
  [fetchTagInfo.fulfilled as any]: (state: ITags, action: any) => {
    // TODO: update the list of tags with the  response
    state.fetchTagInfo.loading = false;
  },
  [fetchTagInfo.rejected as any]: (state: ITags, action: any) => {
    state.fetchTagInfo.loading = false;
    state.fetchTagInfo.error = action.error.message;
  },
};
