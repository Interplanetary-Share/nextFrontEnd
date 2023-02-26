import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  apiUserDislike,
  apiUserFavorite,
  apiUserLike,
  apiUserUndislike,
  apiUserUnfavorite,
  apiUserUnlike,
} from '../../endpoints';
import { IUser } from './user.slice';

export const fetchLikeNewFile = createAsyncThunk(
  'user/fetchLikeNewFile',
  async (data, { rejectWithValue, getState }) => {
    const { user, infoFile } = getState() as any;
    const { id, email } = user;
    const { cid } = infoFile;

    return await axios
      .post(apiUserLike + cid, {
        id,
        email,
      })
      .then((res) => {
        const { likes } = res.data;
        return likes;
      })
      .catch((err) => {
        return rejectWithValue(err.message);
      });
  }
);
export const fetchLikeNewFileReducer = {
  [fetchLikeNewFile.pending as any]: (state: IUser) => {
    state.fetchLikeNewFile.loading = true;
  },
  [fetchLikeNewFile.fulfilled as any]: (state: IUser, action: any) => {
    state.likes = action.payload;
    state.fetchLikeNewFile.loading = false;
    toast.success('Liked! 🥳');
  },
  [fetchLikeNewFile.rejected as any]: (state: IUser, action: any) => {
    toast.error('Error liking file');
    state.fetchLikeNewFile.loading = false;
    state.fetchLikeNewFile.error = action.error.message;
  },
};

export const fetchUnlikeNewFile = createAsyncThunk(
  'user/fetchUnlikeNewFile',
  async (data, { rejectWithValue, getState }) => {
    const { user, infoFile } = getState() as any;
    const { id, email } = user;
    const { cid } = infoFile;

    return await axios
      .post(apiUserUnlike + cid, {
        id,
        email,
      })
      .then((res) => {
        const { likes } = res.data;
        return likes;
      })
      .catch((err) => {
        return rejectWithValue(err.message);
      });
  }
);
export const fetchUnlikeNewFileReducer = {
  [fetchUnlikeNewFile.pending as any]: (state: IUser) => {
    state.fetchUnlikeNewFile.loading = true;
  },
  [fetchUnlikeNewFile.fulfilled as any]: (state: IUser, action: any) => {
    state.likes = action.payload;
    state.fetchUnlikeNewFile.loading = false;
  },
  [fetchUnlikeNewFile.rejected as any]: (state: IUser, action: any) => {
    state.fetchUnlikeNewFile.loading = false;
    state.fetchUnlikeNewFile.error = action.error.message;
  },
};

export const fetchDislikeNewFile = createAsyncThunk(
  'user/fetchDislikeNewFile',
  async (data, { rejectWithValue, getState }) => {
    const { user, infoFile } = getState() as any;
    const { id, email } = user;
    const { cid } = infoFile;

    return await axios
      .post(apiUserDislike + cid, {
        id,
        email,
      })
      .then((res) => {
        const { dislikes } = res.data;
        return dislikes;
      })
      .catch((err) => {
        return rejectWithValue(err.message);
      });
  }
);
export const fetchDislikeNewFileReducer = {
  [fetchDislikeNewFile.pending as any]: (state: IUser) => {
    state.fetchDislikeNewFile.loading = true;
  },
  [fetchDislikeNewFile.fulfilled as any]: (state: IUser, action: any) => {
    state.dislikes = action.payload;
    state.fetchDislikeNewFile.loading = false;
    toast.success('Disliked! 👿');
  },
  [fetchDislikeNewFile.rejected as any]: (state: IUser, action: any) => {
    toast.error('Error disliking file');
    state.fetchDislikeNewFile.loading = false;
    state.fetchDislikeNewFile.error = action.error.message;
  },
};

export const fetchUndislikeNewFile = createAsyncThunk(
  'user/fetchUndislikeNewFile',
  async (data, { rejectWithValue, getState }) => {
    const { user, infoFile } = getState() as any;
    const { id, email } = user;
    const { cid } = infoFile;

    return await axios
      .post(apiUserUndislike + cid, {
        id,
        email,
      })
      .then((res) => {
        const { dislikes } = res.data;
        return dislikes;
      })
      .catch((err) => {
        return rejectWithValue(err.message);
      });
  }
);
export const fetchUndislikeNewFileReducer = {
  [fetchUndislikeNewFile.pending as any]: (state: IUser) => {
    state.fetchUndislikeNewFile.loading = true;
  },
  [fetchUndislikeNewFile.fulfilled as any]: (state: IUser, action: any) => {
    state.dislikes = action.payload;
    state.fetchUndislikeNewFile.loading = false;
  },
  [fetchUndislikeNewFile.rejected as any]: (state: IUser, action: any) => {
    state.fetchUndislikeNewFile.loading = false;
    state.fetchUndislikeNewFile.error = action.error.message;
  },
};

export const fetchFavoriteNewFile = createAsyncThunk(
  'user/fetchFavoriteNewFile',
  async (data, { rejectWithValue, getState }) => {
    const { user, infoFile } = getState() as any;
    const { id, email } = user;
    const { cid } = infoFile;

    return await axios
      .post(apiUserFavorite + cid, {
        id,
        email,
      })
      .then((res) => {
        const { favorites } = res.data;
        return favorites;
      })
      .catch((err) => {
        return rejectWithValue(err.message);
      });
  }
);
export const fetchFavoriteNewFileReducer = {
  [fetchFavoriteNewFile.pending as any]: (state: IUser) => {
    state.fetchFavoriteNewFile.loading = true;
  },
  [fetchFavoriteNewFile.fulfilled as any]: (state: IUser, action: any) => {
    state.favorites = action.payload;
    state.fetchFavoriteNewFile.loading = false;
    toast.success('Added to favorites! 💘');
  },
  [fetchFavoriteNewFile.rejected as any]: (state: IUser, action: any) => {
    toast.error('Error disliking file');
    state.fetchFavoriteNewFile.loading = false;
    state.fetchFavoriteNewFile.error = action.error.message;
  },
};

export const fetchUnfavoriteNewFile = createAsyncThunk(
  'user/fetchUnfavoriteNewFile',
  async (data, { rejectWithValue, getState }) => {
    const { user, infoFile } = getState() as any;
    const { id, email } = user;
    const { cid } = infoFile;

    return await axios
      .post(apiUserUnfavorite + cid, {
        id,
        email,
      })
      .then((res) => {
        const { favorites } = res.data;
        return favorites;
      })
      .catch((err) => {
        return rejectWithValue(err.message);
      });
  }
);
export const fetchUnfavoriteNewFileReducer = {
  [fetchUnfavoriteNewFile.pending as any]: (state: IUser) => {
    state.fetchUnfavoriteNewFile.loading = true;
  },
  [fetchUnfavoriteNewFile.fulfilled as any]: (state: IUser, action: any) => {
    state.favorites = action.payload;
    state.fetchUnfavoriteNewFile.loading = false;
  },
  [fetchUnfavoriteNewFile.rejected as any]: (state: IUser, action: any) => {
    state.fetchUnfavoriteNewFile.loading = false;
    state.fetchUnfavoriteNewFile.error = action.error.message;
  },
};
