import { handlePropFile } from './actions'
import { ipfsGalactFetchClient } from '@interplanetary-share/hooks.ipfs-client'
import numberNormalized from '@/app/utils/misc/numberNormalized'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { userNeedLogin } from '@/app/utils/misc/modalsToggle'

interface CardStatsProps {
  cid: string

  likes?: string[]
  dislikes?: string[]
  favorites?: string[]
}
const CardStats = ({
  cid,
  likes: likesProp,
  dislikes: dislikesProp,
  favorites: favoritesProp,
}: CardStatsProps) => {
  const { id: userId } = useSelector((state: any) => state.user)
  const [likes, setLikes] = useState(likesProp)
  const [dislikes, setDislikes] = useState(dislikesProp)
  const [favorites, setFavorites] = useState(favoritesProp)

  const { updateFile, getFile } = ipfsGalactFetchClient()

  const defaultBtnClass = 'btn btn-ghost text-2xl '
  const defaultStatsClass = 'stat-value mx-auto'

  return (
    <div className="stats shadow  m-4">
      <div className="stat m-0 w-full">
        <div className="stat-title mx-auto">
          <a
            onClick={() => {
              if (!userId) userNeedLogin()
              const prop = 'likes'
              handlePropFile({
                cid,
                prop,
                userId,
                getFile,
                updateFile,
              }).then((res: any) => setLikes(res))
            }}
            className={
              likes?.includes(userId)
                ? defaultBtnClass + 'btn-active'
                : defaultBtnClass
            }
          >
            😍
          </a>
        </div>
        <div className={defaultStatsClass}>
          {likes ? numberNormalized(likes.length) : 0}
        </div>
      </div>

      <div className="stat">
        <div className="stat-title mx-auto">
          <a
            onClick={() => {
              if (!userId) userNeedLogin()
              const prop = 'dislikes'
              handlePropFile({
                cid,
                prop,
                userId,
                getFile,
                updateFile,
              }).then((res: any) => setDislikes(res))
            }}
            className={
              dislikes?.includes(userId)
                ? defaultBtnClass + 'btn-active'
                : defaultBtnClass
            }
          >
            🤮
          </a>
        </div>
        <div className={defaultStatsClass}>
          {dislikes ? numberNormalized(dislikes.length) : 0}
        </div>
      </div>

      <div className="stat ">
        <div className="stat-title mx-auto">
          <a
            onClick={() => {
              if (!userId) userNeedLogin()
              const prop = 'favorites'
              handlePropFile({
                cid,
                prop,
                userId,
                getFile,
                updateFile,
              }).then((res: any) => setFavorites(res))
            }}
            className={
              favorites?.includes(userId)
                ? defaultBtnClass + 'btn-active'
                : defaultBtnClass
            }
          >
            ❤️‍🔥
          </a>
        </div>
        <div className={defaultStatsClass}>
          {favorites ? numberNormalized(favorites.length) : 0}
        </div>
      </div>
    </div>
  )
}

export default CardStats
