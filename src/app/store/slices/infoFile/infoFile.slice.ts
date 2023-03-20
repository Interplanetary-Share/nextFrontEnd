import { createSlice } from '@reduxjs/toolkit';
import {
  fetchDownloadFileReducer,
  fetchInfoFileFromDbReducer,
  fetchStatsCurrentFileReducer,
} from './infoFile.action';
import {
  fetchCreateCommentReducer,
  fetchDeleteCommentReducer,
  fetchGetCommentsReducer,
} from './infoFileComments.action';
import {
  fetchCreateOrUpdateReportReducer,
  fetchDeleteReportReducer,
} from './infoFileReports.action';

export interface IComments {
  _id: string;
  userId: string;
  comment: string;
  date: string;
  likes: string[];
  dislikes: string[];
  reports: string[];
  coverImg: string;
  displayName: string;
}
interface ILikes {
  userId: string;
  date: string;
}
interface IDislikes {
  userId: string;
  date: string;
}
interface IFavorites {
  userId: string;
  date: string;
}
interface IReports {
  _id: string;
  userId: string;
  date: string;
  reasons: Array<string>;
  comments: string;
}

export interface IInfoFile {
  cid: string;
  size: number;
  type: string;
  lastModified: number;

  // db
  name: string;
  description: string;
  tags: string[];
  cover: string;
  date: string;

  likes: string[];
  dislikes: string[];
  favorites: string[];

  reports: IReports[];

  comments: IComments[];

  owner: string;

  found: boolean;

  fetchInfoFileFromDb: {
    loading: boolean;
    error: string;
  };
  fetchDownloadFile: {
    loading: boolean;
    error: string;
  };
  fetchStatsCurrentFile: {
    loading: boolean;
    error: string;
  };
  fetchFileData: {
    loading: boolean;
    error: string;
  };
  fetchCoverData: {
    loading: boolean;
    error: string;
  };
  fetchCreateComment: {
    loading: boolean;
    error: string;
  };
  fetchDeleteComment: {
    loading: boolean;
    error: string;
  };
  fetchGetComments: {
    loading: boolean;
    error: string;
  };
  fetchCreateOrUpdateReport: {
    loading: boolean;
    error: string;
  };
  fetchDeleteReport: {
    loading: boolean;
    error: string;
  };
}

const initialState: IInfoFile = {
  cid: '',
  size: 0,
  type: '',
  lastModified: 0,
  // db
  name: '',
  description: '',
  tags: [],
  cover: '',
  date: '',

  likes: [],
  dislikes: [],
  favorites: [],
  reports: [],
  comments: [],
  owner: '',

  found: true,

  fetchInfoFileFromDb: {
    loading: false,
    error: '',
  },
  fetchDownloadFile: {
    loading: false,
    error: '',
  },
  fetchStatsCurrentFile: {
    loading: false,
    error: '',
  },
  fetchFileData: {
    loading: false,
    error: '',
  },
  fetchCoverData: {
    loading: false,
    error: '',
  },
  fetchCreateComment: {
    loading: false,
    error: '',
  },
  fetchDeleteComment: {
    loading: false,
    error: '',
  },
  fetchGetComments: {
    loading: false,
    error: '',
  },
  fetchCreateOrUpdateReport: {
    loading: false,
    error: '',
  },
  fetchDeleteReport: {
    loading: false,
    error: '',
  },
};

const infoFileSlice = createSlice({
  name: 'infoFile',
  initialState,
  reducers: {
    setCidFile: (state, action) => {
      state.cid = action.payload;
    },
  },
  extraReducers: {
    ...fetchInfoFileFromDbReducer,
    ...fetchDownloadFileReducer,
    ...fetchStatsCurrentFileReducer,

    ...fetchCreateCommentReducer,
    ...fetchDeleteCommentReducer,
    ...fetchGetCommentsReducer,

    ...fetchCreateOrUpdateReportReducer,
    ...fetchDeleteReportReducer,
  },
});

export const { setCidFile } = infoFileSlice.actions;

export default infoFileSlice.reducer;
