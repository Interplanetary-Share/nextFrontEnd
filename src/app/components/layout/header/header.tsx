import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div className="navbar bg-secondary">
      <Link
        href="/"
        className="btn btn-ghost normal-case text-xl text-white bg-secondary"
      >
        InterPlanetary Share
      </Link>
    </div>
  );
};

export default Header;
