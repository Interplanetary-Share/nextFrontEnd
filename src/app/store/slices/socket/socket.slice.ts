import { createSlice } from '@reduxjs/toolkit';

export interface BlobFileList {
  blob: Blob;
  cid: string;
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
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setAddBlobChunk(state, action) {
      const { blobChunk, cid } = action.payload;
      const { blobList } = state.addBlobChunk;
      blobList.push({ blob: blobChunk, cid });
    },
    setNewFileBlob(state, action) {
      const { cid, type } = action.payload;
      const { blobList } = state.addBlobChunk;
      const { blobList: newBlobList } = state.newFileBlob;
      const { urlList } = state;
      const { fileList } = state;

      const fileBlobArr = blobList.filter((blobFile) => blobFile.cid === cid);
      const newBlob = new Blob(fileBlobArr.map((blobFile) => blobFile.blob)); // TODO: CHECK TYPE
      newBlobList.push({ blob: newBlob, cid });
      urlList.push({ url: URL.createObjectURL(newBlob), cid });
      const newFile = new File([newBlob], 'file', { type });
      fileList.push({ file: newFile, cid });
    },
  },
  extraReducers: {
    //   ...fetchAddFileToIPFSReducer,
    //   ...fetchInitIpfsReducer,
    //   ...fetchGetFileFromIPFSReducer,
    //   ...fetchCheckIsFileOnLocaLIpfsReducer,
    // ...fetchDownloadFromIpfsReducer,
  },
});

export const { setAddBlobChunk, setNewFileBlob } = socketSlice.actions;

export default socketSlice.reducer;
