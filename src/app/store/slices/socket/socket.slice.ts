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
    //   setAddBlobChunk(state, action) {
    //       const { blobChunk, cid, chunkNumber } = action.payload;
    //       const { blobList } = state.addBlobChunk;
    //
    //       const existFile =  blobList.find((blobFile) => blobFile.cid === cid);
    //       if(!existFile){
    //           blobList.push({ blob: blobChunk, cid, chunkNumber });
    //       }else{
    //           const existChunk = existFile.chunkNumber === chunkNumber;
    //           if(!existChunk){
    //               blobList.push({ blob: blobChunk, cid, chunkNumber });
    //           }
    //       }
    //
    //   },
    // setNewFileBlob(state, action) {

    //      const fileBlobArr =  blobList.filter((blobFile) => blobFile.cid === cid);
    //      const newBlob = new Blob(fileBlobArr.map((blobFile) => blobFile.blob)); // TODO: CHECK TYPE

    //      if(newBlobList.some((blobFile) => blobFile.cid === cid)){
    //          newBlobList.push({ blob: newBlob, cid });
    //      }else{
    //        toast.error('File already exist');
    //      }

    //     urlList.push({ url: URL.createObjectURL(newBlob), cid });
    //     const newFile = new File([newBlob], 'file', { type });
    //     fileList.push({file: newFile, cid });
    //},

    addNewBlobUrl(state, action) {
      const { url, cid } = action.payload;
      const { urlList } = state;
      if (!urlList.some((urlFile) => urlFile.cid === cid)) {
        urlList.push({ url, cid });
      }
    },

    setSocketInit(state, action) {
      state.socketInit.globalVar = action.payload;
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

export const { addNewBlobUrl, setSocketInit } = socketSlice.actions;

export default socketSlice.reducer;
