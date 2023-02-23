/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInfoFileRemotely } from '../store/slices/infoFile/infoFile.action';

const useGetFileInfo = () => {
  const {
    cid,
    fetchInfoFileRemotely: { loading: fetchInfoFileRemotelyLoading },
  } = useSelector((state: any) => state.infoFile);
  const dispatch = useDispatch();
  useEffect(() => {
    if (fetchInfoFileRemotelyLoading) {
      return;
    }

    if (cid && cid !== '') {
      console.log('useGetFileInfo: cid', cid);

      dispatch(fetchInfoFileRemotely() as any);
    }
  }, [cid]);
};

export default useGetFileInfo;
