import Badge from '@/app/components/general/badge/badge';
import React from 'react';

const DefaultTags = () => {
  const defaultTags = [
    {
      id: 1,
      name: '😍',
    },
    {
      id: 2,
      name: '❤️‍🔥',
    },
    {
      id: 5,
      name: '🔥',
    },
  ];

  return (
    <>
      {defaultTags.map((tag) => {
        const { id, name } = tag;
        return <Badge key={id} name={name} />;
      })}
    </>
  );
};

export default DefaultTags;
