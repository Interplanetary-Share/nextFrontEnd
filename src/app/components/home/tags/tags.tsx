import React from 'react';
import { useSelector } from 'react-redux';
import DefaultTags from './module/defaultTags';
import FileTags from './module/fileTags';

const Tags = () => {
  const { filters } = useSelector((state: any) => state.allFiles);

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="grid grid-cols-1  w-full md:flex-1 md:flex justify-center">
          <DefaultTags />
        </div>
      </div>
      <div className="flex bg-neutral p-4">
        <FileTags />
      </div>
    </>
  );
};

export default Tags;
