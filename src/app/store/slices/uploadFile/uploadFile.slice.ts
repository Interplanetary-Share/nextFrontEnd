import { createSlice } from '@reduxjs/toolkit'

export interface IUploadFile {
  file: File | undefined
  name: string | undefined
  description: string
  extraProperties: {
    cover: string | undefined
    tags: Array<string>
  }
  uploadUid: string | undefined
}

const initialState: IUploadFile = {
  name: undefined,
  description: '',
  file: undefined,
  extraProperties: {
    cover: undefined,
    tags: [],
  },
  uploadUid: undefined,
}

const uploadFileSlice = createSlice({
  name: 'uploadFile',
  initialState,
  reducers: {
    setFileInfo: (
      state,
      action: {
        payload: {
          name?: string
          file?: File
          description?: string
          cover?: string
          tags?: Array<string>
        }
      }
    ) => {
      const { name, description, file, cover, tags } = action.payload
      if (name) state.name = name
      if (description) state.description = description
      if (file) state.file = file
      if (cover) state.extraProperties.cover = cover
      if (tags) state.extraProperties.tags = tags
    },
    setEmptyFileInfo: (state) => {
      state = initialState
    },
    setRandomUploadUid: (state) => {
      state.uploadUid = Math.random().toString(36).substring(7)
    },
  },
  extraReducers: {},
})

export const { setFileInfo, setEmptyFileInfo, setRandomUploadUid } =
  uploadFileSlice.actions

export default uploadFileSlice.reducer
