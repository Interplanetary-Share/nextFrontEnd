import { byteNormalize } from '@/app/utils/convert/bytesSizeConvert';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { apiDownload } from '../../endpoints';
import { IIpfs } from './ipfs.slice';

interface addFileToIPFS {
  file: File;
}

export const fetchAddFileToIPFS = createAsyncThunk(
  'infoFile/fetchAddFileToIPFS',
  async (data: addFileToIPFS, { rejectWithValue, getState }) => {
    const { file } = data;
    console.log(`fastlog => file:`, file);
    const windowObj = window as any;

    if (!windowObj.ipfsServer)
      return rejectWithValue('IPFS server is not running');

    const ipfs = windowObj.ipfsServer;

    const info = await ipfs.id();
    console.log(`fastlog => info:`, info);

    // THIUS WORKS ONM NEW SCREEN AND  NEW WINDOW
    // const stream = file.stream().tee();
    const stream = file.stream();

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
    console.log(`fastlog => cid:`, cid);

    console.log(`fastlog => infoFile:`, infoFile);

    return infoFile;
    // return true;
  }
);
export const fetchAddFileToIPFSReducer = {
  [fetchAddFileToIPFS.pending as any]: (state: IIpfs) => {
    state.fetchAddFileToIPFS.loading = true;
  },
  [fetchAddFileToIPFS.fulfilled as any]: (state: IIpfs, action: any) => {
    state.info.file = action.payload;
    state.fetchAddFileToIPFS.loading = false;
  },
  [fetchAddFileToIPFS.rejected as any]: (state: IIpfs, action: any) => {
    state.fetchAddFileToIPFS.loading = false;
    state.fetchAddFileToIPFS.error = action.error.message;
  },
};

