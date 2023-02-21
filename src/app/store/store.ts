import { configureStore } from '@reduxjs/toolkit';
import uploadFileSlice from './slices/uploadFile/uploadFile.slice';

export default configureStore({
  reducer: {
    uploadFile: uploadFileSlice,
  },
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
