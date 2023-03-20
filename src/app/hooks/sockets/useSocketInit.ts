/* eslint-disable react-hooks/exhaustive-deps */
import { apiHostname } from '@/app/store/endpoints';
import { addFileToIPFS } from '@/app/store/slices/ipfs/local/ipfs.action';

import {
  addNewBlobUrl,
  setSocketInit,
} from '@/app/store/slices/socket/socket.slice';
import { setStatusInfoFile } from '@/app/utils/ipfs/setStatusInfoFile';

import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
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
  const dispatch = useDispatch();

  const toastId = useRef(null);
  //   ini socket
  useEffect(() => {
    if (!window) return;
    const socket = io(apiHostname as string);
    const windowObj = window as any;
    windowObj.socketIo = socket;

    dispatch(setSocketInit('socketIo'));

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
        console.log('download/file', file);
        if (status === 'start') {
          console.log('start');
        }
        if (status === 'downloading') {
          const blob = new Blob([chunk]);

          blobList.push(blob);
          const { size } = file;

          setStatusInfoFile({
            message: `Downloading...` + sizeSent + '/' + size,
            progress: progress,
          });
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
};

export default useSocketInit;
