import { getIpfsGateway } from '@/app/utils/ipfs/gateways';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { apiFiles } from '../../endpoints';
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
        const { name, description, tags, size, type, cover, date } = res.data;

        return {
          name,
          description,
          tags,
          size,
          type,
          cover,
          date,
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
    const { size, type, name, description, tags, cover, date } = action.payload;

    if (size) state.size = size;
    if (type) state.type = type;
    if (name) state.name = name;
    if (description) state.description = description;
    if (tags) state.tags = tags;
    if (cover) state.cover = cover;
    if (date) state.date = date;

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
    state.fetchDownloadFile.loading = true;
  },
  [fetchDownloadFile.fulfilled as any]: (state: IInfoFile, action: any) => {
    state.fetchDownloadFile.loading = false;
  },
  [fetchDownloadFile.rejected as any]: (state: IInfoFile, action: any) => {
    state.fetchDownloadFile.loading = false;
    state.fetchDownloadFile.error = action.error.message;
  },
};
