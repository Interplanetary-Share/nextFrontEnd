import { toast } from 'react-toastify';

const ShareModal = () => {
  return (
    <>
      <input type="checkbox" id="shareModal" className="modal-toggle" />
      <label
        htmlFor="shareModal"
        className="modal cursor-pointer mx-auto text-center"
      >
        <label className="modal-box relative text-white" htmlFor="">
          <h3 className="text-lg ">
            <span id="ShareModalTitle"></span> <br></br>
            <b>Share with your friends</b>
          </h3>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Page link</span>
            </label>
            <label className="input-group">
              <input
                readOnly
                id="shareModalLink"
                type="text"
                value=""
                className="input input-bordered w-full"
                onClick={(e: any) => {
                  const value = e.target.value;
                  navigator.clipboard.writeText(value);
                  const input = e.target as HTMLInputElement;
                  input.select();
                  toast.success('Link copied', {
                    // toastId: 'shareModalLink',
                  });
                }}
              />
              <span className="btn">Copy</span>
            </label>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                Content Identifier on IPFS Network
              </span>
            </label>
            <label className="input-group">
              <input
                readOnly
                id="shareModalCID"
                type="text"
                value=""
                className="input input-bordered  w-full"
                onClick={(e: any) => {
                  const value = e.target.value;
                  navigator.clipboard.writeText(value);
                  const input = e.target as HTMLInputElement;
                  input.select();
                  toast.success('CID copied', {
                    // toastId: 'shareModalCID',
                  });
                }}
              />
              <span className="btn">Copy</span>
            </label>
          </div>

          <p className="text-md mt-8">
            This file is stored on IPFS network. You can access it from anywhere
            with the CID (Content Identifier).
          </p>
        </label>
      </label>
    </>
  );
};

export default ShareModal;
