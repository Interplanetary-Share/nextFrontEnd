import { UrlFileList } from '@/app/store/slices/socket/socket.slice';

const isFilePreloaded = (arr2Check: UrlFileList[], cid: string) => {
  if (!arr2Check || !arr2Check.length) return false;

  return arr2Check.some(
    (urlFile: { cid: string; url: string }) => urlFile.cid === cid
  );
};

export default isFilePreloaded;
