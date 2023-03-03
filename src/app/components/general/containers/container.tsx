import React from 'react';

const Container = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return <div className="container mx-auto w-full px-4 ">{children}</div>;
};

export default Container;
