import hexstringToBlob from '@/app/utils/convert/hexstringToBlob';
import { getIpfsGateway } from '@/app/utils/ipfs/gateways';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { apiDownload, apiFiles, apiFilesStats } from '../../endpoints';
import { IInfoFile } from './infoFile.slice';

// export const fetchInfoFileRemotely = createAsyncThunk(
//   'infoFile/fetchInfoFileRemotely',
//   async (data, { rejectWithValue, getState }) => {
//     const { infoFile } = getState() as any;
//     const { cid } = infoFile;
//     const apiFileInfo = getIpfsGateway(cid);

//     if (!cid || cid === '') return rejectWithValue('CID is empty');

//     return await axios
//       .head(apiFileInfo)
//       .then((res) => {
//         return {
//           lastModified: res.headers['last-modified'],
//           size: res.headers['content-length'],
//           type: res.headers['content-type'],
//         };
//       })
//       .catch((err) => {
//         return rejectWithValue(err.response.data);
//       });
//   }
// );
// export const fetchInfoFileRemotelyReducer = {
//   [fetchInfoFileRemotely.pending as any]: (state: IInfoFile) => {
//     state.fetchInfoFileRemotely.loading = true;
//   },
//   [fetchInfoFileRemotely.fulfilled as any]: (state: IInfoFile, action: any) => {
//     const { lastModified, size, type } = action.payload;

//     if (lastModified) state.lastModified = lastModified;
//     if (size) state.size = size;
//     if (type) state.type = type;

//     state.fetchInfoFileRemotely.loading = false;
//   },
//   [fetchInfoFileRemotely.rejected as any]: (state: IInfoFile, action: any) => {
//     state.fetchInfoFileRemotely.loading = false;
//     state.fetchInfoFileRemotely.error = action.error.message;
//   },
// };

