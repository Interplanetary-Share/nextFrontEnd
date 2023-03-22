import { createSlice } from '@reduxjs/toolkit';
import {
  checkFileIsOnTheServerReducer,
  fetchUploadFileReducer,
} from './uploadFile.action';

export interface IUploadFile {
  name: string;
  tags: string[];
  description: string;
  size: number;
  type: string;
  nativeFile: {
    file: File | null;
    cover: File | null;
  };
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
  checkFileIsOnTheServer: {
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
  nativeFile: {
    file: null,
    cover: null,
  },
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
  checkFileIsOnTheServer: {
    loading: false,
    error: '',
  },
};

const uploadFileSlice = createSlice({
  name: 'uploadFile',
  initialState,
  reducers: {
    setFileInfo: (state, action) => {
      const {
        name,
        tags,
        description,
        size,
        type,
        octetStream,
        blob,
        cid,
        nativeFile,
      } = action.payload;

      if (name) state.name = name;
      if (description) state.description = description;
      if (size) state.size = size;
      if (tags) state.tags = tags;
      if (type) state.type = type;

      if (nativeFile) {
        if (nativeFile.file) state.nativeFile.file = nativeFile.file;
        if (nativeFile.cover) state.nativeFile.cover = nativeFile.cover;
      }

      if (octetStream) {
        if (octetStream.file) state.octetStream.file = octetStream.file;
        if (octetStream.cover) state.octetStream.cover = octetStream.cover;
      }
      if (blob) {
        if (blob.cover) state.blob.cover = blob.cover;
      }
    },
    setEmptyFileInfo: (state) => {
      state = initialState;
    },
  },
  extraReducers: {
    ...fetchUploadFileReducer,
    ...checkFileIsOnTheServerReducer,
  },
});

export const { setFileInfo, setEmptyFileInfo } = uploadFileSlice.actions;

export default uploadFileSlice.reducer;
