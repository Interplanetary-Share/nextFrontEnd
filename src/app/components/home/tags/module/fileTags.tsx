/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Badge from '@/app/components/general/badge/badge';
import useWindowsSize from '@/app/hooks/useWindowsSize';
import { calculateTagsPerPage, ITag } from '@/app/utils/misc/tags';
import React, { useEffect, useRef, useState } from 'react';

const fileTags: Array<ITag> = [
  {
    id: 1,
    name: 'action',
    numberOfPosts: 9,
  },
  {
    id: 2,
    name: 'adventure',
    numberOfPosts: 9,
  },
  {
    id: 3,
    numberOfPosts: 9,
    name: 'comedy',
  },
  {
    id: 4,
    numberOfPosts: 9,
    name: 'drama',
  },
  {
    id: 5,
    numberOfPosts: 9,
    name: 'fantasy',
  },
  {
    id: 6,
    numberOfPosts: 9,
    name: 'horror',
  },
  {
    id: 7,
    numberOfPosts: 9,
    name: 'mystery',
  },
  {
    id: 8,
    numberOfPosts: 9,
    name: 'romance',
  },
  {
    id: 9,
    numberOfPosts: 9,
    name: 'sci-fi',
  },
  {
    id: 10,
    numberOfPosts: 9,
    name: 'thriller',
  },
  {
    id: 11,
    numberOfPosts: 9,
    name: 'western',
  },
];

const FileTags = () => {
  const size = useWindowsSize();
  const tagsContainer = useRef() as React.RefObject<HTMLInputElement>;
  const [tagsPerPage, setTagsPerPage] = useState([] as Array<Array<ITag>>);

  useEffect(() => {
    setTagsPerPage(
      calculateTagsPerPage({
        widthCharater: 25,
        maxWith: tagsContainer.current?.clientWidth,
        tags: fileTags,
      })
    );
  }, [size, fileTags]);

  const CustomBadge = (props: { tags?: Array<ITag> | undefined }) => {
    const { tags = [] } = props;

    if (!tags.length) return <></>;

    return (
      <div className="carousel-item h-32 flex justify-center pt-10">
        {tags.map((tag) => {
          const { id, name, numberOfPosts } = tag;
          return (
            <div key={id} className="indicator">
              <span className="indicator-item indicator-center badge badge-primary ">
                {numberOfPosts}
              </span>
              <Badge name={name} />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div
        ref={tagsContainer}
        className="h-32 carousel carousel-vertical rounded-box w-full mx-auto"
      >
        {tagsPerPage.map((tags, index) => {
          return <CustomBadge key={index} tags={tags} />;
        })}
      </div>
      <div className="grid grid-cols-1 mx-4">
        <div className="flex justify-center">
          <kbd className="kbd">▲</kbd>
        </div>
        <div className="flex justify-center">
          <kbd className="kbd">▼</kbd>
        </div>
      </div>
    </>
  );
};

export default FileTags;
