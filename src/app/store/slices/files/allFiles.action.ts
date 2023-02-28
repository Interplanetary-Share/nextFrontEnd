import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { apiFiles, apiFilesStats } from '../../endpoints';
import { IAllFiles, ISingleFile } from './allFiles.slice';

export const fetchFilesFromDb = createAsyncThunk(
  'allFiles/fetchFilesFromDb',
  async (data, { rejectWithValue, getState }) => {
    const {
      allFiles: { filters },
      user: { id },
    } = getState() as any;

    const body = {
      ...filters,
      userId: id,
    };

    return await axios
      .post(apiFiles, body)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
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

export const fetchStatsFile = createAsyncThunk(
  'infoFile/fetchStatsFile',
  async (data: any, { rejectWithValue, getState }) => {
    const { cid } = data;
    const apiFileInfo = apiFilesStats + cid;

    if (!cid || cid === '') return rejectWithValue('CID is empty');

    return await axios
      .get(apiFileInfo)
      .then((res) => {
        const { likes, dislikes, reports, favorites } = res.data;

        return {
          cid,
          likes,
          dislikes,
          reports,
          favorites,
        };
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
  }
);
export const fetchStatsFileReducer = {
  [fetchStatsFile.pending as any]: (state: IAllFiles) => {
    state.fetchStatsFile.loading = true;
  },
  [fetchStatsFile.fulfilled as any]: (state: IAllFiles, action: any) => {
    const { cid, likes, dislikes, reports, favorites } = action.payload;

    const isFileInList = state.basicList.find(
      (file: ISingleFile) => file.cid === cid
    );
    if (isFileInList) {
      if (likes) isFileInList.likes = likes;
      if (dislikes) isFileInList.dislikes = dislikes;
      if (reports) isFileInList.reports = reports;
      if (favorites) isFileInList.favorites = favorites;
    }

    state.fetchStatsFile.loading = false;
  },
  [fetchStatsFile.rejected as any]: (state: IAllFiles, action: any) => {
    state.fetchStatsFile.loading = false;
    state.fetchStatsFile.error = action.error.message;
  },
};
