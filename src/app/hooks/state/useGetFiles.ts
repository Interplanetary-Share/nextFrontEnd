import {
  IAllFiles,
  setGetFileResponse,
} from '@/app/store/slices/files/query.slice'
import { useDispatch, useSelector } from 'react-redux'

import { ipfsGalactFetchClient } from '@interplanetary-share/hooks.ipfs-client'
import { useEffect } from 'react'

const useGetFiles = () => {
  const { pagination, filter, sort } = useSelector(
    (state: any) => state.allFiles as IAllFiles
  )

  const { uploadUid } = useSelector((state: any) => state.uploadFile)
  const dispatch = useDispatch()

  const { getFiles } = ipfsGalactFetchClient()

  const isPublic = true
  const config = {
    showBlobUrl: false,
    showInfoFile: true,
    showExtraProps: true,
  }

  useEffect(() => {
    getFiles(isPublic, config, {
      page: pagination.page,
      size: pagination.size,
      filter,
      sort,
    }).then((res) => {
      dispatch(setGetFileResponse(res))
    })
  }, [pagination, filter, sort, uploadUid])
}

export default useGetFiles
