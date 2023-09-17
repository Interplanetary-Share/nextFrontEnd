import { useDispatch, useSelector } from 'react-redux'

import FilesList from '@/app/components/home/files/filesList'
import Hero from '@/app/components/home/hero/hero'
import Search from '@/app/components/home/search/search'
import Tags from '@/app/components/home/tags/tags'
import { setFilterMode } from '@/app/store/slices/files/query.slice'
import { userNeedLogin } from '@/app/utils/misc/modalsToggle'

const Home = () => {
  const { filterMode } = useSelector((state: any) => state.allFiles)
  const { id: uid } = useSelector((state: any) => state.user)
  const dispatch = useDispatch()
  return (
    <main>
      {/* Left Menu */}
      <ul className="menu menu-vertical bg-base-200 rounded-box ml-1 mt-6 fixed z-50">
        <li>
          <a
            className={
              filterMode === 'favorites' ? 'tooltip active' : 'tooltip'
            }
            onClick={() => {
              if (!uid) {
                userNeedLogin()
                return
              }
              dispatch(
                setFilterMode({
                  mode: 'favorites',
                  uid,
                })
              )
            }}
            data-tip="Favorites"
          >
            ❤️‍🔥
          </a>
        </li>
        <li>
          <a
            className={filterMode === 'likes' ? 'tooltip active' : 'tooltip'}
            data-tip="Liked"
            onClick={() => {
              if (!uid) {
                userNeedLogin()
                return
              }
              dispatch(
                setFilterMode({
                  mode: 'likes',
                  uid,
                })
              )
            }}
          >
            😍
          </a>
        </li>
        <li>
          <a
            className={filterMode === 'all' ? 'tooltip active' : 'tooltip'}
            data-tip="Popular"
            onClick={() => {
              dispatch(
                setFilterMode({
                  mode: 'all',
                })
              )
            }}
          >
            🔥
          </a>
        </li>
      </ul>
      <Hero />
      <Tags />
      <Search />
      <FilesList />
    </main>
  )
}

export default Home
