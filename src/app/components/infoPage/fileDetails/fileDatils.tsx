import WrapperFileType from '@/app/utils/previewFile/wrapperFileType';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import RightDetailsWrapper from './module/rightDetailsWrapper';

const FileDatils = () => {
  const { cid, name, type, link } = useSelector((state: any) => state.infoFile);

  const [hideDetails, setHideDetails] = useState(false);
  const iconDivider = hideDetails ? '🙉' : '🙈';

  const detailsClass = hideDetails
    ? 'hidden'
    : 'grid h-full w-96 card bg-base-300 rounded-box place-items-center px-4 mx-4 pb-4 mb-4';

  return (
    <>
      <div className="mt-8"></div>
      <div className="flex w-full px-4 mx-4">
        <div className="grid h-full flex-grow card bg-base-300 rounded-box place-items-center">
          <h1 className="text-2xl font-bold py-4">{name}</h1>
          <WrapperFileType type={type} src={link} width="100%" />
        </div>
        <div className="divider divider-horizontal text-2xl">
          <button onClick={() => setHideDetails(!hideDetails)}>
            {iconDivider}
          </button>
        </div>
        <div className={detailsClass}>
          <RightDetailsWrapper />
        </div>
      </div>
    </>
  );
};

export default FileDatils;
