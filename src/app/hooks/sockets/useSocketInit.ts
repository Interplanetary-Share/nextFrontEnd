/* eslint-disable react-hooks/exhaustive-deps */
import { apiHostname } from '@/app/store/endpoints';
import {
  setCoverLink,
  setFileLink
} from '@/app/store/slices/infoFile/infoFile.slice';
import { fetchAddFileToIPFS } from '@/app/store/slices/ipfs/ipfs.action';
import { byteNormalize } from '@/app/utils/convert/bytesSizeConvert';
import { setStatusInfoFile } from '@/app/utils/ipfs/setStatusInfoFile';
import { useMemo, useRef, useState } from 'react';
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
    let fileObj = {} as any;
    socket.on(
      'download/file/chunk/',
      ({ chunk, status, file, progress, sizeSent }: IDownloadChunk) => {
        if (status === 'start') {
          fileObj = file;
          const { name } = file;
          setStatusInfoFile({
            message: 'Starting download of ' + name,
            progress: 25,
          });
        }

        if (status === 'downloading') {
          const blob = new Blob([chunk]);
          fileBlobList.push(blob);
          const progressPercent = Math.round(progress * 100);

          setStatusInfoFile({
            message:
              'Downloading ' +
              fileObj.name +
              ': ' +
              progressPercent +
              '% (' +
              byteNormalize(sizeSent) +
              ' of ' +
              byteNormalize(fileObj.size) +
              ')',
            progress: progress * 100,
          });
        }

        if (status === 'end') {
          const blob = new Blob(fileBlobList);
          const href = URL.createObjectURL(blob);
          // Create new file object
          const newFile = new File([blob],'file', {type: fileObj.type});

          dispatch(
            fetchAddFileToIPFS({
              file: newFile,
            }) as any
          )


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
    if (!ipfsLoaded) return; //check if ipfs is loaded
    if (ipfsLoading || fetchCheckIsFileOnLocaLIpfsLoading) return; //check if ipfs is loading
    if (fetchCheckIsFileOnLocaLIpfsFound) return; //means file is already downloaded

    console.log('emit download/file');

    socket.emit('download/file', cid);
  }, [
    cid,
    socket,
    ipfsLoaded,
    ipfsLoading,
    fetchCheckIsFileOnLocaLIpfsLoading,
    fetchCheckIsFileOnLocaLIpfsFound,
  ]);
};

export default useSocketInit;
