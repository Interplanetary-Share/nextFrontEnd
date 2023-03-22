import {
  handleDownload,
  handleReport,
  handleShareFile,
} from '@/app/utils/fileOptions/handleOptions';
import { useDispatch, useSelector } from 'react-redux';

interface ICardOptionsUpper {
  cid: string;
  name: string;
  type: string;
  link?: string; // link to the blob file
}

const CardOptionsUpper = ({ cid, link, name, type }: ICardOptionsUpper) => {
  const { id, reports } = useSelector((state: any) => state.user);
  // const { cid } = useSelector((state: any) => state.infoFile);
  const dispatch = useDispatch();

  const defaultReportBtnClass = 'tooltip btn btn-ghost pt-1';
  const reportBtnClass = reports.includes(cid)
    ? defaultReportBtnClass + 'btn-active'
    : defaultReportBtnClass;

  return (
    <div>
      <div className="btn-group  mt-2 w-full mx-auto justify-end">
        <div
          onClick={() =>
            handleShareFile({
              cid,
              name,
            })
          }
          className="tooltip btn  btn-ghost"
          data-tip="Share link"
        >
          <a className="text-xl">🔗</a>
        </div>
        {link && (
          <div className="tooltip btn btn-ghost" data-tip="Download file">
            <a
              onClick={() =>
                handleDownload({
                  name,
                  link,
                  type,
                  dispatch,
                })
              }
              className="text-xl"
            >
              💾
            </a>
          </div>
        )}

        {/* Disabled */}
        {false && (
          <div
            className={reportBtnClass}
            onClick={() =>
              handleReport({
                id,
                cid,
                array: reports,
                dispatch,
              })
            }
            data-tip="Report file"
          >
            <a className="text-xl ">🚩</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardOptionsUpper;
