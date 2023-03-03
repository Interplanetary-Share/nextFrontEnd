/* eslint-disable react-hooks/exhaustive-deps */
import { fetchGetComments } from '@/app/store/slices/infoFile/infoFileComments.action';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInfoFileFromDb } from '../../store/slices/infoFile/infoFile.action';

const useGetFileInfo = () => {
  const { cid, found, cover } = useSelector((state: any) => state.infoFile);
  const dispatch = useDispatch();

  useMemo(() => {
    if (cid && cid !== '') {
      console.log('useGetFileInfo: cid', cid);

      dispatch(fetchInfoFileFromDb() as any);
      dispatch(fetchGetComments() as any);
    }
  }, [cid]);
};

export default useGetFileInfo;
