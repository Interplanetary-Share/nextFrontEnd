import { getIpfsGateway } from '@/app/utils/ipfs/gateways';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { apiFiles, apiFilesStats } from '../../endpoints';
import { IInfoFile } from './infoFile.slice';

export const fetchInfoFileRemotely = createAsyncThunk(
  'infoFile/fetchInfoFileRemotely',
  async (data, { rejectWithValue, getState }) => {
    const { infoFile } = getState() as any;
    const { cid } = infoFile;
    const apiFileInfo = getIpfsGateway(cid);

    if (!cid || cid === '') return rejectWithValue('CID is empty');

    return await axios
      .head(apiFileInfo)
      .then((res) => {
        return {
          lastModified: res.headers['last-modified'],
          size: res.headers['content-length'],
          type: res.headers['content-type'],
        };
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
  }
);
export const fetchInfoFileRemotelyReducer = {
  [fetchInfoFileRemotely.pending as any]: (state: IInfoFile) => {
    state.fetchInfoFileRemotely.loading = true;
  },
  [fetchInfoFileRemotely.fulfilled as any]: (state: IInfoFile, action: any) => {
    const { lastModified, size, type } = action.payload;

    if (lastModified) state.lastModified = lastModified;
    if (size) state.size = size;
    if (type) state.type = type;

    state.fetchInfoFileRemotely.loading = false;
  },
  [fetchInfoFileRemotely.rejected as any]: (state: IInfoFile, action: any) => {
    state.fetchInfoFileRemotely.loading = false;
    state.fetchInfoFileRemotely.error = action.error.message;
  },
};

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
    state.fetchInfoFileFromDb.loading = false;
    state.fetchInfoFileFromDb.error = action.error.message;
  },
};

export const fetchDownloadFile = createAsyncThunk(
  'infoFile/fetchDownloadFile',
  async (data, { rejectWithValue, getState }) => {
    const { infoFile } = getState() as any;
    const { cid } = infoFile;
    const apiFileInfo = getIpfsGateway(cid);

    if (!cid || cid === '') return rejectWithValue('CID is empty');

    return await axios
      .get(apiFileInfo, { responseType: 'blob' })
      .then((res) => {
        const href = URL.createObjectURL(res.data);
        const link = document.createElement('a');
        link.href = href;
        link.download = cid;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
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

export const fetchStatsFile = createAsyncThunk(
  'infoFile/fetchStatsFile',
  async (data, { rejectWithValue, getState }) => {
    const { infoFile } = getState() as any;
    const { cid } = infoFile;
    const apiFileInfo = apiFilesStats + cid;

    if (!cid || cid === '') return rejectWithValue('CID is empty');

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
export const fetchStatsFileReducer = {
  [fetchStatsFile.pending as any]: (state: IInfoFile) => {
    state.fetchStatsFile.loading = true;
  },
  [fetchStatsFile.fulfilled as any]: (state: IInfoFile, action: any) => {
    const { likes, dislikes, reports, favorites } = action.payload;

    if (likes) state.likes = likes;
    if (dislikes) state.dislikes = dislikes;
    if (reports) state.reports = reports;
    if (favorites) state.favorites = favorites;

    state.fetchStatsFile.loading = false;
  },
  [fetchStatsFile.rejected as any]: (state: IInfoFile, action: any) => {
    state.fetchStatsFile.loading = false;
    state.fetchStatsFile.error = action.error.message;
  },
};
