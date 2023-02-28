import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilesFromDb } from '../../store/slices/files/allFiles.action';

const useGetFiles = () => {
  const { filters } = useSelector((state: any) => state.allFiles);

  const dispatch = useDispatch();

  useMemo(() => {
    dispatch(fetchFilesFromDb() as any);
  }, [filters]);
};

export default useGetFiles;
