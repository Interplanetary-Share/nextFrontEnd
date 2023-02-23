import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFilesFromDb } from '../store/slices/files/allFiles.action';

const useGetFiles = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('fastlog => fetchFilesFromdb');

    dispatch(fetchFilesFromDb() as any);
  }, []);
};

export default useGetFiles;
