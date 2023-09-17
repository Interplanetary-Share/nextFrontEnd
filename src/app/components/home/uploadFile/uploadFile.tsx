import {
  IUploadFile,
  setEmptyFileInfo,
  setRandomUploadUid,
} from '@/app/store/slices/uploadFile/uploadFile.slice'
import { useDispatch, useSelector } from 'react-redux'

import FormUpload from './module/formUpload'
import Modal from '../../general/modal/modal'
import UploadCover from './module/uploadCover'
import { ipfsGalactFetchClient } from '@interplanetary-share/hooks.ipfs-client'
import { toast } from 'react-toastify'
import { useMemo } from 'react'
import { useRouter } from 'next/router'

const UploadFile = () => {
  const {
    file,
    name,
    description,
    extraProperties: { tags, cover },
  } = useSelector((state: any) => state.uploadFile) as IUploadFile
  const { uploadFile } = ipfsGalactFetchClient()
  const dispatch = useDispatch()
  const router = useRouter()
  const allowUpload = useMemo(() => {
    if (!name || !description || !tags || tags.length === 0 || !file) {
      return false
    } else {
      return true
    }
  }, [name, description, tags, file])

  const handleUploadFile = async () => {
    if (!allowUpload) return toast.error('Please fill all fields')
    toast.info('Uploading file to IPFS network...', {
      toastId: 'uploadingFile',
      autoClose: false,
      progress: undefined,
    })
    if (!file) return toast.error('Please select a file to upload')
    if (!name) return toast.error('Please enter a name for the file')

    const mainFileIsImage = file.type?.includes('image')

    if (mainFileIsImage) {
      uploadFile(file, {
        description,
        name,
        isPublic: true,
        extraProperties: {
          tags,
        },
      }).then((apiRes: any) => {
        toast.update('uploadingFile', {
          render: apiRes.message,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
        })
        dispatch(setEmptyFileInfo())
        dispatch(setRandomUploadUid())
        router.push('/' + apiRes.meta.cid)
        document.getElementById('opnUploadFileModal')?.click()
      })
    } else {
      if (!cover) return toast.error('Please select a cover for the file')

      uploadFile(file, {
        description,
        name,
        isPublic: true,
        extraProperties: {
          tags,
          cover,
        },
      }).then((apiRes: any) => {
        toast.update('uploadingFile', {
          render: apiRes.message,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
        })
        dispatch(setEmptyFileInfo())
        dispatch(setRandomUploadUid())
        router.push('/' + apiRes.meta.cid)
        document.getElementById('opnUploadFileModal')?.click()
      })
    }
  }

  return (
    <>
      <label id="opnUploadFileModal" htmlFor="uploadFile" className="hidden">
        open modal
      </label>
      <Modal id="uploadFile" title="Upload a file">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-2xl font-bold my-12">{name}</h3>
          <div className="flex w-full">
            <div className="grid  flex-grow card rounded-box place-items-center w-1/2">
              <UploadCover />
            </div>
            <div className="divider divider-horizontal"> </div>
            <div className="grid flex-grow card rounded-box place-items-center w-1/2">
              <div className="form-control  ">
                <FormUpload />
              </div>
            </div>
          </div>
          <button
            onClick={handleUploadFile}
            className={
              allowUpload
                ? 'btn btn-success my-12 p-6'
                : 'btn btn-error my-12 p-2 '
            }
          >
            Upload File
          </button>
        </div>
      </Modal>
    </>
  )
}

export default UploadFile
