import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUploadFile } from './uploadFile.slice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { apiFileUpload } from '../../endpoints';

export const fetchUploadFile = createAsyncThunk(
  'uploadFile/fetchUploadFile',
  async (data, { rejectWithValue, getState }) => {
    const { uploadFile } = getState() as any;
    const { name, description, tags, type, octetStream } = uploadFile;

    // upload file to ipfs
    const { cid: cidFile, size: sizeFile } = await axios
      .post(apiFileUpload, octetStream.file, {
        headers: {
          'Content-Type': 'application/octet',
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
    // upload cover to ipfs
    const { cid: cidCover } = await axios
      .post(apiFileUpload, octetStream.cover, {
        headers: {
          'Content-Type': 'application/octet',
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        return rejectWithValue(err.response.data);
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
