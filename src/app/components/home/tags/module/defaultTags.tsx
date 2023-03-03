import Badge from '@/app/components/general/badge/badge';
import { setFiltersBasicList } from '@/app/store/slices/files/allFiles.slice';
import { userNeedLogin } from '@/app/utils/misc/modalsToggle';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DefaultTags = () => {
  const { id: userId } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const defaultTags = [
    {
      id: 1,
      name: '😍',
      mode: 'likes',
      onClick: () => {
        dispatch(
          setFiltersBasicList({
            mode: 'likes',
            sortMode: 'likes',
            tags: [],
          })
        );
      },
    },
    {
      id: 2,
      name: '❤️‍🔥',
      mode: 'favorites',
      onClick: () => {
        dispatch(
          setFiltersBasicList({
            mode: 'favorites',
            sortMode: 'favorites',
            tags: [],
          })
        );
      },
    },
    {
      id: 5,
      name: '🔥',
      mode: 'all',
      onClick: () => {
        dispatch(
          setFiltersBasicList({
            mode: 'all',
            sortMode: 'likes',
            tags: [],
          })
        );
      },
    },
  ];

  return (
    <>
      {defaultTags.map((tag) => {
        const { id, name, mode, onClick } = tag;

        const onClickHandler =
          !userId && mode !== 'all' ? userNeedLogin : onClick;

        return (
          <Badge key={id} name={name} onClick={onClickHandler} mode={mode} />
        );
      })}
    </>
  );
};

export default DefaultTags;
