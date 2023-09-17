import { setSearchString } from '@/app/store/slices/files/query.slice'
import { useDispatch } from 'react-redux'

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const Search = () => {
  const dispatch = useDispatch()
  const handleSearch = (e: any) => {
    dispatch(setSearchString(e.target.value))
  }

  return (
    <div className="form-control w-full p-4 bg-neutral">
      <div className="input-group input-group-lg bg-secondary p-4 mb-4 rounded-lg ">
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered w-full"
          onChange={(e) => {
            handleSearch(e)
          }}
        />
        <button className="btn btn-square rounded-r-lg mr-5 p-2">
          <MagnifyingGlassIcon />
        </button>
      </div>
    </div>
  )
}

export default Search
