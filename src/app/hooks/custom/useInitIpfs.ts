import { setStatusInfoFile } from '@/app/utils/ipfs/setStatusInfoFile';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchInitIpfs } from '../../store/slices/ipfs/remote/ipfs.action';
import { setAddressConnected } from '../../store/slices/ipfs/ipfs.slice';

const useInitIpfs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    setStatusInfoFile({
      message: 'Connecting to Local IPFS node',
      progress: 10,
    });

    setInterval(() => {
      const windowObj = window as any;
      if (windowObj.ipfsServer) {
        const ipfs = windowObj.ipfsServer;
        // get connected peers
        ipfs.swarm.peers().then((peers: any) => {
          const address = peers.map((peer: any) => {
            return peer.addr.toString();
          });

          dispatch(setAddressConnected(address));
          if (peers.length === 0) return;
          // get connected peers
          console.log(`fastlog => peers number`, peers.length);
        });
      }
    }, 3000);

    dispatch(fetchInitIpfs() as any)
      .unwrap()
      .then((res: any) => {
        setStatusInfoFile({
          message: 'Local IPFS node ready',
          progress: 15,
        });
      });
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
