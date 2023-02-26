import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import allFilesSlice from './slices/files/allFiles.slice';
import infoFileSlice from './slices/infoFile/infoFile.slice';
import uploadFileSlice from './slices/uploadFile/uploadFile.slice';
import ipfsSlice from './slices/ipfs/ipfs.slice';
import userSlice from './slices/user/user.slice';

const persistConfig = {
  key: 'intershare',
  storage,
  // whitelist: ['uploadFile'],
  // blacklist: ['infoFile'],
};

const rootReducer = {
  uploadFile: uploadFileSlice,
  infoFile: infoFileSlice,
  allFiles: allFilesSlice,
  user: userSlice,
  ipfs: ipfsSlice,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer)
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      ignoreActions: true,
      serializableCheck: false,
      immutableCheck: false,
    }),
  // Config for Redux DevTools to improve performance (I have a lot of crashes without this)
  devTools: {
    maxAge: 3,
    latency: 1500,
    autoPause: true,
    trace: false,
    features: {
      persist: true,
      jump: false,
      skip: false,
      reorder: false,
      dispatch: false,
      test: false,
    },
  },
});

// export const persistor = persistStore(store);

export default store;
