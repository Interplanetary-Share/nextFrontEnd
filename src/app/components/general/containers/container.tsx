import React from 'react';

const Container = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return <div className="container mx-auto sm:px-6 lg:px-8">{children}</div>;
};

export default Container;
