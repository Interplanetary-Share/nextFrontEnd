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
  chunk: any;
  cid: string;
  status: string;
  file: any;
  progress: number;
  sizeSent: number;
  chunkNumber: number;
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
      ({
        chunk,
        status,
        file,
        progress,
        sizeSent,
        chunkNumber,
      }: IDownloadChunk) => {
        // if (status === 'start') {
        // }
        if (status === 'downloading') {
          const blob = new Blob([chunk]);

          blobList.push(blob);
          const { size } = file;

          if (cid && cid === file.cid) {
            setStatusInfoFile({
              message: `Downloading...` + sizeSent + '/' + size,
              progress: progress,
            });
          }
        }
        if (status === 'end') {
          const blob = new Blob(blobList);
          const newFile = new File([blob], file.name, { type: file.type });
          const url = URL.createObjectURL(blob);
          dispatch(addFileToIPFS({ file: newFile }) as any);

          dispatch(
            addNewBlobUrl({
              url: url,
              cid: file.cid,
            })
          );
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
