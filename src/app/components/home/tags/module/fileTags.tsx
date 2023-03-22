/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Badge from '@/app/components/general/badge/badge';
import useWindowsSize from '@/app/hooks/custom/useWindowsSize';
import { setFiltersBasicList } from '@/app/store/slices/files/allFiles.slice';
import numberNormalized from '@/app/utils/misc/numberNormalized';
import { calculateTagsPerPage, ITag } from '@/app/utils/misc/tags';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const FileTags = () => {
  const { list } = useSelector((state: any) => state.tags);
  const dispatch = useDispatch();

  const fileTags = useMemo(() => {
    return list
      .map((tag: any) => {
        const { _id, name, numberPosts, mode } = tag;
        return {
          id: _id,
          name,
          numberPosts,
          onClick: () => {
            dispatch(
              setFiltersBasicList({
                tags: [mode],
                mode: mode,
                sortMode: 'likes',
              })
            );
          },
          mode,
        };
      })
      .sort((a: any, b: any) => b.numberPosts - a.numberPosts);
  }, [list]);

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
          const { id, name, numberPosts, mode, onClick } = tag;

          return (
            <div key={id} className="indicator">
              <span className="indicator-item indicator-center badge badge-primary ">
                {numberNormalized(numberPosts)}
              </span>
              <Badge name={name} onClick={onClick} mode={mode} />
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
        className="grid h-72 md:h-32 carousel carousel-vertical rounded-box w-full mx-auto"
      >
        {tagsPerPage.map((tags, index) => {
          return <CustomBadge key={index} tags={tags} />;
        })}
      </div>
      <div className="grid grid-cols-1 mx-4 ">
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
