import React from 'react';

interface BadgeProps {
  name: string;
}

const Badge = ({ name }: BadgeProps) => {
  return (
    <div className="badge badge-outline text-3xl p-5 mx-1 hover:bg-white cursor-pointer">
      {name}
    </div>
  );
};

export default Badge;
