import {
  fetchAddFileToIPFS,
  fetchDownloadFromIpfs,
} from '@/app/store/slices/ipfs/ipfs.action';
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

  const handleUploadFile = () => {
    if (!allowUpload) return toast.error('Please fill all fields');
    const windowObj = window as any;
    if (!windowObj.ipfsServer) return toast.error('IPFS server not found');

    tags.map((tag) => {
      dispatch(fetchCreateOrUpdateTag({ name: tag }) as any);
    });

    dispatch(fetchUploadFile() as any)
      .unwrap()
      .then(() => {
        dispatch(setEmptyFileInfo());
      });

    dispatch(fetchAddFileToIPFS({ file: nativeFile.file }) as any)
      .unwrap()
      .then(() => {
        toast.success('File uploaded successfully, distribution in progres...');
        // dispatch(fetchAddFileToIPFS({ file: nativeFile.cover }) as any)
        //   .unwrap()
        //   .then(() => {
        //     toast.success(
        //       'Cover uploaded successfully, distribution in progres...'
        //     );
        //   });

        toast.info('Distributing file to IPFS network in Background...');
        dispatch(fetchDownloadFromIpfs() as any)
          .unwrap()
          .then((resfetchDownloadFromIpfs: any) => {
            console.log(
              `fastlog => resfetchDownloadFromIpfs:`,
              resfetchDownloadFromIpfs
            );

            // router.push('/');
            toast.success('File distributed successfully! Downloading file...');
          });
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
