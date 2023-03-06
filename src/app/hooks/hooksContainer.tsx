import NeedLoginModal from '../components/general/modal/needLogin';
import ReportModal from '../components/general/modal/reportModal';
import ShareModal from '../components/general/modal/shareModal';
import UploadFile from '../components/home/uploadFile/uploadFile';
import useAnalitics from './custom/useAnalitics';
import useInitIpfs from './custom/useInitIpfs';
import useRedirect from './custom/useRedirect';
import useSocketInit from './sockets/useSocketInit';
import useCheckUserInfo from './state/useCheckUserInfo';
import useGetFileInfo from './state/useGetFileInfo';
import useGetFiles from './state/useGetFiles';
import useGetTags from './state/useGetTags';

const HooksContainer = () => {
  useInitIpfs(); //DISABLED FOR NOW
  useAnalitics();
  useRedirect();
  useCheckUserInfo();

  useGetFiles();
  useGetFileInfo();
  useGetTags();

  useSocketInit();
  return (
    <>
      <ShareModal />
      <ReportModal />
      <NeedLoginModal />
      <UploadFile />
    </>
  );
};

export default HooksContainer;
