import React from 'react';
import DefaultTags from './module/defaultTags';
import FileTags from './module/fileTags';

const Tags = () => {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <DefaultTags />
          <FileTags />
        </div>
        <div className="flex-none">
          <div className="form-control w-full max-w-xs">
            <select className="select select-bordered">
              <option defaultChecked>Today</option>
              <option>Yesterday</option>
              <option>This week</option>
              <option>This month</option>
              <option>This year</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tags;
