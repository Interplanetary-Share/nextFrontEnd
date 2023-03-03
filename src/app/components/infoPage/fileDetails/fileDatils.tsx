import WrapperFileType from '@/app/utils/previewFile/wrapperFileType';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import RightDetailsWrapper from './module/rightDetailsWrapper';

const FileDatils = () => {
  const { cid, name, type, link, description } = useSelector(
    (state: any) => state.infoFile
  );

  const [hideDetails, setHideDetails] = useState(false);
  const iconDivider = hideDetails ? '🙈' : '🙉';

  const detailsClass = hideDetails
    ? 'w-0 h-0 opacity-0'
    : 'grid h-full w-full md:w-96 card bg-base-300 rounded-box place-items-center px-2 mx-2 pb-4 mb-4';

  return (
    <>
      <div className="mt-8 "></div>
      <div className="flex flex-col md:flex-row  md:flex w-full px-2 mx-2">
        <div className="grid h-full flex-grow card bg-base-300 rounded-box place-items-center py-4">
          <h1 className="text-2xl font-bold py-4">{name}</h1>
          <p className="text-lg mb-2 py-1 text-left w-full px-4">
            {description}
          </p>
          <WrapperFileType type={type} src={link} width="100%" />
        </div>
        <div className="divider divider-horizontal text-3xl text-center w-full md:w-16">
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