export const fetchInitIpfs = createAsyncThunk(
  'infoFile/fetchInitIpfs',
  async (data, { rejectWithValue, getState }) => {
    const windowObj = window as any;
    const ipfs = await windowObj.IpfsCore.create({
      repo: 'ipfs-6', //+ Math.random(),
      config: {
        Addresses: {
          api: '/ip4/127.0.0.1/tcp/3010',
          Swarm: [
            '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
            '/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/',
            '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
          ],
          Delegates: [
            '/dns4/node0.delegate.ipfs.io/tcp/443/https',
            '/dns4/node1.delegate.ipfs.io/tcp/443/https',
            '/dns4/node2.delegate.ipfs.io/tcp/443/https',
            '/dns4/node3.delegate.ipfs.io/tcp/443/https',
          ],
        },
        Bootstrap: [
          '/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
          '/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
          '/dns4/sfo-3.bootstrap.libp2p.io/tcp/443/wss/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',

          '/dns4/node0.preload.ipfs.io/tcp/443/wss/p2p/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic',
          '/dns4/node1.preload.ipfs.io/tcp/443/wss/p2p/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6',
          '/dns4/node2.preload.ipfs.io/tcp/443/wss/p2p/QmV7gnbW5VTcJ3oyM2Xk1rdFBJ3kTkvxc87UFGsun29STS',
          '/dns4/node3.preload.ipfs.io/tcp/443/wss/p2p/QmY7JB6MQXhxHvq7dBDh4HpbH29v4yE9JRadAVpndvzySN',

          '/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
          '/dnsaddr/bootstrap.libp2p.io/p2p/QmZa1sAxajnQjVM8WjWXoMbmPd7NsWhfKsPkErzpm9wGkp',
          '/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt',
        ],
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
        Discovery: {
          MDNS: {
            Enabled: true,
            Interval: 3,
          },
          webRTCStar: {
            Enabled: true,
          },
        },
        Swarm: {
          ConnMgr: {
            LowWater: 5000, // default 10 recommended 200
            HighWater: 5500, // default 50 recommended 300
          },
          EnableAutoRelay: true,
          EnableRelayHop: true,
          DisableNatPortMap: true,
        },
        Peering: {
          Peers: [
            {
              ID: 'QmcFf2FH3CEgTNHeMRGhN7HNHU1EXAxoEk6EFuSyXCsvRE',
              Addrs: ['/dnsaddr/node-1.ingress.cloudflare-ipfs.com/'],
            },
            {
              ID: 'QmcFmLd5ySfk2WZuJ1mfSWLDjdmHZq7rSAua4GoeSQfs1z',
              Addrs: ['/dnsaddr/node-2.ingress.cloudflare-ipfs.com/'],
            },
            {
              ID: 'QmcfFmzSDVbwexQ9Au2pt5YEXHK5xajwgaU6PpkbLWerMa',
              Addrs: ['/dnsaddr/node-3.ingress.cloudflare-ipfs.com/'],
            },
            {
              ID: 'QmcfJeB3Js1FG7T8YaZATEiaHqNKVdQfybYYkbT1knUswx',
              Addrs: ['/dnsaddr/node-4.ingress.cloudflare-ipfs.com/'],
            },
            {
              ID: 'QmcfVvzK4tMdFmpJjEKDUoqRgP4W9FnmJoziYX5GXJJ8eZ',
              Addrs: ['/dnsaddr/node-5.ingress.cloudflare-ipfs.com/'],
            },
            {
              ID: 'QmcfZD3VKrUxyP9BbyUnZDpbqDnT7cQ4WjPP8TRLXaoE7G',
              Addrs: ['/dnsaddr/node-6.ingress.cloudflare-ipfs.com/'],
            },
            {
              ID: 'QmcfZP2LuW4jxviTeG8fi28qjnZScACb8PEgHAc17ZEri3',
              Addrs: ['/dnsaddr/node-7.ingress.cloudflare-ipfs.com/'],
            },
            {
              ID: 'QmcfgsJsMtx6qJb74akCw1M24X1zFwgGo11h1cuhwQjtJP',
              Addrs: ['/dnsaddr/node-8.ingress.cloudflare-ipfs.com/'],
            },
            {
              ID: 'Qmcfr2FC7pFzJbTSDfYaSy1J8Uuy8ccGLeLyqJCKJvTHMi',
              Addrs: ['/dnsaddr/node-9.ingress.cloudflare-ipfs.com/'],
            },
            {
              ID: 'QmcfR3V5YAtHBzxVACWCzXTt26SyEkxdwhGJ6875A8BuWx',
              Addrs: ['/dnsaddr/node-10.ingress.cloudflare-ipfs.com/'],
            },
            {
              ID: 'Qmcfuo1TM9uUiJp6dTbm915Rf1aTqm3a3dnmCdDQLHgvL5',
              Addrs: ['/dnsaddr/node-11.ingress.cloudflare-ipfs.com/'],
            },
            {
              ID: 'QmcfV2sg9zaq7UUHVCGuSvT2M2rnLBAPsiE79vVyK3Cuev',
              Addrs: ['/dnsaddr/node-12.ingress.cloudflare-ipfs.com/'],
            },
          ],
        },
        Pubsub: {
          enabled: true,
          Router: 'gossipsub',
        },
        API: {
          HTTPHeaders: {
            'Access-Control-Allow-Origin': ['*'],
            'Access-Control-Allow-Methods': ['PUT', 'GET', 'POST'],
          },
        },
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
    const info = await ipfs.id();
    console.log(`fastlog => ipfs:`, ipfs);

    ipfs.swarm.localAddrs().then((addrs: any) => {
      addrs.forEach((addr: any) => {
        console.log(`fastlog => addr:`, addr.toString());
      });
    });

    windowObj.ipfsServer = ipfs;

    console.log(`fastlog => info:`, info);

    return info;

    // return true;
  }
);
export const fetchInitIpfsReducer = {
  [fetchInitIpfs.pending as any]: (state: IIpfs) => {
    state.fetchInitIpfs.loading = true;
  },
  [fetchInitIpfs.fulfilled as any]: (state: IIpfs, action: any) => {
    state.info.ipfs = action.payload;
    state.fetchInitIpfs.loading = false;
  },
  [fetchInitIpfs.rejected as any]: (state: IIpfs, action: any) => {
    toast.error(action.error.message);
    state.fetchInitIpfs.loading = false;
    state.fetchInitIpfs.error = action.error.message;
  },
};

export const fetchDownloadFromIpfs = createAsyncThunk(
  'infoFile/fetchDownloadFromIpfs',
  async (data, { rejectWithValue, getState }) => {
    const { ipfs } = getState() as any;
    const {
      info: { file, addressConnected },
    } = ipfs;

    if (!file) return rejectWithValue('file not found');
    const { cid } = file;

    // axios recieve  stream data
    const res = await axios
      .post(apiDownload + cid, {
        responseType: 'stream',
        headers: {
          'Content-Type': 'application/octet-stream',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
        data: {
          adddress: addressConnected,
        },
      })
      .then((res) => {
        console.log(`fastlog => res:`, res);
        return res.data;
      })
      .catch((err) => {
        console.log(`fastlog => err:`, err);
      });
  }
);
export const fetchDownloadFromIpfsReducer = {
  [fetchDownloadFromIpfs.pending as any]: (state: IIpfs) => {
    state.fetchDownloadFromIpfs.loading = true;
  },
  [fetchDownloadFromIpfs.fulfilled as any]: (state: IIpfs, action: any) => {
    state.info.ipfs = action.payload;
    state.fetchDownloadFromIpfs.loading = false;
  },
  [fetchDownloadFromIpfs.rejected as any]: (state: IIpfs, action: any) => {
    toast.error(action.error.message);
    state.fetchDownloadFromIpfs.loading = false;
    state.fetchDownloadFromIpfs.error = action.error.message;
  },
};
