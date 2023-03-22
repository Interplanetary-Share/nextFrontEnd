import { byteNormalize } from '@/app/utils/convert/bytesSizeConvert';
import isFilePreloaded from '@/app/utils/fileOptions/checkFileIsPreloaded';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { addNewBlobUrl } from '../../socket/socket.slice';
import {
  checkFileIsOnTheServer,
  fetchUpdateIntegrityFile,
} from '../../uploadFile/uploadFile.action';
import { IlocalIpfs } from './ipfs.slice';

interface addFileToIPFS {
  file: File | null;
}

export const addFileToIPFS = createAsyncThunk(
  'infoFile/fetchAddFileToIPFS',
  async (data: addFileToIPFS, { rejectWithValue, getState }) => {
    const { file } = data;

    if (!file) return rejectWithValue('File is null');

    const windowObj = window as any;

    if (!windowObj.ipfsServer)
      return rejectWithValue('IPFS server is not running');

    const ipfs = windowObj.ipfsServer;
    if (!ipfs) return rejectWithValue('IPFS server is not running');

    // THIUS WORKS ONM NEW SCREEN AND  NEW WINDOW
    // const stream = file.stream().tee();
    const stream = file.stream();

    // toast.info('Saving file to local IPFS...', {
    //   toastId: 'uploadingFileToIPFS',
    //   autoClose: 3000,
    // });

    const infoFile = await ipfs.add(stream, {
      progress: (prog: any) => console.log(`received: ${byteNormalize(prog)}`),
      chunker: 'size-6000000', // Best performance for large files
      // chunker: 'size-1000000',
      //   chunker: 'size-1000',
      onlyHash: false,
      pin: true,
      wrapWithDirectory: false,
    });

    const cid = infoFile.cid.toString();
    return cid;
  }
);
export const addFileToIPFSReducer = {
  [addFileToIPFS.pending as any]: (state: IlocalIpfs) => {
    state.addFileToIPFS.loading = true;
  },
  [addFileToIPFS.fulfilled as any]: (state: IlocalIpfs, action: any) => {
    if (!state.preloadedCid.includes(action.payload)) {
      state.preloadedCid.push(action.payload);
    }
    state.addFileToIPFS.loading = false;
  },
  [addFileToIPFS.rejected as any]: (state: IlocalIpfs, action: any) => {
    state.addFileToIPFS.loading = false;
    state.addFileToIPFS.error = action.error.message;
    toast.error(action.error.message);
  },
};

