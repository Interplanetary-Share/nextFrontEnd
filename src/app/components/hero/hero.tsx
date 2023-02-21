'use client';
import fileToBlob from '@/app/utils/previewFile/fileToBlob';
import Pdf from '@/app/utils/previewFile/pdf';
import React, { useState } from 'react';
import { TagsInput } from 'react-tag-input-component';
import Modal from '../modal/modal';

const Hero = () => {
  const [file, setfile] = useState(null as any);
  const [blob, setblob] = useState(null as any);

  const [fileTags, setfileTags] = useState([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (!file) return;
    console.log(`fastlog => file:`, file);
    setfile(file);
    if (file?.type.includes('pdf')) {
      fileToBlob({
        file,
        callback: (blob) => {
          if (!blob) return;
          console.log(`fastlog => blob:`, blob);

          setblob(blob);
        },
      });
    }
    // click the button to open the modal
    document.getElementById('opnUploadFileModal')?.click();
  };

  return (
    <>
      <div
        className="hero min-h-12"
        style={{
          backgroundImage: `url("/home/space.gif")`,
        }}
      >
        <div className="hero-overlay "></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-full">
            <h1 className="my-12 text-6xl font-bold">Share made simple</h1>

            <input
              type="file"
              className="file-input w-full max-w-xs my-6"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
      <label id="opnUploadFileModal" htmlFor="uploadFile" className="hidden">
        open modal
      </label>
      <Modal id="uploadFile" title="Upload a file">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-2xl font-bold my-12">{file?.name}</h3>

          <div className="flex w-full">
            <div className="grid  flex-grow card rounded-box place-items-center w-1/2">
              <div
                className="bg-secondary card w-full h-full"
                onClick={() => {
                  document.getElementById('coverUpload')?.click();
                }}
              >
                <h1 className="mx-auto my-auto">Upload Cover</h1>
              </div>
              <input id="coverUpload" type={'file'} />
            </div>
            <div className="divider divider-horizontal"> </div>
            <div className="grid flex-grow card rounded-box place-items-center w-1/2">
              {/* FORM */}
              <div className="form-control  ">
                <label className="label mt-8">
                  <span className="label-text">File Name:</span>
                </label>
                <input
                  type="text"
                  placeholder="Name of the file"
                  className="input input-bordered w-full"
                />
                <label className="label mt-8">
                  <span className="label-text">File Description:</span>
                </label>
                <textarea
                  placeholder="File Description"
                  className="textarea textarea-bordered textarea-lg w-full "
                ></textarea>
                <label className="label mt-8">
                  <span className="label-text">File Categorization:</span>
                </label>
                <TagsInput
                  value={fileTags}
                  onChange={setfileTags as any}
                  name="tags"
                  placeHolder="enter tags"
                />
              </div>
            </div>
          </div>
          <button className="btn btn-success my-12">Upload File</button>
        </div>
      </Modal>
    </>
  );
};

export default Hero;
