import { initIpfs } from '@/app/store/slices/ipfs/local/ipfs.action';
import { setStatusInfoFile } from '@/app/utils/ipfs/setStatusInfoFile';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

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
        });
      }
    }, 3000);

    dispatch(initIpfs() as any)
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
