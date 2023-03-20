/* eslint-disable react-hooks/exhaustive-deps */
import { apiHostname } from '@/app/store/endpoints';
import {
  setCoverLink,
  setFileLink
} from '@/app/store/slices/infoFile/infoFile.slice';
import { fetchAddFileToIPFS } from '@/app/store/slices/ipfs/ipfs.action';
import { addNewBlobUrl, setAddBlobChunk, setNewFileBlob, setSocketInit } from '@/app/store/slices/socket/socket.slice';
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
  chunkNumber: number;
}

const useSocketInit = () => {
  //const { cid, found, cover } = useSelector((state: any) => state.infoFile);
  //const {
  //  fetchInitIpfs: { loaded: ipfsLoaded, loading: ipfsLoading },
  //  fetchCheckIsFileOnLocaLIpfs: {
  //    loading: fetchCheckIsFileOnLocaLIpfsLoading,
  //    found: fetchCheckIsFileOnLocaLIpfsFound,
  //  },
  //} = useSelector((state: any) => state.ipfs);
  const dispatch = useDispatch();

  const toastId = useRef(null);
  const [socket, setsocket] = useState(undefined as any);
  //   ini socket
  useEffect(() => {
    if(!window) return;
    const socket = io(apiHostname as string);
    setsocket(socket);
    const windowObj = window as any;
    windowObj.socketIo = socket;
    dispatch(setSocketInit('socketIo'));


    const blobList = [] as any;
    socket.on('download/socket',  ({ chunk, status, file, progress, sizeSent, chunkNumber }: IDownloadChunk) => {
      console.log('download/file', file);
      if(status === 'start'){
        console.log('start')
      }
      if(status === 'downloading'){
        const blob = new Blob([chunk]);

        blobList.push(blob);
 
      }
      if (status === 'end') {

        const blob = new Blob(blobList);
        //const file = new File([blob], file.name, { type: file.type });
        const url = URL.createObjectURL(blob);

        dispatch(addNewBlobUrl({
          url: url,
          cid: file.cid,
        }))   
        blobList.length = 0;
      }
      
    });

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
//    socket.emit('download', cid);
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
