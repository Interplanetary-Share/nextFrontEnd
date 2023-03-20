import { createSlice } from '@reduxjs/toolkit';
import {
  addFileToIPFSReducer,
  checkIsFileOnLocaLIpfsReducer,
  getFileFromIPFSReducer,
  initIpfsReducer,
} from './ipfs.action';

export interface IlocalIpfs {
  // files preloaded in client from ipfs
  preloadedCid: string[];
  // add file to local ipfs
  addFileToIPFS: {
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
    // file: ipfsFile | undefined;
    loading: boolean;
    error: string;
  };
  // check if file is on local ipfs
  checkIsFileOnLocaLIpfs: {
    loading: boolean;
    found: boolean;
  };
}

const initialState: IlocalIpfs = {
  // files preloaded in client from ipfs
  preloadedCid: [],
  // add file to local ipfs
  addFileToIPFS: {
    loading: false,
    error: '',
  },
  // get local ipfs info
  initIpfs: {
    globalVariable: undefined,
    info: undefined,
    error: '',
    status: 'init',
  },
  // get file from local ipfs
  getFileFromIPFS: {
    loading: false,
    error: '',
  },
  // check if file is on local ipfs
  checkIsFileOnLocaLIpfs: {
    loading: false,
    found: false,
  },
};

const localIpfsSlice = createSlice({
  name: 'localIpfs',
  initialState,
  reducers: {},
  extraReducers: {
    ...checkIsFileOnLocaLIpfsReducer,
    ...getFileFromIPFSReducer,
    ...initIpfsReducer,
    ...addFileToIPFSReducer,
  },
});

// export const { setAddressConnected } = localIpfsSlice.actions;

export default localIpfsSlice.reducer;
