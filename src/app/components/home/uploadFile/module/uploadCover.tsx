import { setFileInfo } from '@/app/store/slices/uploadFile/uploadFile.slice';
import fileToBlob from '@/app/utils/convert/fileToBlob';
import fileToBuffer from '@/app/utils/convert/fileToBuffer';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UploadCover = () => {
  const { blob } = useSelector((state: any) => state.uploadFile);
  const dispatch = useDispatch();
  const handleChangeCover = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (!file) return;

    fileToBuffer(file).then((coverBuffer) => {
      dispatch(
        setFileInfo({
          octetStream: {
            cover: coverBuffer,
          },
        })
      );
    });

    fileToBlob({
      file,
      callback: (coverBlob) => {
        if (!coverBlob) return;
        dispatch(
          setFileInfo({
            blob: {
              cover: coverBlob,
            },
          })
        );
      },
    });
  };

  return (
    <>
      {blob.cover ? (
        <>
          <h1 className="text-xl">Cover</h1>
          <img src={blob.cover} className="w-full h-auto" />
        </>
      ) : (
        <div
          className="bg-secondary card w-full h-full"
          onClick={() => {
            document.getElementById('coverUpload')?.click();
          }}
        >
          <h1 className="mx-auto my-auto">Upload Cover</h1>
        </div>
      )}

      <input
        id="coverUpload"
        type={'file'}
        accept="image/png, image/gif, image/jpeg"
        onChange={handleChangeCover}
      />
    </>
  );
};

export default UploadCover;
