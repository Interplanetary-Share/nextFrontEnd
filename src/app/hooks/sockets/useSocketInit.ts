/* eslint-disable react-hooks/exhaustive-deps */
import { apiHostname } from '@/app/store/endpoints';
import { addFileToIPFS } from '@/app/store/slices/ipfs/local/ipfs.action';

import {
  addNewBlobUrl,
  setSocketInit,
} from '@/app/store/slices/socket/socket.slice';
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
  size: number;
  name: string;
  type: string;
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

    const blobList = [] as any;
    socket.on(
      'download/socket',
      ({ status, chunk, progress, sizeSent, cid, size }: IDownloadChunk) => {
        if (status === 'downloading') {
          const newBuffer = Buffer.from(chunk, 'binary');
          const blob = new Blob([newBuffer]);
          blobList.push(blob);
          if (size && progress && sizeSent) {
            setStatusInfoFile({
              message: `Downloading...` + sizeSent + '/' + size,
              progress: progress,
            });
          }
        }
        if (status === 'end') {
          const blob = new Blob(blobList);
          const url = URL.createObjectURL(blob);

          dispatch(
            addNewBlobUrl({
              url: url,
              cid: cid,
            })
          );
          const newFile = new File([blob], cid);
          dispatch(addFileToIPFS({ file: newFile }) as any);

          blobList.length = 0;
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
