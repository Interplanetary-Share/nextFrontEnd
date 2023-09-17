import {
  handleDownload,
  handleShareFile,
} from '@/app/utils/fileOptions/handleOptions'

import CardStats from '../../home/files/module/cardStats'
import { IInfoFile } from '@/app/store/slices/infoFile/infoFile.slice'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

const FileOptions = () => {
  const { cid, type, name, url, extraProperties } = useSelector(
    (state: any) => state.infoFile
  ) as IInfoFile

  const likes = useMemo(() => {
    if (extraProperties?.likes) {
      return extraProperties.likes as string[]
    }
    return undefined
  }, [extraProperties])

  const dislikes = useMemo(() => {
    if (extraProperties?.dislikes) {
      return extraProperties.dislikes as string[]
    }
    return undefined
  }, [extraProperties])

  const favorites = useMemo(() => {
    if (extraProperties?.favorites) {
      return extraProperties.favorites as string[]
    }
    return undefined
  }, [extraProperties])

  return (
    <div className="grid justify-center grid-cols-1 gap-9 w-full  md:w-2/3 md:flex">
      <div className="w-full md:w-96">
        <CardStats
          cid={cid}
          likes={likes}
          dislikes={dislikes}
          favorites={favorites}
        />
      </div>
      <div className="btn-group my-4  md:mt-10 w-full mx-auto justify-center md:justify-end">
        <div
          onClick={() =>
            handleShareFile({
              cid,
              name,
            })
          }
          className="tooltip btn"
          data-tip="Share link"
        >
          <a className="text-3xl">🔗</a>
        </div>
        {url && (
          <div className="tooltip btn" data-tip="Download file">
            <a
              onClick={() => {
                handleDownload({
                  name,
                  link: url,
                  type,
                })
              }}
              className="text-3xl"
            >
              💾
            </a>
          </div>
        )}

        {/* TODO: finish report */}
        {/* <div
          className={buttonClassName(reports)}
          onClick={() => {
            handleReport({
              cid,
              id,
            })
          }}
          data-tip="Report file"
        >
          <a className="text-3xl">🚩</a>
        </div> */}
      </div>
    </div>
  )
}

export default FileOptions
