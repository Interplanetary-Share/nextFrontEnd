/* eslint-disable react-hooks/exhaustive-deps */
import { fetchTags } from '@/app/store/slices/tags/tags.action';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetTags = () => {
  const {
    fetchCreateOrUpdateTag: { loading: loadingCreateOrUpdateTag },
  } = useSelector((state: any) => state.tags);

  const dispatch = useDispatch();

  useMemo(() => {
    if (loadingCreateOrUpdateTag) return;
    dispatch(fetchTags() as any);
  }, [loadingCreateOrUpdateTag]);
};

export default useGetTags;
