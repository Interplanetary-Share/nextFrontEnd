import { fetchSignInGoogleReducer, fetchSignOutReducer } from './user.action'

import { createSlice } from '@reduxjs/toolkit'

export interface IUser {
  id: string | undefined
  email: string | undefined
  coverImg: string
  displayName: string
  language: string

  fetchSignInGoogle: {
    loading: boolean
    error: string
  }
  fetchSignOut: {
    loading: boolean
    error: string
  }
}

const initialState: IUser = {
  id: undefined,
  email: undefined,
  coverImg: '',
  displayName: '',
  language: '',

  fetchSignInGoogle: {
    loading: false,
    error: '',
  },
  fetchSignOut: {
    loading: false,
    error: '',
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const { id, email, coverImg, displayName, language } = action.payload

      if (id) state.id = id
      if (email) state.email = email
      if (coverImg) state.coverImg = coverImg
      if (displayName) state.displayName = displayName
      if (language) state.language = language
    },
    setEmptyUserInfo: (state) => {
      state = initialState
    },
  },
  extraReducers: {
    ...fetchSignInGoogleReducer,
    ...fetchSignOutReducer,
  },
})

export const { setUserInfo, setEmptyUserInfo } = userSlice.actions

export default userSlice.reducer
