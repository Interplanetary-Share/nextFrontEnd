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

const FileOptions = () => {
  const { id, likes, dislikes, favorites, reports } = useSelector(
    (state: any) => state.user
  );
  const { cid } = useSelector((state: any) => state.infoFile);
  const dispatch = useDispatch();

  const handleLike = () => {
    if (!id || id === '') {
      document.getElementById('needLogin')?.click();
      return;
    }

    if (likes.includes(cid)) {
      dispatch(fetchUnlikeNewFile() as any);
    } else {
      dispatch(fetchLikeNewFile() as any);
    }
  };

  const handleDislike = () => {
    if (!id || id === '') {
      document.getElementById('needLogin')?.click();
      return;
    }
    if (dislikes.includes(cid)) {
      dispatch(fetchUndislikeNewFile() as any);
    } else {
      dispatch(fetchDislikeNewFile() as any);
    }
  };

  const handleFavorite = () => {
    if (!id || id === '') {
      document.getElementById('needLogin')?.click();
      return;
    }
    if (favorites.includes(cid)) {
      dispatch(fetchUnfavoriteNewFile() as any);
    } else {
      dispatch(fetchFavoriteNewFile() as any);
    }
  };

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
      return 'tooltip btn btn-active pt-1';
    } else {
      return 'tooltip btn pt-1';
    }
  };

  const handleDownload = () => {
    dispatch(fetchDownloadFile() as any);
  };

  return (
    <div>
      <div className="btn-group  mt-10 w-full mx-auto">
        <div
          className={buttonClassName(likes)}
          onClick={handleLike}
          data-tip="Like"
        >
          <a className=" text-3xl">😍</a>
        </div>

        <div
          className={buttonClassName(dislikes)}
          onClick={handleDislike}
          data-tip="Dislike"
        >
          <a className="text-3xl">🤮</a>
        </div>

        <div
          className={buttonClassName(favorites)}
          onClick={handleFavorite}
          data-tip="Save to your favourites"
        >
          <a className="text-3xl">❤️‍🔥</a>
        </div>

        <div className="tooltip btn" data-tip="Share link">
          <a className="text-3xl">🔗</a>
        </div>

        <div className="tooltip btn" data-tip="Download file">
          <a onClick={handleDownload} className="text-3xl">
            💾
          </a>
        </div>

        <div
          className={buttonClassName(reports)}
          onClick={handleReport}
          data-tip="Report file"
        >
          <a className="text-3xl">🚩</a>
        </div>
      </div>
    </div>
  );
};

export default FileOptions;
