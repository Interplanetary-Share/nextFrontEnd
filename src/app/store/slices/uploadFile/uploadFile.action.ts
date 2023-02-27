import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUploadFile } from './uploadFile.slice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { apiFileUpload } from '../../endpoints';

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
        console.log(`UploadFileToIPFSServer => res.data:`, res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    // // upload file to ipfs
    // const streamFile = nativeFile.file.stream();
    // const { cid: cidFile, size: sizeFile } = await axios
    //   .post(apiFileUpload, streamFile, {
    //     headers: {
    //       'Content-Type': 'application/octet',
    //     },
    //     // responseType: 'stream'
    //   })
    //   .then((res) => res.data) // en teoria puedo tener un contador de como va la descarga
    //   .catch((err) => {
    //     return rejectWithValue(err.response.data);
    //   });

    // // upload cover to ipfs
    // const coverFile = nativeFile.cover.stream();
    // const { cid: cidCover } = await axios
    //   .post(apiFileUpload, coverFile, {
    //     headers: {
    //       'Content-Type': 'application/octet',
    //     },
    //   })
    //   .then((res) => res.data)
    //   .catch((err) => {
    //     return rejectWithValue(err.response.data);
    //   });

    // upload info to db
    return await axios
      .post(apiFileUpload + cidFile, {
        cid: cidFile,
        name: name,
        description: description,
        tags: tags,
        size: sizeFile,
        type: type,
        // cover: cidCover,
        cover: 'disabled',
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
