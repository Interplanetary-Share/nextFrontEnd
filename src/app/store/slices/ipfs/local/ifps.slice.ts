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
  // add file to local ipfs
  addFileToIPFS: {
    files: ipfsFile[];
    loading: boolean;
    error: string;
  };
  // get local ipfs info
  initIpfs: {
    globalVariable: string | undefined;
    info: any;
    status: 'init' | 'loading' | 'idle' | 'error';
    error: string;
  };
  // get file from local ipfs
  getFileFromIPFS: {
    file: ipfsFile | undefined;
    loading: boolean;
    error: string;
  };
  // check if file is on local ipfs
  checkIsFileOnLocaLIpfs: {
    file: ipfsFile | undefined;
    found: boolean;
    error: string;
  };
}

const initialState: IIpfs = {
  // files preloaded in client from ipfs
  files: [],
  // add file to local ipfs
  addFileToIPFS: {
    files: [],
    loading: false,
    error: '',
  },
  // get local ipfs info
  initIpfs: {
    globalVariable: undefined,
    info: undefined,
    loading: false,
    error: '',
  },
  // get file from local ipfs
  getFileFromIPFS: {
    file: undefined,
    loading: false,
    error: '',
  },
  // check if file is on local ipfs
  checkIsFileOnLocaLIpfs: {
    file: undefined,
    found: false,
    error: '',
  },
};

const localIpfsSlice = createSlice({
  name: 'localIpfs',
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

// export const { setAddressConnected } = localIpfsSlice.actions;

export default localIpfsSlice.reducer;
