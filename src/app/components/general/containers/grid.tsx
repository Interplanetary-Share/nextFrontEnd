import React from 'react';

const Grid = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return <div className="grid grid-cols-4 gap-4">{children}</div>;
};

export default Grid;
