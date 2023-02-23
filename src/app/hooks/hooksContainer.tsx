import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFilesFromDb } from '../store/slices/files/allFiles.action';
import useGetFileInfo from './useGetFileInfo';
import useGetFiles from './useGetFiles';

const HooksContainer = () => {
  useGetFileInfo();
  useGetFiles();

  return <></>;
};

export default HooksContainer;
