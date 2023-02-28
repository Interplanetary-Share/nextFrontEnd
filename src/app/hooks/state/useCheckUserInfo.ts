import React, { useMemo } from 'react';

import { getAuth } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEmptyUserInfo,
  setUserInfo,
} from '../../store/slices/user/user.slice';
import { fetchCreateUser } from '../../store/slices/user/user.action';

const useCheckUserInfo = () => {
  const { id, email, coverImg, displayName } = useSelector(
    (state: any) => state.user
  );

  const dispatch = useDispatch();
  getAuth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(
        setUserInfo({
          id: user.uid,
          email: user.email,
          coverImg: user.photoURL,
          displayName: user.displayName,
        })
      );
    } else {
      dispatch(setEmptyUserInfo());
    }
  });

  useMemo(() => {
    if (!id || id === '') return;
    console.log('useCheckUserInfo');
    dispatch(
      fetchCreateUser({
        id,
        email,
        coverImg,
        displayName,
        language: 'en',
      }) as any
    );
  }, [id]);
};

export default useCheckUserInfo;
