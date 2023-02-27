import {
  handleDislike,
  handleFavorite,
  handleLike,
} from '@/app/utils/fileOptions/handleOptions';
import numberNormalized from '@/app/utils/misc/numberNormalized';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Interface } from 'readline';

interface CardStatsProps {
  cid: string;
  likes?: [string];
  dislikes?: [string];
  favorites?: [string];
}
const CardStats = ({ cid, likes, dislikes, favorites }: CardStatsProps) => {
  console.log(`fastlog => likes:`, likes);
  const {
    id,
    likes: userLikes,
    dislikes: userDislikes,
    favorites: userFavorites,
  } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const defaultBtnClass = 'btn btn-ghost text-2xl ';
  const defaultStatsClass = 'stat-value mx-auto';

  const likedBtnClass = userLikes.includes(cid)
    ? defaultBtnClass + 'btn-active'
    : defaultBtnClass;

  const dislikedBtnClass = userDislikes.includes(cid)
    ? defaultBtnClass + 'btn-active'
    : defaultBtnClass;

  const favoritedBtnClass = userFavorites.includes(cid)
    ? defaultBtnClass + 'btn-active'
    : defaultBtnClass;

  return (
    <div className="stats shadow w-full">
      <div className="stat">
        <div className="stat-title">
          <a
            onClick={() => {
              handleLike({
                id,
                cid,
                array: userLikes,
                dispatch,
              });
            }}
            className={likedBtnClass}
          >
            😍
          </a>
        </div>
        <div className={defaultStatsClass}>
          {likes ? numberNormalized(likes.length) : 0}
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">
          <a
            onClick={() => {
              handleDislike({
                id,
                cid,
                array: userDislikes,
                dispatch,
              });
            }}
            className={dislikedBtnClass}
          >
            🤮
          </a>
        </div>
        <div className={defaultStatsClass}>
          {dislikes ? numberNormalized(dislikes.length) : 0}
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">
          <a
            onClick={() => {
              handleFavorite({
                id,
                cid,
                array: userFavorites,
                dispatch,
              });
            }}
            className={favoritedBtnClass}
          >
            ❤️‍🔥
          </a>
        </div>
        <div className={defaultStatsClass}>
          {favorites ? numberNormalized(favorites.length) : 0}
        </div>
      </div>
    </div>
  );
};

export default CardStats;
