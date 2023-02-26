import NeedLoginModal from '../components/general/modal/needLogin';
import UploadFile from '../components/home/uploadFile/uploadFile';
import useAnalitics from './useAnalitics';
import useCheckUserInfo from './useCheckUserInfo';
import useGetFileInfo from './useGetFileInfo';
import useGetFiles from './useGetFiles';
import useInitIpfs from './useInitIpfs';
import useRedirect from './useRedirect';

const HooksContainer = () => {
  useRedirect();
  useGetFileInfo();
  useGetFiles();
  useCheckUserInfo();
  useAnalitics();
  useInitIpfs();

  return (
    <>
      <NeedLoginModal />
      <UploadFile />
    </>
  );
};

export default HooksContainer;
