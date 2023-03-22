import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUploadFile } from './uploadFile.slice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { apiFileCheck, apiFileUpload } from '../../endpoints';

export const fetchUploadFile = createAsyncThunk(
  'uploadFile/fetchUploadFile',
  async (data, { rejectWithValue, getState }) => {
    const { uploadFile } = getState() as any;
    const { user } = getState() as any;
    const { id } = user;
    const { name, description, tags, type, nativeFile } = uploadFile;

    // axios upload  multipart
    const formData = new FormData();
    formData.append('file', nativeFile.file);
    const { cid: cidFile, size: sizeFile } = await axios
      .post(apiFileUpload, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    // axios upload  multipart
    const formDataCover = new FormData();
    formDataCover.append('file', nativeFile.cover);
    const { cid: cidCover } = await axios
      .post(apiFileUpload, formDataCover, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    // upload info to db
    return await axios
      .post(apiFileUpload + cidFile, {
        cid: cidFile,
        name: name,
        description: description,
        tags: tags,
        size: sizeFile,
        type: type,
        cover: cidCover,
        owner: id,
      })
      .then((res) => res.data)
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
  }
);
export const fetchUploadFileReducer = {
  [fetchUploadFile.pending as any]: (state: IUploadFile) => {
    state.fetchUploadFile.loading = true;
  },
  [fetchUploadFile.fulfilled as any]: (state: IUploadFile, action: any) => {
    toast.success('File uploaded successfully');
    state.fetchUploadFile.loading = false;
  },
  [fetchUploadFile.rejected as any]: (state: IUploadFile, action: any) => {
    toast.error('Error uploading file');
    state.fetchUploadFile.loading = false;
    state.fetchUploadFile.error = action.error.message;
  },
};

export const checkFileIsOnTheServer = createAsyncThunk(
  'uploadFile/checkFileIsOnTheServer',
  async (data: { cid: string }, { rejectWithValue, getState }) => {
    const { cid } = data;

    if (!cid) {
      return rejectWithValue('cid is required');
    }

    return await axios
      .get(apiFileCheck + cid)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
  }
);
export const checkFileIsOnTheServerReducer = {
  [checkFileIsOnTheServer.pending as any]: (state: IUploadFile) => {
    state.checkFileIsOnTheServer.loading = true;
  },
  [checkFileIsOnTheServer.fulfilled as any]: (
    state: IUploadFile,
    action: any
  ) => {
    state.checkFileIsOnTheServer.loading = false;
  },
  [checkFileIsOnTheServer.rejected as any]: (
    state: IUploadFile,
    action: any
  ) => {
    state.checkFileIsOnTheServer.loading = false;
    state.checkFileIsOnTheServer.error = action.error.message;
  },
};

export const fetchUpdateIntegrityFile = createAsyncThunk(
  'uploadFile/fetchUpdateIntegrityFile',
  async (data: { file: File }, { rejectWithValue, getState }) => {
    const { file } = data;

    const formData = new FormData();
    formData.append('file', file);
    axios
      .post(apiFileUpload, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(`fastlog =>fetchUpdateIntegrityFile  res:`, res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
export const fetchUpdateIntegrityFileReducer = {
  [fetchUpdateIntegrityFile.pending as any]: (state: IUploadFile) => {
    state.fetchUpdateIntegrityFile.loading = true;
  },
  [fetchUpdateIntegrityFile.fulfilled as any]: (
    state: IUploadFile,
    action: any
  ) => {
    state.fetchUpdateIntegrityFile.loading = false;
  },
  [fetchUpdateIntegrityFile.rejected as any]: (
    state: IUploadFile,
    action: any
  ) => {
    state.fetchUpdateIntegrityFile.loading = false;
    state.fetchUpdateIntegrityFile.error = action.error.message;
  },
};
