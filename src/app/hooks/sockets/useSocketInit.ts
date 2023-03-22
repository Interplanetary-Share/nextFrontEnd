/* eslint-disable react-hooks/exhaustive-deps */
import { apiHostname } from '@/app/store/endpoints';
import { addFileToIPFS } from '@/app/store/slices/ipfs/local/ipfs.action';

import {
  addNewBlobUrl,
  setSocketInit,
} from '@/app/store/slices/socket/socket.slice';
import { byteNormalize } from '@/app/utils/convert/bytesSizeConvert';
import { setStatusInfoFile } from '@/app/utils/ipfs/setStatusInfoFile';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

interface IDownloadChunk {
  status: string;
  chunk: any;
  progress: number;
  sizeSent: number;
  cid: string;
  name: string;
  type: string;
  size: number;
}

const useSocketInit = () => {
  const { cid } = useSelector((state: any) => state.infoFile);

  const dispatch = useDispatch();
  const [socketVar, setsocket] = useState(undefined as any);

  const toastId = useRef(null);
  //   ini socket
  useMemo(() => {
    const socket = io(apiHostname as string);
    setsocket(socket);

    const blobList = {} as any;
    socket.on(
      'download/socket',
      ({
        status,
        chunk,
        progress,
        sizeSent,
        cid,
        size,
        type,
      }: IDownloadChunk) => {
        if (status === 'start') {
          blobList[cid] = [];
        }
        if (status === 'downloading') {
          const blob = new Blob([chunk]);
          blobList[cid].push(blob);

          if (progress && sizeSent && size) {
            setStatusInfoFile({
              message:
                byteNormalize(sizeSent) +
                ' downloaded of ' +
                byteNormalize(size),
              progress: progress,
            });
          }
        }
        if (status === 'end') {
          if (type) {
            const blob = new Blob(blobList[cid], { type: type });
            const url = URL.createObjectURL(blob);
            dispatch(
              addNewBlobUrl({
                url: url,
                cid: cid,
              })
            );
            dispatch(addFileToIPFS({ blob: blob }) as any);
          } else {
            const blob = new Blob(blobList[cid]);
            const url = URL.createObjectURL(blob);

            dispatch(
              addNewBlobUrl({
                url: url,
                cid: cid,
              })
            );
            dispatch(addFileToIPFS({ blob: blob }) as any);
          }

          blobList[cid] = [];
        }
      }
    );
  }, []);

  useEffect(() => {
    if (!window) return;
    const windowObj = window as any;
    windowObj.socketIo = socketVar;
    dispatch(setSocketInit('socketIo'));
  }, [socketVar]);
};

export default useSocketInit;
