/* eslint-disable react-hooks/exhaustive-deps */
import { fetchGetComments } from '@/app/store/slices/infoFile/infoFileComments.action';
import {
  checkIsFileOnLocaLIpfs,
  getFileFromIPFS,
} from '@/app/store/slices/ipfs/local/ipfs.action';
import isFilePreloaded from '@/app/utils/fileOptions/checkFileIsPreloaded';
// import {
//   fetchCheckIsFileOnLocaLIpfs,
//   fetchGetFileFromIPFS,
// } from '@/app/store/slices/ipfs/remote/ipfs.action';
// import { setStatusInfoFile } from '@/app/utils/ipfs/setStatusInfoFile';
import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInfoFileFromDb } from '../../store/slices/infoFile/infoFile.action';

const useGetFileInfo = () => {
  const { cid, cover } = useSelector((state: any) => state.infoFile);
  const {
    socketInit: { globalVar },
    urlList,
  } = useSelector((state: any) => state.socket);

  const {
    initIpfs: { status },
  } = useSelector((state: any) => state.ipfs.local);
  const dispatch = useDispatch();

  useMemo(() => {
    if (cid && cid !== '') {
      console.log('useGetFileInfo: cid', cid);

      dispatch(fetchInfoFileFromDb() as any);
      dispatch(fetchGetComments() as any);
    }
  }, [cid]);

  // fetch file
  useEffect(() => {
    if (!globalVar) return;
    if (!cid || cid === '') return;
    if (!window) return;
    if (!status || status !== 'idle') return;

    if (!isFilePreloaded(urlList, cid)) {
      dispatch(
        checkIsFileOnLocaLIpfs({
          cid: cid,
        }) as any
      )
        .unwrap()
        .then((found: boolean) => {
          if (found) {
            dispatch(
              getFileFromIPFS({
                cid: cid,
              }) as any
            );
          } else {
            // Download from server and add to ipfs
            const socket = window[globalVar] as any;
            socket.emit('download', cid);
          }
        });
    }
  }, [cid, globalVar, status]);

  // fetch cover
  useEffect(() => {
    if (!globalVar) return;
    if (!cover || cover === '' || cover === 'disabled') return;
    if (!window) return;
    if (!status || status !== 'idle') return;

    if (!isFilePreloaded(urlList, cover)) {
      dispatch(
        checkIsFileOnLocaLIpfs({
          cid: cover,
        }) as any
      )
        .unwrap()
        .then((found: boolean) => {
          if (found) {
            dispatch(
              getFileFromIPFS({
                cid: cover,
              }) as any
            );
          } else {
            // Download from server and add to ipfs
            const socket = window[globalVar] as any;
            socket.emit('download', cover);
          }
        });
    }
  }, [cover, globalVar, status]);
};

export default useGetFileInfo;

// useMemo(() => {
//   if (cid && cid !== '') {
//     console.log(`fastlog => ipfsLoaded:`, ipfsLoaded);
//     if (ipfsLoaded) {
//       setStatusInfoFile({
//         message: 'Getting file from Local IPFS node',
//         progress: 20,
//       });

//       dispatch(fetchCheckIsFileOnLocaLIpfs() as any)
//         .unwrap()
//         .then((res: any) => {
//           console.log(`fastlog => res:`, res);
//           if (res) {
//             // file is on local ipfs node
//             dispatch(fetchGetFileFromIPFS() as any);
//           } else {
//             // file is not on local ipfs node
//             // the hook will be launched.
//           }
//         });
//     }
//   }
// }, [cid, ipfsLoaded]);
