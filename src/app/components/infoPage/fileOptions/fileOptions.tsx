import { fetchDownloadFile } from '@/app/store/slices/infoFile/infoFile.action';
import {
  handleDislike,
  handleDownload,
  handleFavorite,
  handleLike,
  handleReport,
} from '@/app/utils/fileOptions/handleOptions';
import { useDispatch, useSelector } from 'react-redux';
import CardStats from '../../home/files/module/cardStats';

const FileOptions = () => {
  const { id, reports } = useSelector((state: any) => state.user);
  const { cid, type, likes, dislikes, favorites } = useSelector(
    (state: any) => state.infoFile
  );
  const dispatch = useDispatch();

  const buttonClassName = (userOptionArr: string[]) => {
    if (userOptionArr.includes(cid)) {
      return 'tooltip btn btn-active pt-1';
    } else {
      return 'tooltip btn pt-1';
    }
  };

  return (
    <div className="flex gap-9 w-2/3">
      <div className="w-96">
        <CardStats
          cid={cid}
          likes={likes}
          dislikes={dislikes}
          favorites={favorites}
        />
      </div>
      <div className="btn-group  mt-10 w-full mx-auto justify-end">
        <div className="tooltip btn" data-tip="Share link">
          <a className="text-3xl">🔗</a>
        </div>

        <div className="tooltip btn" data-tip="Download file">
          <a
            onClick={() => {
              handleDownload({
                cid,
                type,
                dispatch,
              });
            }}
            className="text-3xl"
          >
            💾
          </a>
        </div>

        <div
          className={buttonClassName(reports)}
          onClick={() => {
            handleReport({
              id,
              cid,
              array: reports,
              dispatch,
            });
          }}
          data-tip="Report file"
        >
          <a className="text-3xl">🚩</a>
        </div>
      </div>
    </div>
  );
};

export default FileOptions;
