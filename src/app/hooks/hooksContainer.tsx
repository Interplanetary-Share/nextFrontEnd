import NeedLoginModal from '../components/general/modal/needLogin';
import UploadFile from '../components/home/uploadFile/uploadFile';
import useAnalitics from './custom/useAnalitics';
import useCheckUserInfo from './state/useCheckUserInfo';
import useGetFileInfo from './state/useGetFileInfo';
import useGetFiles from './state/useGetFiles';
import useInitIpfs from './custom/useInitIpfs';
import useRedirect from './custom/useRedirect';
import useGetTags from './state/useGetTags';

const HooksContainer = () => {
  useInitIpfs();
  useAnalitics();
  useRedirect();
  useCheckUserInfo();

  useGetFiles();
  useGetFileInfo();
  useGetTags();

  return (
    <>
      <NeedLoginModal />
      <UploadFile />
    </>
  );
};

export default HooksContainer;
