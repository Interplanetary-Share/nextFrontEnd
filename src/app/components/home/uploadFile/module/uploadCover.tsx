import { useDispatch, useSelector } from 'react-redux'

import React from 'react'
import getResizedImageDataUrl from '@/app/utils/fileOptions/image'
import { setFileInfo } from '@/app/store/slices/uploadFile/uploadFile.slice'

const UploadCover = () => {
  const {
    file: mainFile,
    extraProperties: { cover },
  } = useSelector((state: any) => state.uploadFile)

  const dispatch = useDispatch()
  const mainFileIsImage = mainFile?.type?.includes('image')

  const handleChangeCover = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0]
    if (!file) return

    getResizedImageDataUrl(file, {
      width: 300,
      quality: 0.6,
    }).then((cover) => {
      if (!cover) return
      dispatch(
        setFileInfo({
          cover,
        })
      )
    })

    event.target.value = ''
  }

  return (
    <>
      {cover || mainFileIsImage ? (
        <>
          <h1 className="text-xl">Cover</h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mainFileIsImage ? URL.createObjectURL(mainFile) : cover}
            className="w-full h-auto"
            alt={'cover'}
          />
        </>
      ) : (
        <div
          className="bg-secondary card w-full h-full cursor-pointer"
          onClick={() => {
            document.getElementById('coverUpload')?.click()
          }}
        >
          <h1 className="mx-auto my-auto">Click to Upload a cover</h1>
        </div>
      )}

      {cover && !mainFileIsImage && (
        <button
          className="btn btn-primary my-3 p-2"
          onClick={() => {
            document.getElementById('coverUpload')?.click()
          }}
        >
          Change Cover
        </button>
      )}

      <input
        id="coverUpload"
        type={'file'}
        accept="image/png, image/gif, image/jpeg"
        onChange={handleChangeCover}
        hidden
      />
    </>
  )
}

export default UploadCover
