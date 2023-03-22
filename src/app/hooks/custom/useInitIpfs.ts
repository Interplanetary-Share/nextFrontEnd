import { initIpfs } from '@/app/store/slices/ipfs/local/ipfs.action';
import { setStatusInfoFile } from '@/app/utils/ipfs/setStatusInfoFile';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const useInitIpfs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    toast.info('Starting local IPFS node', { autoClose: 3000 });

    dispatch(initIpfs() as any)
      .unwrap()
      .then((res: any) => {});
    return () => {
      console.log('Closing IPFS');
      const windowObj = window as any;
      if (windowObj.ipfsServer) {
        // windowObj.ipfsServer.close();
        windowObj.ipfsServer.stop();
      }
    };
  }, []);
};

export default useInitIpfs;
