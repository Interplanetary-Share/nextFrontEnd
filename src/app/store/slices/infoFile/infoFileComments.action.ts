import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  apiCommentCreate,
  apiCommentDelete,
  apiCommentGet,
  apiFilesStats,
  apiUserGet,
} from '../../endpoints';
import { IComments, IInfoFile } from './infoFile.slice';

export const fetchCreateComment = createAsyncThunk(
  'infoFile/fetchCreateComment',
  async (data: any, { rejectWithValue, getState }) => {
    const { comment } = data;
    const { infoFile, user } = getState() as any;
    const { cid } = infoFile;
    const { id: userId } = user;

    if (!cid || cid === '') return rejectWithValue('CID is empty');
    if (!userId || userId === '') return rejectWithValue('User is empty');

    return await axios
      .post(apiCommentCreate, {
        cid,
        userId,
        comment,
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
  }
);
export const fetchCreateCommentReducer = {
  [fetchCreateComment.pending as any]: (state: IInfoFile) => {
    state.fetchCreateComment.loading = true;
  },
  [fetchCreateComment.fulfilled as any]: (state: IInfoFile, action: any) => {
    toast.success('Comment created');

    state.fetchCreateComment.loading = false;
  },
  [fetchCreateComment.rejected as any]: (state: IInfoFile, action: any) => {
    state.fetchCreateComment.loading = false;
    state.fetchCreateComment.error = action.error.message;
  },
};

export const fetchDeleteComment = createAsyncThunk(
  'infoFile/fetchDeleteComment',
  async (data: any, { rejectWithValue, getState }) => {
    const { commentId } = data;
    const { user, infoFile } = getState() as any;
    const { id: userId } = user;
    const { cid } = infoFile;

    if (!userId || userId === '') return rejectWithValue('User is empty');

    return await axios
      .post(apiCommentDelete, {
        cid,
        commentId,
        userId,
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
  }
);
export const fetchDeleteCommentReducer = {
  [fetchDeleteComment.pending as any]: (state: IInfoFile) => {
    state.fetchDeleteComment.loading = true;
  },
  [fetchDeleteComment.fulfilled as any]: (state: IInfoFile, action: any) => {
    toast.success('Comment deleted');
    state.fetchDeleteComment.loading = false;
  },
  [fetchDeleteComment.rejected as any]: (state: IInfoFile, action: any) => {
    state.fetchDeleteComment.loading = false;
    state.fetchDeleteComment.error = action.error.message;
  },
};
export const fetchGetComments = createAsyncThunk(
  'infoFile/fetchGetComments',
  async (data, { rejectWithValue, getState }) => {
    const { infoFile } = getState() as any;
    const { cid } = infoFile;

    if (!cid || cid === '') return rejectWithValue('CID is empty');

    const fetchUserData = async (id: string) => {
      return await axios.post(apiUserGet, { id }).then((res) => {
        const { coverImg, displayName } = res.data;
        return { coverImg, displayName };
      });
    };

    const commments = await axios
      .post(apiCommentGet, {
        cid,
      })
      .then((res) => {
        const { comments } = res.data;
        return comments;
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });

    return await Promise.all(
      commments.map(async (comment: IComments) => {
        const { userId } = comment;
        const { coverImg, displayName } = await fetchUserData(userId);
        return {
          ...comment,
          coverImg,
          displayName,
        };
      })
    );
  }
);
export const fetchGetCommentsReducer = {
  [fetchGetComments.pending as any]: (state: IInfoFile) => {
    state.fetchGetComments.loading = true;
  },
  [fetchGetComments.fulfilled as any]: (state: IInfoFile, action: any) => {
    state.comments = action.payload;
    state.fetchGetComments.loading = false;
  },
  [fetchGetComments.rejected as any]: (state: IInfoFile, action: any) => {
    state.fetchGetComments.loading = false;
    state.fetchGetComments.error = action.error.message;
  },
};
