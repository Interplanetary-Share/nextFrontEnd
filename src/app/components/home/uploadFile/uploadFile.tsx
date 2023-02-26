import { fetchUploadFile } from '@/app/store/slices/uploadFile/uploadFile.action';
import { setEmptyFileInfo } from '@/app/store/slices/uploadFile/uploadFile.slice';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../general/modal/modal';
import FormUpload from './module/formUpload';
import UploadCover from './module/uploadCover';

const UploadFile = () => {
  const { name, description, tags, octetStream } = useSelector(
    (state: any) => state.uploadFile
  );
  const dispatch = useDispatch();

  const allowUpload = useMemo(() => {
    if (
      !name ||
      !description ||
      tags.length === 0 ||
      !octetStream ||
      !octetStream.file ||
      !octetStream.cover
    ) {
      return false;
    } else {
      return true;
    }
  }, [name, description, tags, octetStream]);

  const handleUploadFile = () => {
    if (!allowUpload) return;
    dispatch(fetchUploadFile() as any)
      .unwrap()
      .then(() => {
        dispatch(setEmptyFileInfo());
      });
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
