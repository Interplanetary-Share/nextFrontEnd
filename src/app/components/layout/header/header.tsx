import Link from 'next/link';
import React from 'react';
import Avatar from '../../general/avatar/avatar';

const Header = () => {
  return (
    <div className="navbar bg-secondary">
      <div className="flex-1">
        <Link
          href="/"
          className="btn btn-ghost normal-case text-xl text-white bg-secondary"
        >
          InterPlanetary Share
        </Link>
      </div>

      <div className="flex-none mr-8 pt-2">
        <Link href={'/profile'}>
          <Avatar size="w-12" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
