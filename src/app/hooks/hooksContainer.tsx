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

  useGetTags();

  useGetFileInfo(); //get fileinfo from DB and preload all files
  useGetFiles(); //get filesinfo  from DB and preload cover files
  useSocketInit(); //init the socket and wait to download files to preload files.
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
