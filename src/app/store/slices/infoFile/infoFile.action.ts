import { getIpfsGateway } from '@/app/utils/ipfs/gateways';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
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
        console.log(`fastlog => res:`, res);
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
