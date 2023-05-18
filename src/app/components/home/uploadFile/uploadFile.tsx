import { fetchCreateOrUpdateTag } from '@/app/store/slices/tags/tags.action';
import { fetchUploadFile } from '@/app/store/slices/uploadFile/uploadFile.action';
import {
  IUploadFile,
  setEmptyFileInfo,
} from '@/app/store/slices/uploadFile/uploadFile.slice';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Modal from '../../general/modal/modal';
import FormUpload from './module/formUpload';
import UploadCover from './module/uploadCover';

const UploadFile = () => {
  const { name, description, tags, nativeFile } = useSelector(
    (state: any) => state.uploadFile
  ) as IUploadFile;
  const dispatch = useDispatch();
  const router = useRouter();

  const allowUpload = useMemo(() => {
    if (
      !name ||
      !description ||
      !tags ||
      tags.length === 0 ||
      !nativeFile ||
      !nativeFile.file ||
      !nativeFile.cover
    ) {
      return false;
    } else {
      return true;
    }
  }, [name, description, tags, nativeFile]);

  const handleUploadFile = async () => {
    if (!allowUpload) return toast.error('Please fill all fields');

    tags.map((tag) => {
      dispatch(fetchCreateOrUpdateTag({ name: tag }) as any);
    });
    toast.info('Uploading file to IPFS network...', {
      toastId: 'uploadingFile',
      autoClose: false,
    });
    const file = await dispatch(fetchUploadFile() as any).unwrap();
    toast.update('uploadingFile', {
      render: 'File uploaded successfully, distribution in progres...',
      type: toast.TYPE.SUCCESS,
      autoClose: false,
    });

    dispatch(setEmptyFileInfo());

    router.push('/' + file.cid);
    document.getElementById('opnUploadFileModal')?.click();
  };

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
  );
};

export default UploadFile;
