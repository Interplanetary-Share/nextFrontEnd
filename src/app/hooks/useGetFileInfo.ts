/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchInfoFileFromDb,
  fetchInfoFileRemotely,
} from '../store/slices/infoFile/infoFile.action';
import { setLinkFile } from '../store/slices/infoFile/infoFile.slice';
import { getIpfsGateway } from '../utils/ipfs/gateways';

const useGetFileInfo = () => {
  const { cid } = useSelector((state: any) => state.infoFile);
  const dispatch = useDispatch();

  useMemo(() => {
    if (cid && cid !== '') {
      console.log('useGetFileInfo: cid', cid);

      dispatch(setLinkFile(getIpfsGateway(cid)) as any);
      dispatch(fetchInfoFileRemotely() as any);
      dispatch(fetchInfoFileFromDb() as any);
    }
  }, [cid]);
};

export default useGetFileInfo;