export const initIpfs = createAsyncThunk(
  'infoFile/fetchInitIpfs',
  async (data, { rejectWithValue, getState }) => {
    const windowObj = window as any;
    console.time('ipfsInit');

    const ipfs = await windowObj.IpfsCore.create({
      repo: 'ipfs-8', //+ Math.random(),
      config: {
        Addresses: {
          // Swarm: [
          //   '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
          //   '/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/',
          //   '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
          // ],
          // Delegates: [
          //   '/dns4/node0.delegate.ipfs.io/tcp/443/https',
          //   '/dns4/node1.delegate.ipfs.io/tcp/443/https',
          //   '/dns4/node2.delegate.ipfs.io/tcp/443/https',
          //   '/dns4/node3.delegate.ipfs.io/tcp/443/https',
          // ],
        },
        // Bootstrap: [
        //   '/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
        //   '/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
        //   '/dns4/sfo-3.bootstrap.libp2p.io/tcp/443/wss/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',

        //   '/dns4/node0.preload.ipfs.io/tcp/443/wss/p2p/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic',
        //   '/dns4/node1.preload.ipfs.io/tcp/443/wss/p2p/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6',
        //   '/dns4/node2.preload.ipfs.io/tcp/443/wss/p2p/QmV7gnbW5VTcJ3oyM2Xk1rdFBJ3kTkvxc87UFGsun29STS',
        //   '/dns4/node3.preload.ipfs.io/tcp/443/wss/p2p/QmY7JB6MQXhxHvq7dBDh4HpbH29v4yE9JRadAVpndvzySN',

        //   '/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
        //   '/dnsaddr/bootstrap.libp2p.io/p2p/QmZa1sAxajnQjVM8WjWXoMbmPd7NsWhfKsPkErzpm9wGkp',
        //   '/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt',
        // ],
        Datastore: {
          StorageMax: '10GB',
          StorageGCWatermark: 90,
          GCPeriod: '1h',
          HashOnRead: false,
          BloomFilterSize: 0,
        },
        Pinning: {
          EnableGC: true,
        },
        Relay: {
          Enabled: true,
        },
        Experimental: {
          FilestoreEnabled: true,
          ShardingEnabled: true,
          Libp2pStreamMounting: true,
          QUIC: true,
          UrlstoreEnabled: true,
        },
        // Discovery: {
        //   MDNS: {
        //     Enabled: true,
        //     Interval: 10,
        //   },
        //   webRTCStar: {
        //     Enabled: true,
        //   },
        // },
        // Swarm: {
        //   ConnMgr: {
        //     LowWater: 10, //5000, // default 10 recommended 200
        //     HighWater: 50, // 5500, // default 50 recommended 300
        //   },
        //   EnableAutoRelay: true,
        //   EnableRelayHop: true,
        //   DisableNatPortMap: true,
        // },
        Peering: {
          // Peers: [
          //   {
          //     ID: 'QmcFf2FH3CEgTNHeMRGhN7HNHU1EXAxoEk6EFuSyXCsvRE',
          //     Addrs: ['/dnsaddr/node-1.ingress.cloudflare-ipfs.com/'],
          //   },
          //   {
          //     ID: 'QmcFmLd5ySfk2WZuJ1mfSWLDjdmHZq7rSAua4GoeSQfs1z',
          //     Addrs: ['/dnsaddr/node-2.ingress.cloudflare-ipfs.com/'],
          //   },
          //   {
          //     ID: 'QmcfFmzSDVbwexQ9Au2pt5YEXHK5xajwgaU6PpkbLWerMa',
          //     Addrs: ['/dnsaddr/node-3.ingress.cloudflare-ipfs.com/'],
          //   },
          //   {
          //     ID: 'QmcfJeB3Js1FG7T8YaZATEiaHqNKVdQfybYYkbT1knUswx',
          //     Addrs: ['/dnsaddr/node-4.ingress.cloudflare-ipfs.com/'],
          //   },
          //   {
          //     ID: 'QmcfVvzK4tMdFmpJjEKDUoqRgP4W9FnmJoziYX5GXJJ8eZ',
          //     Addrs: ['/dnsaddr/node-5.ingress.cloudflare-ipfs.com/'],
          //   },
          //   {
          //     ID: 'QmcfZD3VKrUxyP9BbyUnZDpbqDnT7cQ4WjPP8TRLXaoE7G',
          //     Addrs: ['/dnsaddr/node-6.ingress.cloudflare-ipfs.com/'],
          //   },
          //   {
          //     ID: 'QmcfZP2LuW4jxviTeG8fi28qjnZScACb8PEgHAc17ZEri3',
          //     Addrs: ['/dnsaddr/node-7.ingress.cloudflare-ipfs.com/'],
          //   },
          //   {
          //     ID: 'QmcfgsJsMtx6qJb74akCw1M24X1zFwgGo11h1cuhwQjtJP',
          //     Addrs: ['/dnsaddr/node-8.ingress.cloudflare-ipfs.com/'],
          //   },
          //   {
          //     ID: 'Qmcfr2FC7pFzJbTSDfYaSy1J8Uuy8ccGLeLyqJCKJvTHMi',
          //     Addrs: ['/dnsaddr/node-9.ingress.cloudflare-ipfs.com/'],
          //   },
          //   {
          //     ID: 'QmcfR3V5YAtHBzxVACWCzXTt26SyEkxdwhGJ6875A8BuWx',
          //     Addrs: ['/dnsaddr/node-10.ingress.cloudflare-ipfs.com/'],
          //   },
          //   {
          //     ID: 'Qmcfuo1TM9uUiJp6dTbm915Rf1aTqm3a3dnmCdDQLHgvL5',
          //     Addrs: ['/dnsaddr/node-11.ingress.cloudflare-ipfs.com/'],
          //   },
          //   {
          //     ID: 'QmcfV2sg9zaq7UUHVCGuSvT2M2rnLBAPsiE79vVyK3Cuev',
          //     Addrs: ['/dnsaddr/node-12.ingress.cloudflare-ipfs.com/'],
          //   },
          // ],
        },
        // Pubsub: {
        //   enabled: true,
        //   Router: 'gossipsub',
        // },
        // API: {
        //   HTTPHeaders: {
        //     'Access-Control-Allow-Origin': ['*'],
        //     'Access-Control-Allow-Methods': ['PUT', 'GET', 'POST'],
        //   },
        // },
        // experimental: {
        //   pubsub: true,
        // },
        // libp2p: {
        //   transports: [ws],
        //   connectionManager: {
        //     autoDial: false,
        //   },
        // },
      },
    });

    if (!ipfs) return rejectWithValue('ipfs not found');
    // const info = await ipfs.id();

    windowObj.ipfsServer = ipfs;
    console.timeEnd('ipfsInit');

    // const cids = [];

    // for await (const cid of ipfs.refs.local()) {
    //   cids.push(cid.ref);
    // }

    // return cids;
  }
);
export const initIpfsReducer = {
  [initIpfs.pending as any]: (state: IlocalIpfs) => {
    state.initIpfs.globalVariable = 'IpfsCore';
    state.initIpfs.status = 'loading';
  },
  [initIpfs.fulfilled as any]: (state: IlocalIpfs, action: any) => {
    toast.success('IPFS Initialized');
    state.initIpfs.status = 'idle';
    state.initIpfs.info = action.payload;
  },
  [initIpfs.rejected as any]: (state: IlocalIpfs, action: any) => {
    toast.error(action.error.message);
    state.initIpfs.status = 'error';
    state.initIpfs.error = action.error.message;
  },
};

