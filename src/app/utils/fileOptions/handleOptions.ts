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
import {
  reportFileModal,
  shareFileModal,
  userNeedLogin,
} from '../misc/modalsToggle';

interface IHandleOptions {
  id: string;
  cid: string;
  array: string[];
  dispatch: Dispatch;
}

export const handleLike = ({ id, cid, array, dispatch }: IHandleOptions) => {
  if (!id || id === '') {
    return userNeedLogin();
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
    return userNeedLogin();
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
    return userNeedLogin();
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

interface IHandleReport {
  cid: string;
  id: string; // user id

  dispatch: Dispatch;
}

export const handleReport = ({
  cid,
  id,

  dispatch,
}: IHandleReport) => {
  if (!id || id === '') {
    return userNeedLogin();
  }
  reportFileModal({ cid, name: 'name' });

  // comments: string;
  // reasons: string[];

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

interface IHandleShare {
  cid: string;
  name: string;
}

export const handleShareFile = ({ cid, name }: IHandleShare) => {
  return shareFileModal({
    cid,
    name,
  });
};

interface IHandleDownload {
  link: string; //blob link
  type: string; //file type
  name: string; //file name
  dispatch: Dispatch;
}

export const handleDownload = ({
  link,
  type,
  name,
  dispatch,
}: IHandleDownload) => {
  // We need link, name and type.
  dispatch(
    fetchDownloadFile({
      link,
      type,
      name,
    }) as any
  );
};