export const fetchInfoFileFromDb = createAsyncThunk(
  'infoFile/fetchInfoFileFromDb',
  async (data, { rejectWithValue, getState }) => {
    const { infoFile } = getState() as any;
    const { cid } = infoFile;
    const apiFileInfo = apiFiles + cid;

    if (!cid || cid === '') return rejectWithValue('CID is empty');

    return await axios
      .get(apiFileInfo)
      .then((res) => {
        if (!res || !res.data) rejectWithValue('File not found');

        const {
          name,
          description,
          tags,
          size,
          type,
          cover,
          date,
          owner,
          likes,
          dislikes,
          favorites,
          reports,
        } = res.data;

        return {
          name,
          description,
          tags,
          size,
          type,
          cover,
          date,
          owner,
          likes,
          dislikes,
          favorites,
          reports,
        };
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
  }
);
export const fetchInfoFileFromDbReducer = {
  [fetchInfoFileFromDb.pending as any]: (state: IInfoFile) => {
    state.fetchInfoFileFromDb.loading = true;
  },
  [fetchInfoFileFromDb.fulfilled as any]: (state: IInfoFile, action: any) => {
    const {
      size,
      type,
      name,
      description,
      tags,
      cover,
      date,
      owner,
      likes,
      dislikes,
      favorites,
      reports,
    } = action.payload;

    state.found = true;

    if (size) state.size = size;
    if (type) state.type = type;
    if (name) state.name = name;
    if (description) state.description = description;
    if (tags) state.tags = tags;
    if (cover) state.cover = cover;
    if (date) state.date = date;
    if (owner) state.owner = owner;
    if (likes) state.likes = likes;
    if (dislikes) state.dislikes = dislikes;
    if (favorites) state.favorites = favorites;
    if (reports) state.reports = reports;

    state.fetchInfoFileFromDb.loading = false;
  },
  [fetchInfoFileFromDb.rejected as any]: (state: IInfoFile, action: any) => {
    state.found = false;
    state.fetchInfoFileFromDb.loading = false;
    state.fetchInfoFileFromDb.error = action.error.message;
  },
};

// This handles the action to download the file
export const fetchDownloadFile = createAsyncThunk(
  'infoFile/fetchDownloadFile',
  async (data: any, { rejectWithValue, getState }) => {
    const { cid, type } = data;
    const apiFileInfo = apiDownload + cid;

    if (!cid || cid === '') return rejectWithValue('CID is empty');

    return await axios
      .post(apiFileInfo, {
        responseType: 'stream',
        headers: {
          'Content-Type': type,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
      })
      .then((res) => {
        const href = type
          ? hexstringToBlob(res.data, type)
          : hexstringToBlob(res.data);
        const link = document.createElement('a');
        link.href = href;
        link.download = cid;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
  }
);
export const fetchDownloadFileReducer = {
  [fetchDownloadFile.pending as any]: (state: IInfoFile) => {
    toast.info('Downloading file...');
    state.fetchDownloadFile.loading = true;
  },
  [fetchDownloadFile.fulfilled as any]: (state: IInfoFile, action: any) => {
    toast.success('File downloaded successfully!');
    state.fetchDownloadFile.loading = false;
  },
  [fetchDownloadFile.rejected as any]: (state: IInfoFile, action: any) => {
    toast.error('Error downloading file!');
    state.fetchDownloadFile.loading = false;
    state.fetchDownloadFile.error = action.error.message;
  },
};

export const fetchStatsCurrentFile = createAsyncThunk(
  'infoFile/fetchStatsCurrentFile',
  async (data: any, { rejectWithValue, getState }) => {
    const { cid: cidClicked } = data;
    const { infoFile } = getState() as any;
    const { cid } = infoFile;
    const apiFileInfo = apiFilesStats + cid;

    if (!cid || cid === '') return rejectWithValue('CID is empty');
    if (cidClicked !== cid) return rejectWithValue('CID is different');

    return await axios
      .get(apiFileInfo)
      .then((res) => {
        const { likes, dislikes, reports, favorites } = res.data;

        return {
          likes,
          dislikes,
          reports,
          favorites,
        };
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
  }
);
export const fetchStatsCurrentFileReducer = {
  [fetchStatsCurrentFile.pending as any]: (state: IInfoFile) => {
    state.fetchStatsCurrentFile.loading = true;
  },
  [fetchStatsCurrentFile.fulfilled as any]: (state: IInfoFile, action: any) => {
    const { likes, dislikes, reports, favorites } = action.payload;

    if (likes) state.likes = likes;
    if (dislikes) state.dislikes = dislikes;
    if (reports) state.reports = reports;
    if (favorites) state.favorites = favorites;

    state.fetchStatsCurrentFile.loading = false;
  },
  [fetchStatsCurrentFile.rejected as any]: (state: IInfoFile, action: any) => {
    state.fetchStatsCurrentFile.loading = false;
    state.fetchStatsCurrentFile.error = action.error.message;
  },
};

export const fetchFileData = createAsyncThunk(
  'infoFile/fetchFileData',
  async (data, { rejectWithValue, getState }) => {
    const { infoFile } = getState() as any;
    const { cid, type } = infoFile;
    const apiFileInfo = apiDownload + cid;

    if (!cid || cid === '') return rejectWithValue('CID is empty');

    // return await axios
    //   .post(apiFileInfo, {
    //     responseType: 'stream',
    //     headers: {
    //       'Content-Type': type,
    //       'Access-Control-Allow-Origin': '*',
    //       'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //     },
    //   })
    //   .then((res) => {
    //     return hexstringToBlob(res.data, type);
    //   })
    //   .catch((err) => {
    //     return rejectWithValue(err.response.data);
    //   });

    return await axios
      .get(apiFileInfo, {
        responseType: 'stream',
        headers: {
          'Content-Type': type,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        timeout: Infinity,
      })
      .then((res) => {
        return hexstringToBlob(res.data, type);
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
  }
);
export const fetchFileDataReducer = {
  [fetchFileData.pending as any]: (state: IInfoFile) => {
    state.fetchFileData.loading = true;
  },
  [fetchFileData.fulfilled as any]: (state: IInfoFile, action: any) => {
    state.found = true;
    state.link = action.payload;
    state.fetchFileData.loading = false;
  },
  [fetchFileData.rejected as any]: (state: IInfoFile, action: any) => {
    state.fetchFileData.loading = false;
    state.fetchFileData.error = action.error.message;
  },
};

export const fetchCoverData = createAsyncThunk(
  'infoFile/fetchCoverData',
  async (data, { rejectWithValue, getState }) => {
    const { infoFile } = getState() as any;
    const { cover } = infoFile;
    const apiFileInfo = apiDownload + cover;

    if (!cover || cover === '') return rejectWithValue('cover is empty');

    return await axios
      .post(apiFileInfo, {
        responseType: 'stream',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
      })
      .then((res) => {
        return hexstringToBlob(res.data);
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
  }
);
export const fetchCoverDataReducer = {
  [fetchCoverData.pending as any]: (state: IInfoFile) => {
    state.fetchCoverData.loading = true;
  },
  [fetchCoverData.fulfilled as any]: (state: IInfoFile, action: any) => {
    state.coverLink = action.payload;
    state.fetchCoverData.loading = false;
  },
  [fetchCoverData.rejected as any]: (state: IInfoFile, action: any) => {
    state.fetchCoverData.loading = false;
    state.fetchCoverData.error = action.error.message;
  },
};
