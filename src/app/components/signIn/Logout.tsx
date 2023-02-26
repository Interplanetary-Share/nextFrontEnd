import { fetchSignOut } from '@/app/store/slices/user/user.action';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Logout = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-full mx-auto text-center">
      <button
        className="btn btn-error"
        onClick={() => {
          dispatch(fetchSignOut() as any);
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default Logout;
