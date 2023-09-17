import { createSlice } from '@reduxjs/toolkit'

export interface IComments {
  id: string
  userId: string
  comment: string
  date: string
  likes: string[]
  coverImg: string
  displayName: string
}

export interface IInfoFile {
  cid: string
  name: string
  description: string
  type: string
  size: number
  isPublic: boolean
  updatedAt: string
  createdAt: string

  url?: string
  extraProperties?: Record<string, unknown>

  fileFound: boolean | undefined
}

const initialState: IInfoFile = {
  cid: '',
  name: '',
  description: '',
  type: '',
  size: 0,
  isPublic: false,
  updatedAt: '',
  createdAt: '',

  url: '',
  extraProperties: {},

  fileFound: undefined,
}

const infoFileSlice = createSlice({
  name: 'infoFile',
  initialState,
  reducers: {
    updateInfoFile: (state, action) => {
      const data = action.payload
      if (data.cid) state.cid = data.cid
      if (data.name) state.name = data.name
      if (data.description) state.description = data.description
      if (data.type) state.type = data.type
      if (data.size) state.size = data.size
      if (data.isPublic) state.isPublic = data.isPublic
      if (data.updatedAt) state.updatedAt = data.updatedAt
      if (data.createdAt) state.createdAt = data.createdAt
      if (data.url) state.url = data.url
      if (data.extraProperties) state.extraProperties = data.extraProperties
      if (data.fileFound) state.fileFound = data.fileFound
    },
  },
})

export const { updateInfoFile } = infoFileSlice.actions

export default infoFileSlice.reducer
