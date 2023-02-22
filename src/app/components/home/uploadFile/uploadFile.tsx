import { fetchUploadFile } from '@/app/store/slices/uploadFile/uploadFile.action';
import {
  setEmptyFileInfo,
  setFileInfo,
} from '@/app/store/slices/uploadFile/uploadFile.slice';
import fileToBuffer from '@/app/utils/convert/fileToBuffer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../general/modal/modal';
import FormUpload from './module/formUpload';
import UploadCover from './module/uploadCover';

const UploadFile = () => {
  const { name, description, tags, octetStream } = useSelector(
    (state: any) => state.uploadFile
  );
  const dispatch = useDispatch();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (!file) return;

    dispatch(
      setFileInfo({
        name: file.name,
        size: file.size,
        type: file.type,
      })
    );
    fileToBuffer(file).then((fileBuffer) => {
      dispatch(
        setFileInfo({
          octetStream: {
            file: fileBuffer,
          },
        })
      );
    });

    // click the button to open the modal
    document.getElementById('opnUploadFileModal')?.click();
  };

  const [allowUpload, setAllowUpload] = useState(false);

  useEffect(() => {
    if (
      !name ||
      !description ||
      tags.length === 0 ||
      !octetStream ||
      !octetStream.file ||
      !octetStream.cover
    ) {
      setAllowUpload(false);
    } else {
      setAllowUpload(true);
    }

    // TODO poder poner un limite de tamaño de archivo
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
      <input
        type="file"
        className="file-input w-full max-w-xs my-6"
        onChange={handleFileChange}
      />
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
