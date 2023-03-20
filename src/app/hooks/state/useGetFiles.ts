import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilesFromDb } from '../../store/slices/files/allFiles.action';

const useGetFiles = () => {
  const { filters, basicList } = useSelector((state: any) => state.allFiles);
  const { socketInit:{globalVar} } = useSelector((state: any) => state.socket);
  

  


  const dispatch = useDispatch();

  useMemo(() => {
    dispatch(fetchFilesFromDb() as any);
  }, [filters]);



  useEffect(() => {
    if(!globalVar) return;
    if(!basicList || basicList.length === 0) return;
    if(!window) return;
    console.log(basicList, 'basicList');
    
    basicList.forEach((filePost: any) => {
      const {cid, cover} = filePost;
      const socket = window[globalVar] as any;
      socket.emit('download', cid);
      socket.emit('download', cover);

    });

  }, [basicList, globalVar]);

};

export default useGetFiles;
