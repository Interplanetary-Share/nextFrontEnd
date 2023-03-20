import {
  checkIsFileOnLocaLIpfs,
  getFileFromIPFS,
} from '@/app/store/slices/ipfs/local/ipfs.action';
import isFilePreloaded from '@/app/utils/fileOptions/checkFileIsPreloaded';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilesFromDb } from '../../store/slices/files/allFiles.action';

const useGetFiles = () => {
  const { filters, basicList } = useSelector((state: any) => state.allFiles);
  const {
    socketInit: { globalVar },
    urlList,
  } = useSelector((state: any) => state.socket);

  const {
    initIpfs: { status },
  } = useSelector((state: any) => state.ipfs.local);
  const dispatch = useDispatch();

  // Get fileInfo from db
  useMemo(() => {
    dispatch(fetchFilesFromDb() as any);
  }, [filters]);

  useEffect(() => {
    if (!globalVar) return;
    if (!basicList || basicList.length === 0) return;
    if (!window) return;
    if (!status || status !== 'idle') return;

    basicList.forEach((filePost: any) => {
      const { cover } = filePost;
      if (!cover || cover === '' || cover === 'disabled') return;
      if (!isFilePreloaded(urlList, cover)) {
        console.log('1');

        dispatch(
          checkIsFileOnLocaLIpfs({
            cid: cover,
          }) as any
        )
          .unwrap()
          .then((found: any) => {
            console.log(`fastlog => found:`, found);
            if (found) {
              console.log('2');

              dispatch(
                getFileFromIPFS({
                  cid: cover,
                }) as any
              );
            } else {
              console.log('3');

              // Download from server and add to ipfs
              const socket = window[globalVar] as any;
              socket.emit('download', cover);
            }
          });
      }
    });
  }, [basicList, globalVar, status]);
};

export default useGetFiles;
