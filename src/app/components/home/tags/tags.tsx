import React from 'react';
import { useSelector } from 'react-redux';
import DefaultTags from './module/defaultTags';
import FileTags from './module/fileTags';

const Tags = () => {
  const { filters } = useSelector((state: any) => state.allFiles);

  return (
    <>
      <div className="navbar bg-neutral">
        <div className="grid grid-cols-1  w-full md:flex-1 md:flex justify-center px-4  bg-base ">
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
