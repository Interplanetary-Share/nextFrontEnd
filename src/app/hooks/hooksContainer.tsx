import NeedLoginModal from '../components/general/modal/needLogin';
import UploadFile from '../components/home/uploadFile/uploadFile';
import useAnalitics from './useAnalitics';
import useCheckUserInfo from './useCheckUserInfo';
import useGetFileInfo from './useGetFileInfo';
import useGetFiles from './useGetFiles';
import useInitIpfs from './useInitIpfs';
import useRedirect from './useRedirect';

const HooksContainer = () => {
  useInitIpfs();
  useAnalitics();
  useRedirect();
  useCheckUserInfo();

  useGetFiles();
  useGetFileInfo();

  return (
    <>
      <NeedLoginModal />
      <UploadFile />
    </>
  );
};

export default HooksContainer;
