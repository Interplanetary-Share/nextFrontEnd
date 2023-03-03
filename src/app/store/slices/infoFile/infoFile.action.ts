import hexstringToBlob from '@/app/utils/convert/hexstringToBlob';
import { getIpfsGateway } from '@/app/utils/ipfs/gateways';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { apiDownload, apiFiles, apiFilesStats } from '../../endpoints';
import { IInfoFile } from './infoFile.slice';

export const fetchInfoFileFromDb = createAsyncThunk(
  'infoFile/fetchInfoFileFromDb',
  async (data, { rejectWithValue, getState }) => {
    const { infoFile } = getState() as any;
    const { cid } = infoFile;
    const apiFileInfo = apiFiles + cid;

    if (!cid || cid === '') return rejectWithValue('CID is empty');

    return await axios
      .get(apiFileInfo)
      .then((res) => {
        if (!res || !res.data) rejectWithValue('File not found');

        const {
          name,
          description,
          tags,
          size,
          type,
          cover,
          date,
          owner,
          likes,
          dislikes,
          favorites,
          reports,
        } = res.data;

        return {
          name,
          description,
          tags,
          size,
          type,
          cover,
          date,
          owner,
          likes,
          dislikes,
          favorites,
          reports,
        };
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
  }
);
export const fetchInfoFileFromDbReducer = {
  [fetchInfoFileFromDb.pending as any]: (state: IInfoFile) => {
    state.fetchInfoFileFromDb.loading = true;
  },
  [fetchInfoFileFromDb.fulfilled as any]: (state: IInfoFile, action: any) => {
    const {
      size,
      type,
      name,
      description,
      tags,
      cover,
      date,
      owner,
      likes,
      dislikes,
      favorites,
      reports,
    } = action.payload;

    state.found = true;

    if (size) state.size = size;
    if (type) state.type = type;
    if (name) state.name = name;
    if (description) state.description = description;
    if (tags) state.tags = tags;
    if (cover) state.cover = cover;
    if (date) state.date = date;
    if (owner) state.owner = owner;
    if (likes) state.likes = likes;
    if (dislikes) state.dislikes = dislikes;
    if (favorites) state.favorites = favorites;
    if (reports) state.reports = reports;

    state.fetchInfoFileFromDb.loading = false;
  },
  [fetchInfoFileFromDb.rejected as any]: (state: IInfoFile, action: any) => {
    state.found = false;
    state.fetchInfoFileFromDb.loading = false;
    state.fetchInfoFileFromDb.error = action.error.message;
  },
};

// This handles the action to download the file
export const fetchDownloadFile = createAsyncThunk(
  'infoFile/fetchDownloadFile',
  async (data: any, { rejectWithValue, getState }) => {
    const { link, type, name } = data;
    // download file from blob

    if (!link || link === '') return rejectWithValue('Link is empty');

    return await axios
      .get(link, {
        responseType: 'blob',
      })
      .then((res) => {
        // download file
        const blob = new Blob([res.data], { type: type });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        // download
        document.body.appendChild(link);
        link.setAttribute('style', 'display: none');
        link.setAttribute('download', name);
        link.click();
        link.remove();
      });
  }
);
export const fetchDownloadFileReducer = {
  [fetchDownloadFile.pending as any]: (state: IInfoFile) => {
    toast.info('Downloading file...');
    state.fetchDownloadFile.loading = true;
  },
  [fetchDownloadFile.fulfilled as any]: (state: IInfoFile, action: any) => {
    toast.success('File downloaded successfully!');
    state.fetchDownloadFile.loading = false;
  },
  [fetchDownloadFile.rejected as any]: (state: IInfoFile, action: any) => {
    toast.error('Error downloading file!');
    state.fetchDownloadFile.loading = false;
    state.fetchDownloadFile.error = action.error.message;
  },
};

export const fetchStatsCurrentFile = createAsyncThunk(
  'infoFile/fetchStatsCurrentFile',
  async (data: any, { rejectWithValue, getState }) => {
    const { cid: cidClicked } = data;
    const { infoFile } = getState() as any;
    const { cid } = infoFile;
    const apiFileInfo = apiFilesStats + cid;

    if (!cid || cid === '') return rejectWithValue('CID is empty');
    if (cidClicked !== cid) return rejectWithValue('CID is different');

    return await axios
      .get(apiFileInfo)
      .then((res) => {
        const { likes, dislikes, reports, favorites } = res.data;

        return {
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
export const fetchStatsCurrentFileReducer = {
  [fetchStatsCurrentFile.pending as any]: (state: IInfoFile) => {
    state.fetchStatsCurrentFile.loading = true;
  },
  [fetchStatsCurrentFile.fulfilled as any]: (state: IInfoFile, action: any) => {
    const { likes, dislikes, reports, favorites } = action.payload;

    if (likes) state.likes = likes;
    if (dislikes) state.dislikes = dislikes;
    if (reports) state.reports = reports;
    if (favorites) state.favorites = favorites;

    state.fetchStatsCurrentFile.loading = false;
  },
  [fetchStatsCurrentFile.rejected as any]: (state: IInfoFile, action: any) => {
    state.fetchStatsCurrentFile.loading = false;
    state.fetchStatsCurrentFile.error = action.error.message;
  },
};
