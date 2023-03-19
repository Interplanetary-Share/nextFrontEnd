import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAddFileToIPFSReducer,
  fetchCheckIsFileOnLocaLIpfsReducer,
  fetchGetFileFromIPFSReducer,
  fetchInitIpfsReducer,
} from './ipfs.action';

interface ipfsFile {
  cid: string;
}

interface preloadedFile {
  cid: string;
  url: string;
  size: number;
}

export interface IIpfs {
  // files preloaded in client from ipfs
  files: preloadedFile[];
  // add file to remote ipfs
  sendFileToIPFS: {
    file: ipfsFile | undefined;
    files: ipfsFile[];
    loading: boolean;
    error: string;
  };
  // get file from remote ipfs
  getFileFromIPFS: {
    file: ipfsFile | undefined;
    files: ipfsFile[];
    loading: boolean;
    error: string;
  };
  // check if file is on remote ipfs
  checkIsFileOnRemoteIpfs: {
    file: ipfsFile | undefined;
    found: boolean;
    error: string;
  };
}

const initialState: IIpfs = {
  // files preloaded in client from ipfs
  files: [],
  // add file to remote ipfs
  sendFileToIPFS: {
    file: undefined,
    files: [],
    loading: false,
    error: '',
  },
  // get file from remote ipfs
  getFileFromIPFS: {
    file: undefined,
    files: [],
    loading: false,
    error: '',
  },
  // check if file is on remote ipfs
  checkIsFileOnRemoteIpfs: {
    file: undefined,
    found: false,
    error: '',
  },
};

const remoteIpfsSlice = createSlice({
  name: 'remoteIpfs',
  initialState,
  reducers: {},
  extraReducers: {
    // ...fetchAddFileToIPFSReducer,
    // ...fetchInitIpfsReducer,
    // ...fetchGetFileFromIPFSReducer,
    // ...fetchCheckIsFileOnLocaLIpfsReducer,
    // ...fetchDownloadFromIpfsReducer,
  },
});

// export const { setAddressConnected } = remoteIpfsSlice.actions;

export default remoteIpfsSlice.reducer;
