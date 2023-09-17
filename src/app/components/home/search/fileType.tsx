import {
  IAllFiles,
  setEmptyFileType,
  setFilteType,
} from '@/app/store/slices/files/query.slice'
import { useDispatch, useSelector } from 'react-redux'

import { useMemo } from 'react'

const FileType = () => {
  const { selectedTypes, getFilesListResponse } = useSelector(
    (state: any) => state.allFiles
  ) as IAllFiles

  const dispatch = useDispatch()

  const fileTypesFromGetFilesResponse = useMemo(() => {
    return getFilesListResponse
      .reduce((acc: any, file: any) => {
        if (!file.type) return acc
        const index = acc.findIndex((item: any) => item === file.type)
        if (index === -1) {
          acc.push(file.type)
        }
        return acc
      }, [])
      .sort((a: any, b: any) => a.localeCompare(b))
  }, [getFilesListResponse])

  return (
    <div className="dropdown dropdown-bottom dropdown-end flex flex-col">
      <p className="text-xs p-0 m-0 absolute"> Type</p>
      <label tabIndex={0} className="btn m-1">
        {!selectedTypes || selectedTypes.length === 0
          ? 'All'
          : selectedTypes.length === 1
          ? selectedTypes[0]
          : 'Multiple'}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 z-50"
      >
        <li className="z-40">
          <a
            className={
              !selectedTypes || selectedTypes.length === 0 ? 'active' : ''
            }
            onClick={() => {
              dispatch(setEmptyFileType())
            }}
          >
            All
          </a>
        </li>
        {fileTypesFromGetFilesResponse.map((type: string) => {
          const isSelected = selectedTypes.includes(type)
          return (
            <li key={type}>
              <a
                className={isSelected ? 'active' : ''}
                onClick={() => {
                  dispatch(setFilteType(type))
                }}
              >
                {type}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default FileType
