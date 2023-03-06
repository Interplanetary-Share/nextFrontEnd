/* eslint-disable react-hooks/exhaustive-deps */
import { fetchGetComments } from '@/app/store/slices/infoFile/infoFileComments.action';
import {
  fetchCheckIsFileOnLocaLIpfs,
  fetchGetFileFromIPFS,
} from '@/app/store/slices/ipfs/ipfs.action';
import { setStatusInfoFile } from '@/app/utils/ipfs/setStatusInfoFile';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInfoFileFromDb } from '../../store/slices/infoFile/infoFile.action';

const useGetFileInfo = () => {
  const { cid, found, cover } = useSelector((state: any) => state.infoFile);
  const {
    fetchInitIpfs: { loaded: ipfsLoaded },
  } = useSelector((state: any) => state.ipfs);
  const dispatch = useDispatch();

  useMemo(() => {
    if (cid && cid !== '') {
      console.log('useGetFileInfo: cid', cid);

      dispatch(fetchInfoFileFromDb() as any);
      dispatch(fetchGetComments() as any);
    }
  }, [cid]);

  useMemo(() => {
    if (cid && cid !== '') {
      console.log(`fastlog => ipfsLoaded:`, ipfsLoaded);
      if (ipfsLoaded) {
        setStatusInfoFile({
          message: 'Getting file from Local IPFS node',
          progress: 20,
        });

        dispatch(fetchCheckIsFileOnLocaLIpfs() as any)
          .unwrap()
          .then((res: any) => {
            console.log(`fastlog => res:`, res);
            if (res) {
              // file is on local ipfs node
              dispatch(fetchGetFileFromIPFS() as any);
            }else{
              // file is not on local ipfs node
              // the hook will be launched. 
            }
          });
      }
    }
  }, [cid, ipfsLoaded]);
};

export default useGetFileInfo;
