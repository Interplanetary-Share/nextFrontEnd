import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchInitIpfs } from '../store/slices/ipfs/ipfs.action';
import { setAddressConnected } from '../store/slices/ipfs/ipfs.slice';

const useInitIpfs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Init IPFS');

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

    dispatch(fetchInitIpfs() as any);
    return () => {
      console.log('Closing IPFS');
      const windowObj = window as any;
      if (windowObj.ipfsServer) {
        windowObj.ipfsServer.close();
      }
    };
  }, []);
};

export default useInitIpfs;
