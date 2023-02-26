/* eslint-disable @next/next/no-img-element */
import { randomAnimalEmoji } from '@/app/utils/misc/randomEmoji';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

interface IAvatarProps {
  size?: string;
}

const Avatar = ({ size }: IAvatarProps) => {
  const { coverImg } = useSelector((state: any) => state.user);

  const avatarDefaultClassName =
    'rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 ';

  const avatarClassName = size
    ? avatarDefaultClassName + size
    : avatarDefaultClassName + 'w-52 h-52';

  const animalEmoji = useMemo(() => randomAnimalEmoji(), [coverImg]);

  return (
    <div className="avatar w-full mx-auto justify-center  rounded-full">
      <div className={avatarClassName}>
        {coverImg ? (
          <img referrerPolicy="no-referrer" src={coverImg} alt={'profile'} />
        ) : (
          <div className="text-3xl text-white text-center h-full  bg-white">
            <p className="pt-1">{animalEmoji}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Avatar;
