import NeedLoginModal from '../components/general/modal/needLogin'
import ReportModal from '../components/general/modal/reportModal'
import ShareModal from '../components/general/modal/shareModal'
import UploadFile from '../components/home/uploadFile/uploadFile'
import useAnalitics from './custom/useAnalitics'
import useCheckUserInfo from './state/useCheckUserInfo'
import useGalacFetchInit from './custom/useGalacFetchInit'
import useGetFileInfo from './state/useGetFile'
import useGetFiles from './state/useGetFiles'
import useRedirect from './custom/useRedirect'

const HooksContainer = () => {
  useGalacFetchInit()
  useAnalitics()
  useGetFiles()
  useGetFileInfo()

  useRedirect()
  useCheckUserInfo()
  return (
    <>
      <ShareModal />
      <ReportModal />
      <NeedLoginModal />
      <UploadFile />
    </>
  )
}

export default HooksContainer
