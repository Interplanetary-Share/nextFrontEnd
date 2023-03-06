import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAddFileToIPFSReducer,
  fetchCheckIsFileOnLocaLIpfsReducer,
  fetchGetFileFromIPFSReducer,
  fetchInitIpfsReducer,
} from './ipfs.action';

export interface IIpfs {
  info: {
    ipfs: any;
    file: any;
    addressConnected: [string] | [];
  };
  fetchAddFileToIPFS: {
    loading: boolean;
    error: string;
  };
  fetchInitIpfs: {
    loading: boolean;
    loaded: boolean;
    error: string;
  };
  fetchGetFileFromIPFS: {
    loading: boolean;
    error: string;
  };
  fetchCheckIsFileOnLocaLIpfs: {
    loading: boolean;
    found: boolean;
    error: string;
  };
  // fetchDownloadFromIpfs: {
  //   loading: boolean;
  //   error: string;
  // };
}

const initialState: IIpfs = {
  info: {
    ipfs: undefined,
    file: undefined,
    addressConnected: [],
  },
  fetchAddFileToIPFS: {
    loading: false,
    error: '',
  },
  fetchInitIpfs: {
    loading: false,
    loaded: false,
    error: '',
  },
  fetchGetFileFromIPFS: {
    loading: false,
    error: '',
  },
  fetchCheckIsFileOnLocaLIpfs: {
    loading: false,
    found: false,
    error: '',
  },
  // fetchDownloadFromIpfs: {
  //   loading: false,
  //   error: '',
  // },
};

const ipfsSlice = createSlice({
  name: 'ipfs',
  initialState,
  reducers: {
    setAddressConnected: (state, action) => {
      state.info.addressConnected = action.payload;
    },
  },
  extraReducers: {
    ...fetchAddFileToIPFSReducer,
    ...fetchInitIpfsReducer,
    ...fetchGetFileFromIPFSReducer,
    ...fetchCheckIsFileOnLocaLIpfsReducer,
    // ...fetchDownloadFromIpfsReducer,
  },
});

export const { setAddressConnected } = ipfsSlice.actions;

export default ipfsSlice.reducer;
