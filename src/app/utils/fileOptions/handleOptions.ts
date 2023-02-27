import { fetchStatsFile } from '@/app/store/slices/files/allFiles.action';
import {
  fetchDownloadFile,
  fetchStatsCurrentFile,
} from '@/app/store/slices/infoFile/infoFile.action';
import {
  fetchDislikeNewFile,
  fetchFavoriteNewFile,
  fetchLikeNewFile,
  fetchUndislikeNewFile,
  fetchUnfavoriteNewFile,
  fetchUnlikeNewFile,
} from '@/app/store/slices/user/fileOptions.action';
import { Dispatch } from '@reduxjs/toolkit';
import { DispatchProp } from 'react-redux';

interface IHandleOptions {
  id: string;
  cid: string;
  array: string[];
  dispatch: Dispatch;
}

export const handleLike = ({ id, cid, array, dispatch }: IHandleOptions) => {
  if (!id || id === '') {
    document.getElementById('needLogin')?.click();
    return;
  }

  if (array.includes(cid)) {
    dispatch(
      fetchUnlikeNewFile({
        cid,
      }) as any
    )
      .unwrap()
      .then(() => {
        dispatch(fetchStatsFile({ cid }) as any);
        dispatch(fetchStatsCurrentFile({ cid }) as any);
      });
  } else {
    dispatch(
      fetchLikeNewFile({
        cid,
      }) as any
    )
      .unwrap()
      .then(() => {
        dispatch(fetchStatsFile({ cid }) as any);
        dispatch(fetchStatsCurrentFile({ cid }) as any);
      });
  }
};

export const handleDislike = ({ id, cid, array, dispatch }: IHandleOptions) => {
  if (!id || id === '') {
    document.getElementById('needLogin')?.click();
    return;
  }
  if (array.includes(cid)) {
    dispatch(
      fetchUndislikeNewFile({
        cid,
      }) as any
    )
      .unwrap()
      .then(() => {
        dispatch(fetchStatsFile({ cid }) as any);
        dispatch(fetchStatsCurrentFile({ cid }) as any);
      });
  } else {
    dispatch(
      fetchDislikeNewFile({
        cid,
      }) as any
    )
      .unwrap()
      .then(() => {
        dispatch(fetchStatsFile({ cid }) as any);
        dispatch(fetchStatsCurrentFile({ cid }) as any);
      });
  }
};

export const handleFavorite = ({
  id,
  cid,
  array,
  dispatch,
}: IHandleOptions) => {
  if (!id || id === '') {
    document.getElementById('needLogin')?.click();
    return;
  }
  if (array.includes(cid)) {
    dispatch(
      fetchUnfavoriteNewFile({
        cid,
      }) as any
    )
      .unwrap()
      .then(() => {
        dispatch(fetchStatsFile({ cid }) as any);
        dispatch(fetchStatsCurrentFile({ cid }) as any);
      });
  } else {
    dispatch(
      fetchFavoriteNewFile({
        cid,
      }) as any
    )
      .unwrap()
      .then(() => {
        dispatch(fetchStatsFile({ cid }) as any);
        dispatch(fetchStatsCurrentFile({ cid }) as any);
      });
  }
};

export const handleReport = ({ id, cid, array, dispatch }: IHandleOptions) => {
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

interface IHandleDownload {
  cid: string;
  type: string;
  dispatch: Dispatch;
}

export const handleDownload = ({ cid, type, dispatch }: IHandleDownload) => {
  dispatch(
    fetchDownloadFile({
      cid,
      type,
    }) as any
  );
};
