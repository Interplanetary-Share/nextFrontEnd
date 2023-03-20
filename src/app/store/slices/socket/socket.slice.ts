import isFilePreloaded from '@/app/utils/fileOptions/checkFileIsPreloaded';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export interface BlobFileList {
  blob: Blob;
  cid: string;
  chunkNumber?: number;
}

export interface UrlFileList {
  url: string;
  cid: string;
}

export interface FileList {
  file: File;
  cid: string;
}

export interface SocketInitialState {
  urlList: UrlFileList[];
  fileList: FileList[];
  addBlobChunk: {
    blobList: BlobFileList[];
    loading: boolean;
    error: string;
    blob: Blob | undefined;
  };
  newFileBlob: {
    blobList: BlobFileList[];
    loading: boolean;
    error: string;
    blob: Blob | undefined;
  };
  socketInit: {
    loading: boolean;
    error: string;
    globalVar: string | undefined;
  };
}

const initialState: SocketInitialState = {
  urlList: [],
  fileList: [],
  addBlobChunk: {
    blobList: [],
    loading: false,
    error: '',
    blob: undefined,
  },
  newFileBlob: {
    blobList: [],
    loading: false,
    error: '',
    blob: undefined,
  },
  socketInit: {
    loading: false,
    error: '',
    globalVar: undefined,
  },
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    addNewBlobUrl(state, action) {
      const { url, cid } = action.payload;
      const { urlList } = state;

      if (!isFilePreloaded(urlList, cid)) {
        urlList.push({ url, cid });
      }
    },

    setSocketInit(state, action) {
      state.socketInit.globalVar = action.payload;
    },
  },
  extraReducers: {},
});

export const { addNewBlobUrl, setSocketInit } = socketSlice.actions;

export default socketSlice.reducer;