// TODO: add cover logic in useGetFileInfo

export const getFileFromIPFS = createAsyncThunk(
  'infoFile/fetchGetFileFromIPFS',
  async (
    data: {
      cid: string;
    },
    { rejectWithValue, getState, dispatch }
  ) => {
    const {
      socket: { urlList },
    } = getState() as any;
    const { cid } = data;

    if (isFilePreloaded(urlList, cid)) return;

    const windowObj = window as any;

    if (!windowObj.ipfsServer) {
      toast.error('IPFS Local Node is not running');
      return rejectWithValue('IPFS Local Node is not running');
    }

    const ipfs = windowObj.ipfsServer;

    const fileBlobList = [] as any;

    const ipfsAsyncIterator = ipfs.cat(cid);

    let chunkSize = 0;

    for await (const chunk of ipfsAsyncIterator) {
      chunkSize += chunk.length;
      const buffer = Buffer.from(chunk);
      const blob = new Blob([buffer]);
      fileBlobList.push(blob);
    }

    const blob = new Blob(fileBlobList);

    const href = URL.createObjectURL(blob);
    dispatch(
      addNewBlobUrl({
        url: href,
        cid: cid,
      })
    );

    dispatch(
      checkFileIsOnTheServer({
        cid: cid,
      })
    )
      .unwrap()
      .then((found) => {
        if (!found) {
          const newFile = new File([blob], cid);
          dispatch(fetchUpdateIntegrityFile({ file: newFile }));
        }
      });

    fileBlobList.length = 0;

    return cid;
  }
);
export const getFileFromIPFSReducer = {
  [getFileFromIPFS.pending as any]: (state: IlocalIpfs) => {
    state.getFileFromIPFS.loading = true;
  },
  [getFileFromIPFS.fulfilled as any]: (state: IlocalIpfs, action: any) => {
    state.getFileFromIPFS.loading = false;

    if (!state.preloadedCid.includes(action.payload)) {
      state.preloadedCid.push(action.payload);
    }
  },
  [getFileFromIPFS.rejected as any]: (state: IlocalIpfs, action: any) => {
    state.getFileFromIPFS.loading = false;
    state.getFileFromIPFS.error = action.error.message;
    toast.error(action.error.message);
  },
};

export const checkIsFileOnLocaLIpfs = createAsyncThunk(
  'infoFile/fetchCheckIsFileOnLocaLIpfs',
  async (data: { cid: string }, { rejectWithValue, getState, dispatch }) => {
    const { cid } = data;
    if (!cid) return false;

    const windowObj = window as any;

    if (!windowObj.ipfsServer) {
      toast.error('IPFS Local Node is not running');
      return false;
    }

    const ipfs = windowObj.ipfsServer;
    let isFileInLocalIpfs = false;

    const getFirstByte = ipfs.cat(cid, {
      // timeout: 300, // 10 seconds to check // 5 seems to be enough but slow, debug in 100ms
      // timeout: 1000, // 10 seconds to check // 5 seems to be enough but slow, debug in 100ms
      timeout: 2000, // 10 seconds to check // 5 seems to be enough but slow, debug in 100ms
      offset: 0,
      length: 1,
    });

    for await (const chunk of getFirstByte) {
      isFileInLocalIpfs = true;
      break;
    }

    return isFileInLocalIpfs;
  }
);
export const checkIsFileOnLocaLIpfsReducer = {
  [checkIsFileOnLocaLIpfs.pending as any]: (state: IlocalIpfs) => {
    state.checkIsFileOnLocaLIpfs.loading = true;
  },
  [checkIsFileOnLocaLIpfs.fulfilled as any]: (
    state: IlocalIpfs,
    action: any
  ) => {
    state.checkIsFileOnLocaLIpfs.loading = false;
    state.checkIsFileOnLocaLIpfs.found = action.payload;
  },
  [checkIsFileOnLocaLIpfs.rejected as any]: (
    state: IlocalIpfs,
    action: any
  ) => {
    state.checkIsFileOnLocaLIpfs.loading = false;
    action.payload = false;
  },
};
