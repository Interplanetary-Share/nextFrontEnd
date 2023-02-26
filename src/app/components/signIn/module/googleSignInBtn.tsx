import { fetchSignInGoogle } from '@/app/store/slices/user/user.action';
import React from 'react';
import { useDispatch } from 'react-redux';

const GoogleSignInBtn = () => {
  const dispatch = useDispatch();

  return (
    <div className="mt-1 grid grid-cols-1 gap-4 cursor-pointer">
      <div>
        <a
          onClick={() => {
            dispatch(fetchSignInGoogle() as any);
          }}
          className="w-full inline-flex justify-center self-center items-center py-2 border border-primary rounded-md shadow-sm  text-sm font-medium  hover:bg-secondary"
        >
          <svg
            className="w-5 h-5 mr-8"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M11.99,13.9 L11.99,10.18 L21.35,10.18 C21.49,10.81 21.6,11.4 21.6,12.23 C21.6,17.94 17.77,22 12,22 C6.48,22 2,17.52 2,12 C2,6.48 6.48,2 12,2 C14.7,2 16.96,2.99 18.69,4.61 L15.85,7.37 C15.13,6.69 13.87,5.89 12,5.89 C8.69,5.89 5.99,8.64 5.99,12.01 C5.99,15.38 8.69,18.13 12,18.13 C15.83,18.13 17.24,15.48 17.5,13.91 L11.99,13.91 L11.99,13.9 Z"
              id="Shape"
            />
          </svg>
          <p className=" text-lg font-bold">Google</p>
        </a>
      </div>
    </div>
  );
};

export default GoogleSignInBtn;
