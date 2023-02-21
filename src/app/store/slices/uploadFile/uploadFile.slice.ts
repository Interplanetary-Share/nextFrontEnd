import { createSlice } from '@reduxjs/toolkit';
import { fetchUploadFileReducer } from './uploadFile.action';

export interface IUploadFile {
  name: string;
  tags: string[];
  description: string;
  size: number;
  type: string;
  octetStream: {
    file: any;
    cover: any;
  };
  blob: {
    cover: any;
  };

  fetchUploadFile: {
    loading: boolean;
    error: string;
  };
}

const initialState: IUploadFile = {
  name: '',
  tags: [],
  description: '',
  size: 0,
  type: '',
  octetStream: {
    file: null,
    cover: null,
  },
  blob: {
    cover: null,
  },

  fetchUploadFile: {
    loading: false,
    error: '',
  },
};

const uploadFileSlice = createSlice({
  name: 'uploadFile',
  initialState,
  reducers: {
    setFileInfo: (state, action) => {
      const { name, tags, description, size, type, octetStream, blob, cid } =
        action.payload;

      if (name) state.name = name;
      if (description) state.description = description;
      if (size) state.size = size;
      if (tags) state.tags = tags;
      if (type) state.type = type;

      if (octetStream) {
        if (octetStream.file) state.octetStream.file = octetStream.file;
        if (octetStream.cover) state.octetStream.cover = octetStream.cover;
      }
      if (blob) {
        if (blob.cover) state.blob.cover = blob.cover;
      }
    },
    setEmptyFileInfo: (state) => {
      state.name = '';
      state.description = '';
      state.size = 0;
      state.tags = [];
      state.type = '';
      state.octetStream.file = null;
      state.octetStream.cover = null;
      state.blob.cover = null;
    },
  },
  extraReducers: {
    ...fetchUploadFileReducer,
  },
});

export const { setFileInfo } = uploadFileSlice.actions;

export default uploadFileSlice.reducer;
