import { setFiltersBasicList } from '@/app/store/slices/files/allFiles.slice';
import { normalizeWhiteSpaces } from 'normalize-text';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Search = () => {
  const { filters } = useSelector((state: any) => state.allFiles);
  const dispatch = useDispatch();
  const handleSearch = (e: any) => {
    dispatch(
      setFiltersBasicList({
        searchStr: normalizeWhiteSpaces(e.target.value),
      })
    );
  };

  return (
    <div className="form-control w-full p-4">
      <div className="input-group  input-group-lg">
        <input
          type="text"
          defaultValue={filters.searchStr}
          placeholder="Search…"
          className="input input-bordered w-full"
          onChange={handleSearch}
        />
        <button className="btn btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Search;
