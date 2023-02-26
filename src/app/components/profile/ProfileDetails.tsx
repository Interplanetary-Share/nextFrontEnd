/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../general/avatar/avatar';

const ProfileDetails = () => {
  const { email, displayName } = useSelector((state: any) => state.user);
  return (
    <div>
      <div className="form-control w-full max-w-xs mx-auto mb-8">
        <Avatar />

        <label className="label">
          <span className="label-text">Display Name</span>
        </label>
        <input
          type="text"
          placeholder={displayName}
          disabled
          className="input input-bordered w-full max-w-xs"
        />

        <label className="label">
          <span className="label-text">email</span>
        </label>
        <input
          type="text"
          placeholder={email}
          disabled
          className="input input-bordered w-full max-w-xs"
        />
      </div>
    </div>
  );
};

export default ProfileDetails;
