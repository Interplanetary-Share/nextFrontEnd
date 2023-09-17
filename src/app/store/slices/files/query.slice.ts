import { createSlice } from '@reduxjs/toolkit'
import { format } from 'date-fns'
import { normalizeWhiteSpaces } from 'normalize-text'

type TPeriod = 'all' | 'today' | 'week' | 'month' | 'year'
type TFilterMode = 'all' | 'favorites' | 'likes'

export interface IAllFiles {
  filterMode: TFilterMode
  filter: any
  sort: any
  pagination: {
    page: number
    size: number
  }
  getFilesListResponse: any[]
  searchString: string
  selectedTags: Array<string>
  selectedTypes: Array<string>
  selectedPeriod: TPeriod
}

const initialState: IAllFiles = {
  filterMode: 'all',
  filter: {},
  sort: {
    'extraProperties.likes': -1,
  },

  pagination: {
    page: 1,
    size: 10,
  },
  getFilesListResponse: [],
  searchString: '',
  selectedTags: [],
  selectedTypes: [],
  selectedPeriod: 'all',
}

// TODO: rename this file to allFiles.slice.ts

const allFilesSlice = createSlice({
  name: 'allFiles',
  initialState,
  reducers: {
    setEmptyFiltersBasicList(state) {
      state = initialState
    },
    setSort(state, action) {
      state.sort = action.payload
    },

    setPage(state, action) {
      state.pagination.page = action.payload
    },
    setGetFileResponse(state, action) {
      state.getFilesListResponse = action.payload
    },
    setSearchString(state, action) {
      const search = normalizeWhiteSpaces(action.payload)
      let newFilter = state.filter

      if (search === '' || !search) {
        state.searchString = ''
        // elete newFilter.$or key if exists
        newFilter = Object.keys(newFilter).reduce((object: any, key) => {
          if (key !== '$or') {
            object[key] = newFilter[key]
          }
          return object
        }, {})
        state.filter = newFilter

        return
      }
      const tagsToSearch = search.split(' ')
      state.searchString = search
      let searchOr = {}
      if (!tagsToSearch || tagsToSearch.length === 0) {
        searchOr = {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            // Tags is array of strings we need to check if any of them match
            { extraProperties: { tags: { $in: tagsToSearch } } },
          ],
        }
      } else {
        if (tagsToSearch.length === 1) {
          searchOr = {
            $or: [
              { name: { $regex: search, $options: 'i' } },
              { description: { $regex: search, $options: 'i' } },
              // Tags is array of strings we need to check if any of them match
              { extraProperties: { tags: tagsToSearch[0] } },
            ],
          }
        } else {
          searchOr = {
            $or: [
              { name: { $regex: search, $options: 'i' } },
              { description: { $regex: search, $options: 'i' } },
              // Tags is array of strings we need to check if any of them match
              { extraProperties: { tags: { $in: tagsToSearch } } },
            ],
          }
        }
      }

      state.filter = {
        ...newFilter,
        ...searchOr,
      }
    },
    setEmptyFileType(state) {
      state.selectedTypes = []
      let newFilter = state.filter
      // delete newFilter.type key if exists
      if (newFilter.type) {
        delete newFilter.type
      }
      state.filter = newFilter
    },
    setFilteType(state, action) {
      const payloadType = action.payload
      const selectedTypes = state.selectedTypes
      if (selectedTypes.includes(payloadType)) {
        selectedTypes.splice(selectedTypes.indexOf(payloadType), 1)
      } else {
        selectedTypes.push(payloadType)
      }
      let newFilter = state.filter
      if (selectedTypes.length === 0) {
        if (newFilter.type) {
          delete newFilter.type
        }
        state.filter = newFilter
        return
      } else {
        if (selectedTypes.length === 1) {
          newFilter.type = payloadType
        } else {
          newFilter.type = { $in: selectedTypes }
        }
      }
      state.filter = newFilter
    },

    setFileTags(state, action) {
      const payloadTags = action.payload
      const selectedTags = state.selectedTags
      if (selectedTags.includes(payloadTags)) {
        selectedTags.splice(selectedTags.indexOf(payloadTags), 1)
      } else {
        selectedTags.push(payloadTags)
      }
      let newFilter = state.filter
      if (selectedTags.length === 0) {
        if (newFilter.extraProperties && newFilter.extraProperties.tags) {
          delete newFilter.extraProperties.tags
        }
        state.filter = newFilter
        return
      } else {
        if (selectedTags.length === 1) {
          if (!newFilter.extraProperties) {
            newFilter.extraProperties = {}
          }
          newFilter.extraProperties.tags = payloadTags
        } else {
          if (!newFilter.extraProperties) {
            newFilter.extraProperties = {}
          }
          newFilter.extraProperties.tags = { $in: selectedTags }
        }
      }

      state.filter = newFilter
    },

    setFilterPeriod(
      state,
      action: {
        payload: TPeriod
      }
    ) {
      state.selectedPeriod = action.payload
      let newFilter = state.filter
      if (action.payload === 'all') {
        // delete newFilter.createdAt key if exists
        if (newFilter.createdAt) {
          delete newFilter.createdAt
        }
        state.filter = newFilter
        return
      }
      let date = new Date()
      switch (action.payload) {
        case 'today':
          date.setDate(date.getDate() - 1)
          break
        case 'week':
          date.setDate(date.getDate() - 7)
          break
        case 'month':
          date.setMonth(date.getMonth() - 1)
          break
        case 'year':
          date.setFullYear(date.getFullYear() - 1)
          break
      }
      newFilter.createdAt = { $gte: format(date, 'dd-MM-yyyy') }
      state.filter = newFilter
    },
    setFilterMode(
      state,
      action: {
        payload: {
          mode: TFilterMode
          uid?: string
        }
      }
    ) {
      state.filterMode = action.payload.mode

      let newFilter = state.filter

      if (action.payload.mode === 'likes') {
        state.sort = {
          'extraProperties.likes': -1,
          createdAt: -1,
        }
        if (!newFilter.extraProperties) {
          newFilter.extraProperties = {}
        }
        newFilter.extraProperties.likes = action.payload.uid
        // delete newFilter.extraProperties.favorites key if exists
        if (newFilter.extraProperties.favorites) {
          delete newFilter.extraProperties.favorites
        }
      }
      if (action.payload.mode === 'favorites') {
        state.sort = {
          'extraProperties.favorites': -1,
        }

        if (!newFilter.extraProperties) {
          newFilter.extraProperties = {}
        }
        newFilter.extraProperties.favorites = action.payload.uid
        // delete newFilter.extraProperties.likes key if exists
        if (newFilter.extraProperties.likes) {
          delete newFilter.extraProperties.likes
        }
      }

      if (action.payload.mode === 'all') {
        // check if is better  likes or  favorites
        state.sort = {
          createdAt: -1,
        }

        if (newFilter.extraProperties) {
          if (newFilter.extraProperties.likes) {
            delete newFilter.extraProperties.likes
          }
          if (newFilter.extraProperties.favorites) {
            delete newFilter.extraProperties.favorites
          }
        }
      }

      state.filter = newFilter
    },
  },
  extraReducers: {},
})

export const {
  setEmptyFiltersBasicList,
  setSort,
  setPage,
  setGetFileResponse,
  setSearchString,
  setEmptyFileType,
  setFilteType,
  setFileTags,
  setFilterPeriod,
  setFilterMode,
} = allFilesSlice.actions

export default allFilesSlice.reducer
