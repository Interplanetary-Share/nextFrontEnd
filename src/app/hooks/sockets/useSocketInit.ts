/* eslint-disable react-hooks/exhaustive-deps */
import { apiHostname } from '@/app/store/endpoints';
import {
  setCoverLink,
  setFileLink,
} from '@/app/store/slices/infoFile/infoFile.slice';
import { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

interface IDownloadChunk {
  chunk: any;
  cid: string;
  status: string;
  file: any;
  progress: number;
}

const useSocketInit = () => {
  const { cid, found, cover } = useSelector((state: any) => state.infoFile);
  const dispatch = useDispatch();
  const toastId = useRef(null);
  const [socket, setsocket] = useState(undefined as any);
  //   ini socket
  useMemo(() => {
    const socket = io(apiHostname as string);
    setsocket(socket);

    const coverBlobList = [] as any;
    socket.on('download/cover/chunk/', ({ chunk, status }: IDownloadChunk) => {
      if (chunk) {
        const blob = new Blob([chunk]);
        coverBlobList.push(blob);
      } else {
        if (status === 'end') {
          const blob = new Blob(coverBlobList);
          const href = URL.createObjectURL(blob);
          dispatch(
            setCoverLink({
              link: href,
            })
          );
          setTimeout(() => {
            coverBlobList.length = 0;
          }, 1000);
        }
      }
    });
    const fileBlobList = [] as any;

    socket.on(
      'download/file/chunk/',
      ({ chunk, status, file, progress }: IDownloadChunk) => {
        if (status === 'start') {
          const { name } = file;
          toastId.current = toast.loading('Downloading... ' + name, {
            progress: 0,
            autoClose: 3000,
          }) as any;
        }

        if (status === 'downloading') {
          const blob = new Blob([chunk]);
          fileBlobList.push(blob);
          if (toastId.current) {
            toast.update(toastId.current, {
              progress: progress,
              type: toast.TYPE.INFO,
              autoClose: false,
            });
          }
        }

        if (status === 'end') {
          if (toastId.current) {
            toast.update(toastId.current, {
              render: 'Download complete',
              type: toast.TYPE.SUCCESS,
              isLoading: false,
              progress: undefined,
              autoClose: 3000,
            });
          }
          const blob = new Blob(fileBlobList);
          const href = URL.createObjectURL(blob);

          dispatch(
            setFileLink({
              link: href,
              found: true,
            })
          );
          setTimeout(() => {
            fileBlobList.length = 0;
          }, 1000);
        }
      }
    );
  }, []);

  //   Emit
  useMemo(() => {
    if (!cover && cover === '') return;
    if (!socket) return;

    socket.emit('download/cover', cover);
  }, [cover, socket]);

  useMemo(() => {
    if (!cid && cid === '') return;
    if (!socket) return;
    socket.emit('download/file', cid);
  }, [cid, socket]);
};

export default useSocketInit;
