// import { createSlice } from '@reduxjs/toolkit';
// import {
//   fetchAddFileToIPFSReducer,
//   fetchCheckIsFileOnLocaLIpfsReducer,
//   fetchGetFileFromIPFSReducer,
//   fetchInitIpfsReducer,
// } from './ipfs.action';

// interface ipfsFile {
//   cid: string;
// }

// export interface IIpfs {
//   status:
//     | 'loadingLocalIpfs'
//     | 'idle'
//     | 'loadingGetFileFromLocalIpfs'
//     | 'loadingAddFileToLocalIpfs'
//     | 'loadingCheckIsFileOnLocalIpfs'
//     | 'loadingDownloadFromIpfs'
//     | 'loadingInitIpfs'
//     | 'error';
//   progress: number;
// }

// const initialState: IIpfs = {
//   // files preloaded in client from ipfs
//   files: [],
//   // add file to local ipfs
//   addFileToIPFS: {
//     files: [],
//     loading: false,
//     error: '',
//   },
//   // get local ipfs info
//   initIpfs: {
//     globalVariable: undefined,
//     info: undefined,
//     loading: false,
//     error: '',
//   },
//   // get file from local ipfs
//   getFileFromIPFS: {
//     file: undefined,
//     loading: false,
//     error: '',
//   },
//   // check if file is on local ipfs
//   checkIsFileOnLocaLIpfs: {
//     file: undefined,
//     found: false,
//     error: '',
//   },
// };

// const localIpfsSlice = createSlice({
//   name: 'localIpfs',
//   initialState,
//   reducers: {},
//   extraReducers: {
//     // ...fetchAddFileToIPFSReducer,
//     // ...fetchInitIpfsReducer,
//     // ...fetchGetFileFromIPFSReducer,
//     // ...fetchCheckIsFileOnLocaLIpfsReducer,
//     // ...fetchDownloadFromIpfsReducer,
//   },
// });

// // export const { setAddressConnected } = localIpfsSlice.actions;

// export default localIpfsSlice.reducer;
