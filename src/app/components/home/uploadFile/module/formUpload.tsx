import { setFileInfo } from '@/app/store/slices/uploadFile/uploadFile.slice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TagsInput } from 'react-tag-input-component';

const FormUpload = () => {
  const { name, description } = useSelector((state: any) => state.uploadFile);
  const dispatch = useDispatch();
  const [fileTags, setfileTags] = useState([]);

  useEffect(() => {
    dispatch(setFileInfo({ tags: fileTags }));
  }, [fileTags]);

  return (
    <>
      <label className="label mt-8">
        <span className="label-text">File Name:</span>
      </label>
      <input
        type="text"
        placeholder="Name of the file"
        className="input input-bordered w-full"
        defaultValue={name}
        onChange={(e) => {
          dispatch(setFileInfo({ name: e.target.value }));
        }}
      />
      <label className="label mt-8">
        <span className="label-text">File Description:</span>
      </label>
      <textarea
        placeholder="File Description"
        defaultValue={description}
        className="textarea textarea-bordered textarea-lg w-full "
        onChange={(e) => {
          dispatch(setFileInfo({ description: e.target.value }));
        }}
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
    </>
  );
};

export default FormUpload;
