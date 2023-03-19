/* eslint-disable react-hooks/exhaustive-deps */
import { apiHostname } from '@/app/store/endpoints';
import {
  setCoverLink,
  setFileLink,
} from '@/app/store/slices/infoFile/infoFile.slice';
import {
  setAddBlobChunk,
  setNewFileBlob,
} from '@/app/store/slices/socket/socket.slice';
import { fetchAddFileToIPFS } from '@/app/store/slices/ipfs/remote/ipfs.action';
import { byteNormalize } from '@/app/utils/convert/bytesSizeConvert';
import { setStatusInfoFile } from '@/app/utils/ipfs/setStatusInfoFile';
import { useMemo, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

interface IDownloadChunk {
  chunk: any;
  cid: string;
  status: string;
  file: any;
  progress: number;
  sizeSent: number;
}

const useSocketInit = () => {
  const { cid, found, cover } = useSelector((state: any) => state.infoFile);
  const {
    fetchInitIpfs: { loaded: ipfsLoaded, loading: ipfsLoading },
    fetchCheckIsFileOnLocaLIpfs: {
      loading: fetchCheckIsFileOnLocaLIpfsLoading,
      found: fetchCheckIsFileOnLocaLIpfsFound,
    },
  } = useSelector((state: any) => state.ipfs);
  const dispatch = useDispatch();

  const toastId = useRef(null);
  const [socket, setsocket] = useState(undefined as any);
  //   ini socket
  useEffect(() => {
    if (!window) return;
    const socket = io(apiHostname as string);
    setsocket(socket);
    const windowObj = window as any;
    windowObj.socketIo = socket;

    socket.on(
      'download/socket',
      ({ chunk, status, file, progress, sizeSent }: IDownloadChunk) => {
        if (status === 'start') {
          console.log('start');
        }
        if (status === 'downloading') {
          const blob = new Blob([chunk]);
          dispatch(
            setAddBlobChunk({
              blobChunk: blob,
              cid: file.cid | file.cover,
            })
          );
        }
        if (status === 'end') {
          dispatch(
            setNewFileBlob({
              cid: file.cid,
              type: file.type,
            })
          );
        }
      }
    );
  }, []);

  //  //   Emit
  //  useMemo(() => {
  //    if (!cover && cover === '') return;
  //    if (!socket) return;
  //
  //    socket.emit('download/cover', cover);
  //  }, [cover, socket]);

  //  useMemo(() => {
  //    if (!cid && cid === '') return;
  //    if (!socket) return;
  //    if (!ipfsLoaded) return; //check if ipfs is loaded
  //    if (ipfsLoading || fetchCheckIsFileOnLocaLIpfsLoading) return; //check if ipfs is loading
  //    if (fetchCheckIsFileOnLocaLIpfsFound) return; //means file is already downloaded
  //
  //    console.log('emit download/file');
  //
  //    socket.emit('download/file', cid);
  //  }, [
  //    cid,
  //    socket,
  //    ipfsLoaded,
  //    ipfsLoading,
  //    fetchCheckIsFileOnLocaLIpfsLoading,
  //    fetchCheckIsFileOnLocaLIpfsFound,
  //  ]);

  //first we need to get the file list to download =>
};

export default useSocketInit;
