import Link from 'next/link';
import React from 'react';

const NeedLoginModal = () => {
  return (
    <>
      <input type="checkbox" id="needLogin" className="modal-toggle" />
      <label
        htmlFor="needLogin"
        className="modal cursor-pointer mx-auto text-center"
      >
        <label className="modal-box relative bg-red-900 text-white" htmlFor="">
          <h3 className="text-lg font-bold">
            You need to be logged in to use this feature
          </h3>
          <Link
            className="btn btn-success mt-4"
            onClick={() => {
              document.getElementById('needLogin')?.click();
            }}
            href="/signin"
          >
            Login / Register
          </Link>
        </label>
      </label>
    </>
  );
};

export default NeedLoginModal;
