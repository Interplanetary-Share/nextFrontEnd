import { useDispatch, useSelector } from 'react-redux'

import { IFileRetrievalResponse } from '@interplanetary-share/hooks.ipfs-client/types/file'
import { ipfsGalactFetchClient } from '@interplanetary-share/hooks.ipfs-client'
import { updateInfoFile } from '@/app/store/slices/infoFile/infoFile.slice'
import { useEffect } from 'react'

const useGetFileInfo = () => {
  const { cid } = useSelector((state: any) => state.infoFile)
  const { getFile } = ipfsGalactFetchClient()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!cid || cid === '') return
    dispatch(
      updateInfoFile({
        fileFound: undefined,
      })
    )
    const cidIsString = typeof cid === 'string' ? cid : cid[0]
    getFile(cidIsString, {
      showBlobUrl: false,
      showExtraProps: true,
      showInfoFile: true,
    }).then((file: IFileRetrievalResponse) => {
      if (!file) {
        dispatch(
          updateInfoFile({
            fileFound: false,
          })
        )
        return
      }
      dispatch(updateInfoFile({ ...file, fileFound: true }))
    })
  }, [cid])
}

export default useGetFileInfo
