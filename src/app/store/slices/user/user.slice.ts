import { createSlice } from '@reduxjs/toolkit';
import {
  fetchDislikeNewFileReducer,
  fetchFavoriteNewFileReducer,
  fetchLikeNewFileReducer,
  fetchUndislikeNewFileReducer,
  fetchUnfavoriteNewFileReducer,
  fetchUnlikeNewFileReducer,
} from './fileOptions.action';
import {
  fetchCreateUserReducer,
  fetchSignInGoogleReducer,
  fetchSignOutReducer,
  fetchUserInfoReducer,
} from './user.action';

export interface IUser {
  id: string | undefined;
  email: string | undefined;
  coverImg: string;
  displayName: string;
  language: string;
  likes: string[];
  dislikes: string[];
  favorites: string[];
  reports: string[];
  fetchUserInfo: {
    loading: boolean;
    error: string;
  };
  fetchSignInGoogle: {
    loading: boolean;
    error: string;
  };
  fetchSignOut: {
    loading: boolean;
    error: string;
  };
  fetchCreateUser: {
    loading: boolean;
    error: string;
  };
  fetchLikeNewFile: {
    loading: boolean;
    error: string;
  };
  fetchUnlikeNewFile: {
    loading: boolean;
    error: string;
  };
  fetchDislikeNewFile: {
    loading: boolean;
    error: string;
  };
  fetchUndislikeNewFile: {
    loading: boolean;
    error: string;
  };
  fetchFavoriteNewFile: {
    loading: boolean;
    error: string;
  };
  fetchUnfavoriteNewFile: {
    loading: boolean;
    error: string;
  };
}

const initialState: IUser = {
  id: undefined,
  email: undefined,
  coverImg: '',
  displayName: '',
  language: '',
  likes: [],
  dislikes: [],
  favorites: [],
  reports: [],
  fetchUserInfo: {
    loading: false,
    error: '',
  },
  fetchSignInGoogle: {
    loading: false,
    error: '',
  },
  fetchSignOut: {
    loading: false,
    error: '',
  },
  fetchCreateUser: {
    loading: false,
    error: '',
  },
  fetchLikeNewFile: {
    loading: false,
    error: '',
  },
  fetchUnlikeNewFile: {
    loading: false,
    error: '',
  },
  fetchDislikeNewFile: {
    loading: false,
    error: '',
  },
  fetchUndislikeNewFile: {
    loading: false,
    error: '',
  },
  fetchFavoriteNewFile: {
    loading: false,
    error: '',
  },
  fetchUnfavoriteNewFile: {
    loading: false,
    error: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const {
        id,
        email,
        coverImg,
        displayName,
        language,
        likes,
        dislikes,
        favorites,
        reports,
      } = action.payload;

      if (id) state.id = id;
      if (email) state.email = email;
      if (coverImg) state.coverImg = coverImg;
      if (displayName) state.displayName = displayName;
      if (language) state.language = language;
      if (likes) state.likes = likes;
      if (dislikes) state.dislikes = dislikes;
      if (favorites) state.favorites = favorites;
      if (reports) state.reports = reports;
    },
    setEmptyUserInfo: (state) => {
      state = initialState;
    },
  },
  extraReducers: {
    ...fetchUserInfoReducer,
    ...fetchSignInGoogleReducer,
    ...fetchSignOutReducer,
    ...fetchCreateUserReducer,
    ...fetchLikeNewFileReducer,
    ...fetchUnlikeNewFileReducer,
    ...fetchDislikeNewFileReducer,
    ...fetchUndislikeNewFileReducer,
    ...fetchFavoriteNewFileReducer,
    ...fetchUnfavoriteNewFileReducer,
  },
});

export const { setUserInfo, setEmptyUserInfo } = userSlice.actions;

export default userSlice.reducer;
