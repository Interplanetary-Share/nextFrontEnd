import { fetchDownloadFile } from '@/app/store/slices/infoFile/infoFile.action';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Tooltip } from 'react-tooltip';

const FileOptions = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="btn-group  mt-10 w-full mx-auto">
        <a data-tooltip-id="like" className="btn btn-active text-3xl">
          😍
        </a>

        <a data-tooltip-id="dislike" className="btn text-3xl">
          🤮
        </a>
        <a data-tooltip-id="save" className="btn text-3xl">
          ❤️‍🔥
        </a>
        <a data-tooltip-id="share" className="btn text-3xl">
          🔗
        </a>
        <a
          data-tooltip-id="download"
          onClick={() => {
            dispatch(fetchDownloadFile() as any);
          }}
          className="btn text-3xl"
        >
          💾
        </a>
        <a data-tooltip-id="report" className="btn text-3xl">
          🚩
        </a>
      </div>
      <Tooltip
        id="like"
        content="Give a Like"
        positionStrategy="fixed"
        place="bottom"
        variant="light"
      />
      <Tooltip
        id="dislike"
        content="Give a Dislike"
        positionStrategy="fixed"
        place="bottom"
        variant="light"
      />
      <Tooltip id="save" content="Save to your favourites" />
      <Tooltip id="share" content="Share link" />
      <Tooltip id="download" content="Download file" />
      <Tooltip id="report" content="Report file" />
    </div>
  );
};

export default FileOptions;
