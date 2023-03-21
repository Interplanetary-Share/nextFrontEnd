/* eslint-disable react-hooks/exhaustive-deps */
import { fetchGetComments } from '@/app/store/slices/infoFile/infoFileComments.action';
import {
  checkIsFileOnLocaLIpfs,
  getFileFromIPFS,
} from '@/app/store/slices/ipfs/local/ipfs.action';
import { byteNormalize } from '@/app/utils/convert/bytesSizeConvert';
import isFilePreloaded from '@/app/utils/fileOptions/checkFileIsPreloaded';
import { setStatusInfoFile } from '@/app/utils/ipfs/setStatusInfoFile';

import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInfoFileFromDb } from '../../store/slices/infoFile/infoFile.action';

const useGetFileInfo = () => {
  const { cid, cover, size } = useSelector((state: any) => state.infoFile);
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
      setStatusInfoFile({
        message: 'Checking if file is already in local IPFS',
        progress: 20,
      });
      dispatch(
        checkIsFileOnLocaLIpfs({
          cid: cid,
        }) as any
      )
        .unwrap()
        .then((found: boolean) => {
          if (found) {
            setStatusInfoFile({
              message: 'File is already in local IPFS, starting download',
              progress: 25,
            });

            setTimeout(() => {
              setStatusInfoFile({
                message:
                  'Downloading ' + byteNormalize(size) + ' from local IPFS',
                progress: 100,
              });
            }, 0);

            dispatch(
              getFileFromIPFS({
                cid: cid,
              }) as any
            );
          } else {
            setStatusInfoFile({
              message: 'File is not in local IPFS, starting download',
              progress: 25,
            });
            // Download from server and add to ipfs
            const socket = window[globalVar] as any;
            socket.emit('download', cid);
          }
        })
        .catch((err: any) => {
          setStatusInfoFile({
            message: 'File is not in local IPFS, starting download',
            progress: 25,
          });
          // Download from server and add to ipfs
          const socket = window[globalVar] as any;
          socket.emit('download', cid);
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
        })
        .catch((err: any) => {
          // Download from server and add to ipfs
          const socket = window[globalVar] as any;
          socket.emit('download', cover);
        });
    }
  }, [cover, globalVar, status]);
};

export default useGetFileInfo;
