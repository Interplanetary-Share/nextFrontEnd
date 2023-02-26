import { fetchDownloadFile } from '@/app/store/slices/infoFile/infoFile.action';
import {
  fetchDislikeNewFile,
  fetchFavoriteNewFile,
  fetchLikeNewFile,
  fetchUndislikeNewFile,
  fetchUnfavoriteNewFile,
  fetchUnlikeNewFile,
} from '@/app/store/slices/user/fileOptions.action';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CardOptionsUpper = () => {
  const { id, likes, dislikes, favorites, reports } = useSelector(
    (state: any) => state.user
  );
  const { cid } = useSelector((state: any) => state.infoFile);
  const dispatch = useDispatch();

  const handleReport = () => {
    if (!id || id === '') {
      document.getElementById('needLogin')?.click();
      return;
    }
    // Verificar si ya ha reportado,  con info de reporte,
    // y info de contacto
    // crear un modal para crear nuevo reporte. con info de reporte
    //
    // si  ya ha creado reporte puede eliminarlo o editarlo

    // if (reports.includes(cid)) {
    //   // dispatch(fetchUnfavoriteNewFile() as any);
    // } else {
    //   // dispatch(fetchFavoriteNewFile() as any);
    // }
  };

  const buttonClassName = (userOptionArr: string[]) => {
    if (userOptionArr.includes(cid)) {
      return 'tooltip btn btn-ghost btn-active pt-1';
    } else {
      return 'tooltip btn btn-ghost pt-1';
    }
  };

  const handleDownload = () => {
    dispatch(fetchDownloadFile() as any);
  };

  return (
    <div>
      <div className="btn-group  mt-2 w-full mx-auto justify-end">
        <div className="tooltip btn  btn-ghost" data-tip="Share link">
          <a className="text-xl">🔗</a>
        </div>

        <div className="tooltip btn btn-ghost" data-tip="Download file">
          <a onClick={handleDownload} className="text-xl">
            💾
          </a>
        </div>

        <div
          className={buttonClassName(reports)}
          onClick={handleReport}
          data-tip="Report file"
        >
          <a className="text-xl ">🚩</a>
        </div>
      </div>
    </div>
  );
};

export default CardOptionsUpper;
