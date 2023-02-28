/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCoverData,
  fetchFileData,
  fetchInfoFileFromDb,
} from '../../store/slices/infoFile/infoFile.action';

const useGetFileInfo = () => {
  const { cid, found } = useSelector((state: any) => state.infoFile);
  const dispatch = useDispatch();

  useMemo(() => {
    if (cid && cid !== '') {
      console.log('useGetFileInfo: cid', cid);

      dispatch(fetchInfoFileFromDb() as any)
        .unwrap()
        .then((res: any) => {
          if (found) {
            dispatch(fetchFileData() as any);
            dispatch(fetchCoverData() as any);
          }
        })
        .catch((err: any) => {
          console.log('err', err);
        });
    }
  }, [cid]);
};

export default useGetFileInfo;
