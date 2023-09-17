// @ts-nocheck

import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

import { IUser } from './user.slice'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const fetchSignInGoogle = createAsyncThunk(
  'user/fetchSignInGoogle',
  async (data, { rejectWithValue, getState }) => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    return await signInWithPopup(auth, provider)
      .then((result) => {
        const { user } = result

        const { uid, displayName, email, photoURL } = user

        return {
          uid,
          displayName,
          email,
          photoURL,
        }
      })
      .catch((error) => {
        return rejectWithValue(error.message)
      })
  }
)
export const fetchSignInGoogleReducer = {
  [fetchSignInGoogle.pending as any]: (state: IUser) => {
    toast.info('Logging in...')
    state.fetchSignInGoogle.loading = true
  },
  [fetchSignInGoogle.fulfilled as any]: (state: IUser, action: any) => {
    const { uid, displayName, email, photoURL } = action.payload
    if (uid) state.id = uid
    if (displayName) state.displayName = displayName
    if (email) state.email = email
    if (photoURL) state.coverImg = photoURL

    state.fetchSignInGoogle.loading = false
  },
  [fetchSignInGoogle.rejected as any]: (state: IUser, action: any) => {
    toast.error('Error logging in')
    state.fetchSignInGoogle.loading = false
    state.fetchSignInGoogle.error = action.error.message
  },
}

export const fetchSignOut = createAsyncThunk(
  'user/fetchSignOut',
  async (data, { rejectWithValue, getState }) => {
    const auth = getAuth()

    return await auth.signOut().catch((error) => {
      return rejectWithValue(error.message)
    })
  }
)
export const fetchSignOutReducer = {
  [fetchSignOut.pending as any]: (state: IUser) => {
    toast.info('Logging out...')
    state.fetchSignOut.loading = true
  },
  [fetchSignOut.fulfilled as any]: (state: IUser, action: any) => {
    toast.success('Logged out successfully')
    state.id = undefined
    state.email = undefined
    state.coverImg = ''
    state.displayName = ''
    state.language = ''

    state.fetchSignOut.loading = false
  },
  [fetchSignOut.rejected as any]: (state: IUser, action: any) => {
    toast.error('Error logging out')
    state.fetchSignOut.loading = false
    state.fetchSignOut.error = action.error.message
  },
}
