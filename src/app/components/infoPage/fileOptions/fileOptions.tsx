import { useGetBlobUrl } from '@/app/hooks/custom/useGetBlobUrl';
import { fetchDownloadFile } from '@/app/store/slices/infoFile/infoFile.action';
import {
  handleDislike,
  handleDownload,
  handleFavorite,
  handleLike,
  handleReport,
  handleShareFile,
} from '@/app/utils/fileOptions/handleOptions';
import { useDispatch, useSelector } from 'react-redux';
import CardStats from '../../home/files/module/cardStats';

const FileOptions = () => {
  const { id, reports } = useSelector((state: any) => state.user);
  const { cid, type, likes, dislikes, favorites, name } = useSelector(
    (state: any) => state.infoFile
  );

  const link = useGetBlobUrl(cid);

  const dispatch = useDispatch();

  const buttonClassName = (userOptionArr: string[]) => {
    if (userOptionArr.includes(cid)) {
      return 'tooltip btn btn-active pt-1';
    } else {
      return 'tooltip btn pt-1';
    }
  };

  return (
    <div className="grid justify-center grid-cols-1 gap-9 w-full  md:w-2/3 md:flex">
      <div className="w-full md:w-96">
        <CardStats
          cid={cid}
          likes={likes}
          dislikes={dislikes}
          favorites={favorites}
        />
      </div>
      <div className="btn-group my-4  md:mt-10 w-full mx-auto justify-center md:justify-end">
        <div
          onClick={() =>
            handleShareFile({
              cid,
              name,
            })
          }
          className="tooltip btn"
          data-tip="Share link"
        >
          <a className="text-3xl">🔗</a>
        </div>

        <div className="tooltip btn" data-tip="Download file">
          <a
            onClick={() => {
              handleDownload({
                name,
                link,
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
              cid,
              id,
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
