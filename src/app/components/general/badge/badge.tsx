import React from 'react';
import { useSelector } from 'react-redux';

interface BadgeProps {
  name: string;
  onClick?: () => void;
  mode: string;
}

const Badge = ({ name, onClick, mode }: BadgeProps) => {
  const { filters } = useSelector((state: any) => state.allFiles);

  const defaultBtnClass =
    'w-full my-2 badge badge-outline text-3xl p-5 mx-1 hover:bg-white cursor-pointer';
  const activeBtnClass =
    'w-full my-2  badge badge-outline text-3xl p-5 mx-1 hover:bg-white cursor-pointer bg-white';

  const btnClass = filters.mode === mode ? activeBtnClass : defaultBtnClass;

  return (
    <div onClick={onClick} className={btnClass}>
      {name}
    </div>
  );
};

export default Badge;
